const sanityClient = require('@sanity/client')
const fetch = require('node-fetch')

const TWITTER_API_URL = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=sosolimited&count=20&trim_user=true'
const TWITTER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAOSIhgAAAAAAv4mSI%2BXORM5uMvgVuG3O4iYdjug%3DREmHWtKE0JMRlseSSpaQD4QM9kXyOdn23NQ9abH8QnJfoX2c8A'

const client = sanityClient({
  projectId: '85ji6bpk',
  dataset: 'production',
  // a token with write access
  token: 'skVrklMv7EDJUq0kEarR4JmmbrVHnsYR08vmQ3gJS5ZC5zGp52K0vsVpgo6QYZ9osNChjQyiQ9XDxBbnUJLnyXL1XvS7bxZtYoQrWzQIcGubh7rGYHMnB5EIZw6NdozDiqiyTxf78iCcU1WGO55oTcSQwUvEzHCkVRGJGLwfyLQGCmDlo4UF',
  useCdn: false
})

function transform(externalTweet) {
	return {
	  _id: `tweet-${externalTweet.id}`, // use the id of the record from the external source (we happen to know the API only return unique values for `id`)
		_type: 'post',
		source: 'twitter',
    created: new Date(externalTweet.created_at),
    text: externalTweet.text,
    link:  (externalTweet.entities && externalTweet.entities.urls[0] && externalTweet.entities.urls[0].url) || "none"
	  // media: externalTweet.entities.media.media_url ? externalTweet.entities.media.media_url : undefined
	}
}

fetch(TWITTER_API_URL, { 
    method: 'get', 
    headers: {
      'Authorization': 'Bearer '+ TWITTER_TOKEN, 
      'Content-Type': 'application/json'
    }
})
	.then(res => res.json())
	.then(tweets => tweets.map(transform))
	// .then(json => console.log(json))
	.then(documents => {
		let transaction = client.transaction()
		documents.forEach(document => {
			transaction.createOrReplace(document)
		})

		return transaction.commit()
	})




