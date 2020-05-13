import React from 'react'
import {useEffect} from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import Intro from '../components/intro'
// import Feature from '../components/feature'
import Experience from '../components/experience'
import Skills from '../components/skills'
import ProjectPreviewGrid from '../components/projects'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import ScrollMagic from 'scrollmagic'
import {TweenMax, TimelineMax} from 'gsap'
import {ScrollMagicPluginGsap} from 'scrollmagic-plugin-gsap'
import fetch from 'node-fetch'

if (typeof window !== `undefined`) {
  ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax)
}

export const query = graphql`
  query {
    instagram: allInstaNode(
      limit: 1
      sort: {fields: [timestamp], order: DESC}
    ) {
      edges{
        node {
          timestamp
          thumbnails {
            src
          }
        }
      }
    }
    spotify:  allSpotifyRecentTrack(
      limit: 1
      sort: {order: DESC, fields: played_at}
    ) {
      edges {
        node {
          track {
            name
            artists {
              name
            }
          }
          played_at
        }
      }
    },
    trip: allSanityTrip(
      limit: 1
      sort: {fields: [date], order: DESC}
    ) {
      edges {
        node {
          location
        }
      }
    }
    tweet: allSanityTweet(
      limit: 20
    ) {
      edges {
        node {
          text
        }
      }
    }
    experience: allSanityExperience(
      limit: 5
      sort: {fields: [startDate], order: DESC}
    ) {
      edges {
        node {
          title
          company
          link
        }
      }
    }
    movie: allSanityMovie(
      limit: 1
      sort: {fields: [viewDate], order: DESC}
    ) {
      edges {
        node {
          title
          year
        }
      }
    }
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      intro_title
      intro_subtitle
      description
      keywords
    }
    skill: allSanitySkill(
      limit: 15
    ) {
      edges {
        node {
          title
          category {
            title
          }
          list
        }
      }
    }
    projects: allSanityProject(
      limit: 20
      sort: {fields: [launchDate], order: DESC}
      filter: {slug: {current: {ne: null}}, launchDate: {ne: null}}
    ) {
      edges {
        node {
          id
          title
          link
          description
          skills {
            name
            category {
              title
            }
          }
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          slug {
            current
          }
        }
      }
    }
  }
`

const IndexPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  useEffect(() => {
    fetch('/.netlify/functions/spotify')
      .then((response) => {
        return response.text()
      })
      .then((r) => {
        console.log(r)
      })
  })

  const site = (data || {}).site

  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  const experienceNodes = (data || {}).experience
    ? mapEdgesToNodes(data.experience)
    : []

  const tripNodes = (data || {}).trip
    ? mapEdgesToNodes(data.trip)
    : []

  const movieNodes = (data || {}).movie
    ? mapEdgesToNodes(data.movie)
    : []

  const skillNodes = (data || {}).skill
    ? mapEdgesToNodes(data.skill)
    : []

  const spotifyNodes = (data || {}).spotify
    ? mapEdgesToNodes(data.spotify)
    : []

  const instagramNodes = (data || {}).instagram
    ? mapEdgesToNodes(data.instagram)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout spotyNodes={spotifyNodes} instaNodes={instagramNodes} tripNodes={tripNodes} movieNodes={movieNodes}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <Intro intro_title={site.intro_title} intro_subtitle={site.intro_subtitle} />
        {experienceNodes && (
          <Experience nodes={experienceNodes} />
        )}
        {skillNodes && (
          <Skills nodes={skillNodes} />
        )}
        {/* <Feature /> */}
        {projectNodes && (
          <ProjectPreviewGrid nodes={projectNodes} />
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
