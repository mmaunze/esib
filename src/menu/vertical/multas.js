export default [
  {
    heading: 'Multas',
  },
  {
    title: 'Multas',
    icon: { icon: 'tabler-circle-check' },
    children: [
      {
        title: 'Multas Activas',
        icon: { icon: 'tabler-plus' },
        to: 'pages-multas',
      },
      {
        title: 'Multas Pagas',
        icon: { icon: 'tabler-plus' },
        to: 'pages-multas-pagas',
      },

    ],
  },
]
