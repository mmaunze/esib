import mock from '@/@fake-db/mock'
import { genId, paginateArray } from '@/@fake-db/utils'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'

const userData = JSON.parse(localStorage.getItem("userData") || "null")

const users = [
  {
    id: 0,
    fullName: 'Meldo Leonardo Maunze',
    company: 'Prefaculdade ',
    role: 'administrador',
    provincia: 'Maputo',
    contact: '(258) 872135644',
    email: 'mlmaunze@gmail.com',
    currentPlan: 'enterprise',
    status: 'active',
    billing: 'Auto Debit',
    avatar: avatar1,
  },
  {
    id: 1,
    fullName: 'Galen Slixby',
    company: 'Yotz PVT LTD',
    role: 'editor',
    provincia: 'El Salvador',
    contact: '(479) 232-9151',
    email: 'gslixby0@abc.net.au',
    currentPlan: 'enterprise',
    status: 'inactive',
    billing: 'Auto Debit',
    avatar: '',
  },
  {
    id: 2,
    fullName: 'Halsey Redmore',
    company: 'Skinder PVT LTD',
    role: 'author',
    provincia: 'Albania',
    contact: '(472) 607-9137',
    email: 'hredmore1@imgur.com',
    currentPlan: 'team',
    status: 'privado',
    avatar: avatar1,
    billing: 'Manual - Paypal',
  },
  {
    id: 3,
    fullName: 'Marjory Sicely',
    company: 'Oozz PVT LTD',
    role: 'maintainer',
    provincia: 'Russia',
    contact: '(321) 264-4599',
    email: 'msicely2@who.int',
    currentPlan: 'enterprise',
    status: 'publico',
    avatar: avatar1,
    billing: 'Manual - Cash',
  },
  {
    id: 4,
    fullName: 'Cyrill Risby',
    company: 'Oozz PVT LTD',
    role: 'maintainer',
    provincia: 'China',
    contact: '(923) 690-6806',
    email: 'crisby3@wordpress.com',
    currentPlan: 'team',
    status: 'inactive',
    avatar: avatar3,
    billing: 'Manual - Credit Card',
  },
  {
    id: 5,
    fullName: 'Maggy Hurran',
    company: 'Aimbo PVT LTD',
    role: 'subscriber',
    provincia: 'Pakistan',
    contact: '(669) 914-1078',
    email: 'mhurran4@yahoo.co.jp',
    currentPlan: 'enterprise',
    status: 'privado',
    avatar: avatar1,
    billing: 'Auto Debit',
  },
  {
    id: 6,
    fullName: 'Silvain Halstead',
    company: 'Jaxbean PVT LTD',
    role: 'author',
    provincia: 'China',
    contact: '(958) 973-3093',
    email: 'shalstead5@shinystat.com',
    currentPlan: 'company',
    status: 'publico',
    avatar: '',
    billing: 'Manual - Cash',
  },
  {
    id: 7,
    fullName: 'Breena Gallemore',
    company: 'Jazzy PVT LTD',
    role: 'subscriber',
    provincia: 'Canada',
    contact: '(825) 977-8152',
    email: 'bgallemore6@boston.com',
    currentPlan: 'company',
    status: 'privado',
    avatar: '',
    billing: 'Manual - Cash',
  },
  {
    id: 8,
    fullName: 'Kathryne Liger',
    company: 'Pixoboo PVT LTD',
    role: 'author',
    provincia: 'France',
    contact: '(187) 440-0934',
    email: 'kliger7@vinaora.com',
    currentPlan: 'enterprise',
    status: 'privado',
    avatar: avatar4,
    billing: 'Manual - Cash',
  },
  {
    id: 9,
    fullName: 'Franz Scotfurth',
    company: 'Tekfly PVT LTD',
    role: 'subscriber',
    provincia: 'China',
    contact: '(978) 146-5443',
    email: 'fscotfurth8@dailymotion.com',
    currentPlan: 'team',
    status: 'privado',
    avatar: avatar2,
    billing: 'Manual - Cash',
  },
  {
    id: 10,
    fullName: 'Jillene Bellany',
    company: 'Gigashots PVT LTD',
    role: 'maintainer',
    provincia: 'Jamaica',
    contact: '(589) 284-6732',
    email: 'jbellany9@kickstarter.com',
    currentPlan: 'company',
    status: 'inactive',
    avatar: avatar5,
    billing: 'Manual - Cash',
  },
  {
    id: 11,
    fullName: 'Jonah Wharlton',
    company: 'Eare PVT LTD',
    role: 'subscriber',
    provincia: 'United States',
    contact: '(176) 532-6824',
    email: 'jwharltona@oakley.com',
    currentPlan: 'team',
    status: 'inactive',
    avatar: avatar4,
    billing: 'Manual - Cash',
  },
  {
    id: 12,
    fullName: 'Seth Hallam',
    company: 'Yakitri PVT LTD',
    role: 'subscriber',
    provincia: 'Peru',
    contact: '(234) 464-0600',
    email: 'shallamb@hugedomains.com',
    currentPlan: 'team',
    status: 'privado',
    avatar: avatar5,
    billing: 'Manual - Cash',
  },
  {
    id: 13,
    fullName: 'Yoko Pottie',
    company: 'Leenti PVT LTD',
    role: 'subscriber',
    provincia: 'Philippines',
    contact: '(907) 284-5083',
    email: 'ypottiec@privacy.gov.au',
    currentPlan: 'basic',
    status: 'inactive',
    avatar: avatar7,
    billing: 'Manual - Cash',
  },
  {
    id: 14,
    fullName: 'Maximilianus Krause',
    company: 'Digitube PVT LTD',
    role: 'author',
    provincia: 'Democratic Republic of the Congo',
    contact: '(167) 135-7392',
    email: 'mkraused@stanford.edu',
    currentPlan: 'team',
    status: 'publico',
    avatar: avatar6,
    billing: 'Manual - Cash',
  },
  {
    id: 15,
    fullName: 'Zsazsa McCleverty',
    company: 'Kaymbo PVT LTD',
    role: 'maintainer',
    provincia: 'France',
    contact: '(317) 409-6565',
    email: 'zmcclevertye@soundcloud.com',
    currentPlan: 'enterprise',
    status: 'publico',
    avatar: avatar2,
    billing: 'Manual - Cash',
  },
  {
    id: 16,
    fullName: 'Bentlee Emblin',
    company: 'Yambee PVT LTD',
    role: 'author',
    provincia: 'Spain',
    contact: '(590) 606-1056',
    email: 'bemblinf@wired.com',
    currentPlan: 'company',
    status: 'publico',
    avatar: avatar6,
    billing: 'Manual - Cash',
  },
  {
    id: 17,
    fullName: 'Brockie Myles',
    company: 'Wikivu PVT LTD',
    role: 'maintainer',
    provincia: 'Poland',
    contact: '(553) 225-9905',
    email: 'bmylesg@amazon.com',
    currentPlan: 'basic',
    status: 'publico',
    avatar: '',
    billing: 'Manual - Cash',
  },
  {
    id: 18,
    fullName: 'Bertha Biner',
    company: 'Twinte PVT LTD',
    role: 'editor',
    provincia: 'Yemen',
    contact: '(901) 916-9287',
    email: 'bbinerh@mozilla.com',
    currentPlan: 'team',
    status: 'publico',
    avatar: avatar7,
    billing: 'Manual - Cash',
  },
  {
    id: 19,
    fullName: 'Travus Bruntjen',
    company: 'Cogidoo PVT LTD',
    role: 'administrador',
    provincia: 'France',
    contact: '(524) 586-6057',
    email: 'tbruntjeni@sitemeter.com',
    currentPlan: 'enterprise',
    status: 'publico',
    avatar: '',
    billing: 'Auto Debit',
  },
  {
    id: 20,
    fullName: 'Wesley Burland',
    company: 'Bubblemix PVT LTD',
    role: 'editor',
    provincia: 'Honduras',
    contact: '(569) 683-1292',
    email: 'wburlandj@uiuc.edu',
    currentPlan: 'team',
    status: 'inactive',
    avatar: avatar6,
    billing: 'Manual - Cash',
  },
  {
    id: 21,
    fullName: 'Selina Kyle',
    company: 'Wayne Enterprises',
    role: 'administrador',
    provincia: 'Maputo',
    contact: '(829) 537-0057',
    email: 'irena.dubrovna@wayne.com',
    currentPlan: 'team',
    status: 'publico',
    avatar: avatar1,
    billing: 'Manual - Cash',
  },
  {
    id: 22,
    fullName: 'Jameson Lyster',
    company: 'Quaxo PVT LTD',
    role: 'editor',
    provincia: 'Ukraine',
    contact: '(593) 624-0222',
    email: 'jlysterl@guardian.co.uk',
    currentPlan: 'company',
    status: 'inactive',
    avatar: avatar8,
    billing: 'Auto Debit',
  },
  {
    id: 23,
    fullName: 'Kare Skitterel',
    company: 'Ainyx PVT LTD',
    role: 'maintainer',
    provincia: 'Poland',
    contact: '(254) 845-4107',
    email: 'kskitterelm@ainyx.com',
    currentPlan: 'basic',
    status: 'privado',
    avatar: avatar3,
    billing: 'Manual - Cash',
  },
  {
    id: 24,
    fullName: 'Cleavland Hatherleigh',
    company: 'Flipopia PVT LTD',
    role: 'administrador',
    provincia: 'Brazil',
    contact: '(700) 783-7498',
    email: 'chatherleighn@washington.edu',
    currentPlan: 'team',
    status: 'privado',
    avatar: avatar2,
    billing: 'Manual - Cash',
  },
]


// 👉  return users
// eslint-disable-next-line sonarjs/cognitive-complexity
mock.onGet('/apps/users/list').reply(config => {
  const { q = '', role = null, plan = null, status = null, options = {} } = config.params ?? {}
  const { sortBy = '', itemsPerPage = 10, page = 1 } = options
  const queryLower = q.toLowerCase()

  // filter users
  let filteredUsers = users.filter(user => ((user.fullName.toLowerCase().includes(queryLower) || user.email.toLowerCase().includes(queryLower)) && user.role === (role || user.role) && user.currentPlan === (plan || user.currentPlan) && user.status === (status || user.status))).reverse()

  // sort users
  const sort = JSON.parse(JSON.stringify(sortBy))
  if (sort.length) {
    if (sort[0]?.key === 'user') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.fullName.localeCompare(b.fullName)
        else
          return b.fullName.localeCompare(a.fullName)
      })
    }
    if (sort[0]?.key === 'billing') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.billing.localeCompare(b.billing)
        else
          return b.billing.localeCompare(a.billing)
      })
    }
    if (sort[0]?.key === 'role') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.role.localeCompare(b.role)
        else
          return b.role.localeCompare(a.role)
      })
    }
    if (sort[0]?.key === 'plan') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.currentPlan.localeCompare(b.currentPlan)
        else
          return b.currentPlan.localeCompare(a.currentPlan)
      })
    }
    if (sort[0]?.key === 'status') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.status.localeCompare(b.status)
        else
          return b.status.localeCompare(a.status)
      })
    }
  }
  const totalUsers = filteredUsers.length

  // total pages
  const totalPages = Math.ceil(totalUsers / itemsPerPage)
  
  return [200, { users: paginateArray(filteredUsers, itemsPerPage, page), totalPages, totalUsers, page: page > Math.ceil(totalUsers / itemsPerPage) ? 1 : page }]
})

// 👉 Add user
mock.onPost('/apps/users/user').reply(config => {
  const { user } = JSON.parse(config.data)

  user.id = genId(users)
  users.push(user)
  
  return [201, { user }]
})

// 👉 Get Single user
mock.onGet(/\/apps\/users\/\d+/).reply(config => {
  // Get event id from URL
  const userId = config.url?.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  const Id = Number(userId)
  const userIndex = users.findIndex(e => e.id === Id)
  const user = users[userIndex]

  Object.assign(user, {
    taskDone: 1230,
    projectDone: 568,
    taxId: userData.taxId,
    language: userData.language,
  })
  if (user)
    return [200, user]
  
  return [404]
})
mock.onDelete(/\/apps\/users\/\d+/).reply(config => {
  // Get user id from URL
  const userId = config.url?.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  const Id = Number(userId)
  const userIndex = users.findIndex(e => e.id === Id)
  if (userIndex >= 0) {
    users.splice(userIndex, 1)
    
    return [200]
  }
  
  return [400]
})
export default users
