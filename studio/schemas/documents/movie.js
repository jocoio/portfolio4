export default {
  name: 'movie',
  type: 'document',
  title: 'Movie',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'year',
      type: 'number',
      title: 'Year'
    },
    {
      name: 'viewDate',
      type: 'datetime',
      title: 'View Date'
    }
  ]
}
