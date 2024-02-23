import mock from '@/@fake-db/mock'
import { genId, paginateArray } from '@/@fake-db/utils'
import avatar1 from '@images/avatars/avatar-1.png'

const userData = JSON.parse(localStorage.getItem("userData") || "null")


const utilizador = {
  id: 20200401053,
  nome: 'Meldo Leonardo Maunze',
  contacto: '872135644',
  email: 'mmaunze@unilurio.ac.mz',
  sexo: 'M',
  username: 'mmaunze',
  areaCientifica: 'engenharia',
  tipoUtilizador: 'adminsitrador',
  departamento: 'engenharia informatica',
}

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

    //Aqui deve ser por departamento
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
