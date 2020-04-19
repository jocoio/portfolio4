export default {
  name: 'experience',
  type: 'document',
  title: 'Experience',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'company',
      type: 'text',
      title: 'Company'
    },
    {
      name: 'startDate',
      type: 'datetime',
      title: 'Start Date'
    },
    {
      name: 'endDate',
      type: 'datetime',
      title: 'End Date'
    },
    {
      name: 'link',
      type: 'string',
      title: 'Link'
    }
  ]
}
