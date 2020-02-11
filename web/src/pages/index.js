import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import Intro from '../components/intro'
import Experience from '../components/experience'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import ScrollMagic from 'scrollmagic'
import {TweenMax, TimelineMax} from 'gsap'
import {ScrollMagicPluginGsap} from 'scrollmagic-plugin-gsap'

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax)

export const query = graphql`
  query IndexPageQuery {
    instagram: allInstaNode(
      limit: 1
      sort: {fields: [timestamp], order: DESC}
    ) {
      edges{
        node {
          id
          likes
          comments
          timestamp
          caption
          thumbnails {
            src
            config_width
            config_height
          }
        }
      }
    }
    spotify:  allSpotifyRecentTrack(
      limit: 1
      sort: { fields: order }
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
    }
    book: allSanityBook(
      limit: 1
      sort: {fields: [finishDate], order: DESC}
    ) {
      edges {
        node {
          title
          author
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
    projects: allSanityProject(
      limit: 20
      sort: {fields: [launchDate], order: DESC}
      filter: {slug: {current: {ne: null}}, launchDate: {ne: null}}
    ) {
      edges {
        node {
          id
          title
          excerpt
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

  const site = (data || {}).site

  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  const experienceNodes = (data || {}).experience
    ? mapEdgesToNodes(data.experience)
    : []

  const bookNodes = (data || {}).book
    ? mapEdgesToNodes(data.book)
    : []

  const movieNodes = (data || {}).movie
    ? mapEdgesToNodes(data.movie)
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
    <Layout spotyNodes={spotifyNodes} instaNodes={instagramNodes} bookNodes={bookNodes} movieNodes={movieNodes}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <Intro intro_title={site.intro_title} intro_subtitle={site.intro_subtitle} />
        {experienceNodes && (
          <Experience nodes={experienceNodes} />
        )}
        {projectNodes && (
          <ProjectPreviewGrid nodes={projectNodes} />
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
