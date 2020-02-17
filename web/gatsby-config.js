// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')
const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: 'src/images/favicon.png'
      }
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75
      }
    },
    {
      resolve: `gatsby-source-spotify`,
      options: {
        clientId: `d2d9970dba2a4563be82f0d340829b61`,
        clientSecret: `a53021acdb8c4d9b88e1bbf68ae1ccd2`,
        refreshToken: `AQCOJknbhci-usCGcQcHkyySPjqRzNB9CIrdXFvpcQlNSLUcxSfLhKvc_WfpWwt7fp-opn2tJdWZLAQXFJBu9nX4OZqK1a2jcvxHnSqPBvRlOHHTVHkKzbddIuNtGcUCe60`,

        fetchPlaylists: true, // optional. Set to false to disable fetching of your playlists
        fetchRecent: true, // optional. Set to false to disable fetching of your recently played tracks
        timeRanges: ['short_term', 'medium_term', 'long_term'] // optional. Set time ranges to be fetched
      }
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `joco.io`
      }
    }
  ]
}
