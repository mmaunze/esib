// ** Mock Adapter
import mock from '@/@fake-db/mock'

const database = [
  
  {
    id: 5,
    url: { name: 'apps-chat' },
    icon: 'tabler-message',
    title: 'Chat',
    category: 'appsPages',
  },
  {
    id: 7,
    url: { name: 'apps-invoice-list' },
    icon: 'tabler-list',
    title: 'Invoice List',
    category: 'appsPages',
  },
  {
    id: 8,
    url: { name: 'apps-invoice-preview-id', params: { id: '5036' } },
    icon: 'tabler-file-description',
    title: 'Invoice Preview',
    category: 'appsPages',
  },
  {
    id: 9,
    url: { name: 'apps-invoice-edit-id', params: { id: '5036' } },
    icon: 'tabler-file-pencil',
    title: 'Invoice Edit',
    category: 'appsPages',
  },
  {
    id: 11,
    url: { name: 'apps-invoice-add' },
    icon: 'tabler-file-plus',
    title: 'Invoice Add',
    category: 'appsPages',
  },
  {
    id: 12,
    url: { name: 'apps-user-list' },
    icon: 'tabler-user',
    title: 'User List',
    category: 'appsPages',
  },
  {
    id: 13,
    url: { name: 'apps-user-view-id', params: { id: 21 } },
    icon: 'tabler-eye',
    title: 'User View',
    category: 'appsPages',
  },
  {
    id: 15,
    url: { name: 'pages-ajuda' },
    icon: 'tabler-help',
    title: 'Help Center',
    category: 'appsPages',
  },
  {
    id: 16,
    url: { name: 'pages-user-profile-tab', params: { tab: 'profile' } },
    icon: 'tabler-user',
    title: 'User Profile - Profile',
    category: 'appsPages',
  },
  {
    id: 17,
    url: { name: 'pages-definicoes-tab', params: { tab: 'conta' } },
    icon: 'tabler-user',
    title: 'Account Settings - Account',
    category: 'appsPages',
  },
  {
    id: 18,
    url: { name: 'pages-definicoes-tab', params: { tab: 'seguranca' } },
    icon: 'tabler-lock-open',
    title: 'Account Settings - seguranca',
    category: 'appsPages',
  },
  {
    id: 19,
    url: { name: 'pages-definicoes-tab', params: { tab: 'pagamentos' } },
    icon: 'tabler-currency-dollar',
    title: 'Account Settings - Billing',
    category: 'appsPages',
  },
  {
    id: 20,
    url: { name: 'pages-definicoes-tab', params: { tab: 'notification' } },
    icon: 'tabler-bell',
    title: 'Account Settings - Notifications',
    category: 'appsPages',
  },
  {
    id: 21,
    url: { name: 'pages-definicoes-tab', params: { tab: 'connection' } },
    icon: 'tabler-link',
    title: 'Account Settings - Connections',
    category: 'appsPages',
  },
  {
    id: 22,
    url: { name: 'pages-pricing' },
    icon: 'tabler-currency-dollar',
    title: 'Pricing',
    category: 'appsPages',
  },
  {
    id: 23,
    url: { name: 'pages-faq' },
    icon: 'tabler-help',
    title: 'FAQ',
    category: 'appsPages',
  },
  {
    id: 24,
    url: { name: 'pages-misc-coming-soon' },
    icon: 'tabler-clock',
    title: 'Coming Soon',
    category: 'appsPages',
  },
  {
    id: 25,
    url: { name: 'pages-misc-em-construcao' },
    icon: 'tabler-settings',
    title: 'Under Maintenance',
    category: 'appsPages',
  },
  {
    id: 26,
    url: { name: 'pages-misc-not-found' },
    icon: 'tabler-alert-circle',
    title: 'Page Not Found - 404',
    category: 'appsPages',
  },
  {
    id: 27,
    url: { name: 'pages-misc-not-authorized' },
    icon: 'tabler-users',
    title: 'Not Authorized - 401',
    category: 'appsPages',
  },
  {
    id: 28,
    url: { name: 'pages-misc-internal-server-error' },
    icon: 'tabler-list',
    title: 'Server Error - 500',
    category: 'appsPages',
  },

  
  {
    id: 79,
    url: { name: 'access-control' },
    icon: 'tabler-shield',
    title: 'Access Control (ACL)',
    category: 'chartsMisc',
  },
 
  {
    id: 83,
    url: { name: 'extensions-tour' },
    icon: 'mdi-cube-outline',
    title: 'Tour',
    category: 'userInterface',
  },
]


// ** GET Search Data
// eslint-disable-next-line sonarjs/cognitive-complexity
mock.onGet('/app-bar/search').reply(config => {
  const { q = '' } = config.params
  const queryLowered = q.toLowerCase()

  const exactData = {
    dashboards: [],
    appsPages: [],
    userInterface: [],
    formsTables: [],
    chartsMisc: [],
  }

  const includeData = {
    dashboards: [],
    appsPages: [],
    userInterface: [],
    formsTables: [],
    chartsMisc: [],
  }

  database.forEach(obj => {
    const isMatched = obj.title.toLowerCase().startsWith(queryLowered)
    if (isMatched && exactData[obj.category].length < 5)
      exactData[obj.category].push(obj)
  })
  database.forEach(obj => {
    const isMatched = !obj.title.toLowerCase().startsWith(queryLowered) && obj.title.toLowerCase().includes(queryLowered)
    if (isMatched && includeData[obj.category].length < 5)
      includeData[obj.category].push(obj)
  })

  const categoriesCheck = []

  Object.keys(exactData).forEach(category => {
    if (exactData[category].length > 0)
      categoriesCheck.push(category)
  })
  if (categoriesCheck.length === 0) {
    Object.keys(includeData).forEach(category => {
      if (includeData[category].length > 0)
        categoriesCheck.push(category)
    })
  }
  const resultsLength = categoriesCheck.length === 1 ? 5 : 3
  const mergedData = []

  Object.keys(exactData).forEach(element => {
    if (exactData[element].length || includeData[element].length) {
      const r = exactData[element].concat(includeData[element]).slice(0, resultsLength)

      r.unshift({ header: element, title: element })
      mergedData.push(...r)
    }
  })

  return [200, [...mergedData]]
})
