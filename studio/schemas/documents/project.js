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
      name: 'description',
      title: 'Description',
      type: 'string'
    },
    {
      name: 'skills',
      type: 'array',
      title: 'Skills',
      description: 'Add keywords that describes your portfolio.',
      of: [{type: 'reference', to: {type: 'tag'}}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
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
    }
  }
}
