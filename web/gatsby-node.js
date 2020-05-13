const axios = require('axios')
const crypto = require('crypto')

async function createProjectPages (graphql, actions, reporter) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityProject(filter: {slug: {current: {ne: null}}, launchDate: {ne: null}}) {
        edges {
          node {
            id
            launchDate
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityProject || {}).edges || []

  projectEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/project/${slug}/`

      reporter.info(`Creating project page: ${path}`)

      createPage({
        path,
        component: require.resolve('./src/templates/project.js'),
        context: {id}
      })
    })
}

exports.sourceNodes = async ({boundActionCreators}) => {
  const {createNode} = boundActionCreators

  // fetch raw data from the Spotify api
  const fetchSpotify = () => axios.get(`https://joco.io/.netlify/functions/spotify`)
  // await for results
  const res = await fetchSpotify()

  // map into these results and create nodes
  res.data.items.map((song, i) => {
    // Create your node object
    const userNode = {
      // Required fields
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `Spotify` // name of the graphQL query --> allSpotify {}
        // contentDigest will be added just after
        // but it is required
      },
      children: [],

      // Other fields that you want to query with graphQl
      artist: song.track.artists[0].name,
      name: song.track.name
    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(userNode))
      .digest(`hex`)
    // add it to userNode
    userNode.internal.contentDigest = contentDigest

    // Create node with the gatsby createNode() API
    createNode(userNode)
  })
}

exports.createPages = async ({graphql, actions, reporter}) => {
  await createProjectPages(graphql, actions, reporter)
}

const Path = require('path')

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions
}) => {
  actions.setWebpackConfig({
    module: {
      rules: stage === 'build-html'
        ? [
          {
            test: /ScrollMagic/,
            use: loaders.null()
          }
        ]
        : []
    },
    resolve: {
      alias: {
        TimelineMax: Path.resolve(
          'node_modules',
          'gsap/src/uncompressed/TimelineMax.js'
        ),
        ScrollMagic: Path.resolve(
          'node_modules',
          'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'
        ),
        'animation.gsap': Path.resolve(
          'node_modules',
          'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'
        ),
        'debug.addIndicators': Path.resolve(
          'node_modules',
          'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
        )
      }
    }
  })
}
