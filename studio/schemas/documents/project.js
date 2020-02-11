import {format} from 'date-fns'

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'launchDate',
      title: 'launchDate',
      type: 'datetime'
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'figure'
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'body',
      title: 'Body',
      type: 'projectPortableText'
    },
    {
      name: 'relatedProjects',
      title: 'Related projects',
      type: 'array',
      of: [{type: 'reference', to: {type: 'project'}}]
    }
  ],
  preview: {
    select: {
      title: 'title',
      launchDate: 'launchDate',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare ({title = 'No title', launchDate, slug = {}, media}) {
      const dateSegment = format(launchDate, 'YYYY/MM')
      const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        media,
        subtitle: launchDate ? path : 'Missing publishing date'
      }
    }
  }
}
