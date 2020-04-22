// import fetch from 'node-fetch'

const API_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played'
const TOKEN = 'BQA4NTr4m43KDluUV0-6slUKzjA5kfTn7V7gbW0DOoKC6Xo1ipvGch5WVLXXRDRKmG62ySn-Aq1l2RxNQn4gLo4Sj0p6vabhPYO1RbjWm6aI1TnKIscXylw1QAcgjpqM0QGzNZYRNWcwVA8aZZjeVG-7Vg';

// const headers = {
//   'Accept' : 'application/json',
//   'Authorization' : 'Bearer BQCTShF6_jRUFez_8_ueUyLzuc3BVqswo55T938bzKnu7_Arge1brGx5eDH5eHsIRmDVIykyOBVou9Bb9NQEJ7KSNdPqpqt1-jehQ6DTiTG8tTDU7ubtxQCLEL1BVUz5CiZJSBMimzcAZmE8PAAYMNz6OQ'
// }

// exports.handler = (event, context, callback) => {
//   return fetch(API_ENDPOINT, {headers: headers})
//     .then(response => response.json())
//     .then(data => ({
//       statusCode: 200,
//       body: data
//     }))
//     .catch(error => ({statusCode: 422, body: String(error)}))
// }

const axios = require("axios")
const qs = require("qs")

exports.handler = async function(event, context) {
  // // apply our function to the queryStringParameters and assign it to a variable
  // const API_PARAMS = qs.stringify(event.queryStringParameters)
  // // Get env var values defined in our Netlify site UI
  // // TODO: change this
  // const API_SECRET = "XXXXX";
  // var REDIRECT_URI = 'http://localhost:8888/app/profile/';

  // TODO: customize your URL
  // this is secret too, your frontend won't see this
  // const URL = `https://accounts.spotify.com/authorize?client_id=${API_SECRET}&response_type=code&redirect_uri=${REDIRECT_URI }&scope=user-read-private%20user-read-email&state=34fFs29kd09`;


  // console.log("Constructed URL is ...", URL)

  try {
    const { data } = await 
      axios({
        method: 'get',
        url: API_ENDPOINT,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + TOKEN // client id and secret from env
        }
      })

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    }
  }
}