const configData = require('./configData.json')

console.log(configData.fls)

module.exports = {
  title: 'Facing the sorting hat docs',
  description: 'Documentation for WITH Madrid selection project',
  scss: ['../../../styles/index.scss'],

  themeConfig: {
    navbar: [
      { text: 'Home', link: '/' },
      {
        text: 'Components',
        link: '/components/',
      },
      {
        text: 'Views',
        link: '/views/',
      },
      {
        text: 'Docs Guide',
        link: '/docs-guide/'
      },
    ],

    sidebar: {
      '/components/': configData.cn,

      '/views/': configData.vn,

      '/docs-guide/': [
        'README.md',
      ],

      '/': [
        ' ',
      ]
    }
  },

  plugins: [
    [
      '@vuepress/register-components',
      {
        components: configData.fls
      },

    ],

  ],
}