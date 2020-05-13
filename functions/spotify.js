const axios = require("axios")
const qs = require("qs")
const request = require("request")
var querystring = require('querystring')

const AUTH_ENDPOINT = 'https://accounts.spotify.com/api/token'
const USER_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'
const client_id = 'd2d9970dba2a4563be82f0d340829b61';
const client_secret = 'a53021acdb8c4d9b88e1bbf68ae1ccd2';
const REFRESH_TOKEN = 'AQCOJknbhci-usCGcQcHkyySPjqRzNB9CIrdXFvpcQlNSLUcxSfLhKvc_WfpWwt7fp-opn2tJdWZLAQXFJBu9nX4OZqK1a2jcvxHnSqPBvRlOHHTVHkKzbddIuNtGcUCe60'

var authOptions = {
  method: 'POST',
  url: AUTH_ENDPOINT,
  data: querystring.stringify({ 
    grant_type: 'refresh_token',
    refresh_token: REFRESH_TOKEN
  }),
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
    'Content-Type': 'application/x-www-form-urlencoded'
  }
} 


const getToken = async function(event, context) {
  const { data } = await axios(authOptions)
  return data.access_token
}

exports.handler = async function(event, context) {

  var token = await getToken()

  const { data } = await axios({
    method: 'GET',
    url: USER_ENDPOINT,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })

  return {
    statusCode: 200,
    text: JSON.stringify(data)
  }
}