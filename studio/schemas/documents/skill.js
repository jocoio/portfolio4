export default {
  name: 'skill',
  type: 'document',
  title: 'Skills',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'}
    },
    {
      name: 'list',
      title: 'List',
      type: 'array',
      of: [{type: 'string'}]
    }
  ]
}
