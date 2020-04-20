export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e290dd834829906f4481dbf',
                  title: 'Sanity Studio',
                  name: 'portfolio4-studio',
                  apiId: '6057b773-6042-4242-8916-7452e99e13e3'
                },
                {
                  buildHookId: '5e290dd8882ccc67322b13e2',
                  title: 'Portfolio Website',
                  name: 'portfolio4-web',
                  apiId: '551d6fae-b207-4a85-b207-2a34705f4a57'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/jocoio/portfolio4',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://portfolio4-web.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['project']},
      layout: {width: 'medium'}
    }
  ]
}
