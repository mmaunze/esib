export default [
  {
    heading: 'Emprestimos',
  },
  {
    title: 'Emprestimos',
    icon: { icon: 'tabler-list' },
    children: [
      {
        title: 'Emprestimos Activos',
        icon: { icon: 'tabler-plus' },
        to: 'pages-emprestimos',
      },
      {
        title: 'Devolucoes',
        icon: { icon: 'tabler-plus' },
        to: 'pages-emprestimos-devolvidos',
      },
    ],
  },
]
