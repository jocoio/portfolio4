export default {
    name: 'tweet',
    type: 'document',
    title: 'Tweets',
      fields: [
          {name: 'created', type: 'string'},
          {name: 'text', type: 'string'},
          {name: 'url', type: 'string'},
          {name: 'media', type: 'string'}
      ]
  }
  