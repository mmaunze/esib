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
        to: 'obras',
      },
      {
        title: 'Livros',
        icon: { icon: 'tabler-plus' },
        to: 'obras-livros',
      },
      {
        title: 'Monografias',
        icon: { icon: 'tabler-plus' },
        to: 'obras-monografias',
      },
      {
        title: 'Revistas',
        icon: { icon: 'tabler-plus' },
        to: 'obras-revistas',
      },
    ],
  },
]
