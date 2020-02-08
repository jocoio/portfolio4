export default {
  name: 'book',
  type: 'document',
  title: 'Book',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author'
    },
    {
      name: 'finishDate',
      type: 'datetime',
      title: 'Finish Date'
    }
  ]
}
