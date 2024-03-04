export default [
  {
    heading: 'Obras',
  },
  {
    title: 'Obras',
    icon: { icon: 'tabler-book' },
    children: [
      {
        title: 'Todas Obras',
        icon: { icon: 'tabler-plus' },
        to: 'pages-obras',
      },
      {
        title: 'Livros',
        icon: { icon: 'tabler-plus' },
        to: 'pages-obras-livros',
      },
      {
        title: 'Monografias',
        icon: { icon: 'tabler-plus' },
        to: 'pages-obras-monografias',
      },
      {
        title: 'Revistas',
        icon: { icon: 'tabler-plus' },
        to: 'pages-obras-revistas',
      },
    ],
  },
]
