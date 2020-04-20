export default {
  name: 'tag',
  type: 'document',
  title: 'Tags',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'}
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.title'
    }
  }
}
