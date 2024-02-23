import mock from '@/@fake-db/mock'
import { genId, paginateArray } from '@/@fake-db/utils'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'


const userData = JSON.parse(localStorage.getItem("userData") || "null")


const utilizador = {
  id: 20200401053,
  nome: 'Meldo Leonardo Maunze',
  contacto: '872135644',
  email: 'mmaunze@unilurio.ac.mz',
  sexo: 'M',
  username: 'mmaunze',
  areaCientifica: 'engenharia',
  tipoUtilizador: 'Adminsitrador',
  departamento: 'engenharia informatica',
}

const users = [
  {
    id: 20200401054,
    nome: 'Meldo',
    contacto: '872135644',
    email: 'mmaunze@unilurio.ac.mz',
    sexo: 'M',
    username: 'mmaunze',
    areaCientifica: 'matematica',
    tipoUtilizador: 'adminsitrador',
    departamento: 'Engenharia informatica',
    avatar: avatar1,
  },
  {
    id: 1,
    nome: 'Leonaro',
    contacto: '872135644',
    email: 'mmaunze@unilurio.ac.mz',
    sexo: 'M',
    username: 'mmaunze',
    areaCientifica: 'fisica',
    tipoUtilizador: 'Bibliotecario',
    departamento: 'fisica',
    avatar: '',
  },
  {
    id: 2,
    nome: 'Maunze',
    contacto: '872135644',
    email: 'mmaunze@unilurio.ac.mz',
    sexo: 'M',
    username: 'mmaunze',
    areaCientifica: 'biologia',
    tipoUtilizador: 'Estudante',
    departamento: 'Ecologia Marinha',
    avatar: avatar2,
  },
  {
    id: 100,
    nome: 'Julinho',
    contacto: '872135644',
    email: 'mmaunze@unilurio.ac.mz',
    sexo: 'M',
    username: 'mmaunze',
    areaCientifica: 'quimica',
    tipoUtilizador: 'Docente',
    departamento: 'Ecologia Marinha',
    avatar: avatar2,
  },

]

// 👉  return users
// eslint-disable-next-line sonarjs/cognitive-complexity
mock.onGet('/apps/users/list').reply(config => 
{
  const { q = '', tipoUtilizador = null, departamento = null, areaCientifica = null, options = {} } 
  = config.params ?? {}

  const { sortBy = '', itemsPerPage = 10, page = 1 } = options
  const queryLower = q.toLowerCase()

  // filter users
  let filteredUsers = users.filter(user =>
    ((user.nome.toLowerCase().includes(queryLower) || 
    user.email.toLowerCase().includes(queryLower)) && 
    user.tipoUtilizador === (tipoUtilizador || user.tipoUtilizador) 
    && user.departamento === (departamento || user.departamento) 
    && user.areaCientifica === (areaCientifica || user.areaCientifica))).reverse()

  // sort users
  const sort = JSON.parse(JSON.stringify(sortBy))
  if (sort.length) {
    if (sort[0]?.key === 'user') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.nome.localeCompare(b.nome)
        else
          return b.nome.localeCompare(a.nome)
      })
    }


/*
    //Aqui deve ser por departamento
    if (sort[0]?.key === 'billing') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.billing.localeCompare(b.billing)
        else
          return b.billing.localeCompare(a.billing)
      })
    }*/


    if (sort[0]?.key === 'tipoUtilizador') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.tipoUtilizador.localeCompare(b.tipoUtilizador)
        else
          return b.tipoUtilizador.localeCompare(a.tipoUtilizador)
      })
    }


    if (sort[0]?.key === 'departamento') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.departamento.localeCompare(b.departamento)
        else
          return b.currentdepartamento.localeCompare(a.departamento)
      })
    }


    if (sort[0]?.key === 'areaCientifica') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.areaCientifica.localeCompare(b.areaCientifica)
        else
          return b.areaCientifica.localeCompare(a.areaCientifica)
      })
    }
  }
  const totalUsers = filteredUsers.length

  // total pages
  const totalPages = Math.ceil(totalUsers / itemsPerPage)

  return [200, { users: paginateArray(filteredUsers, itemsPerPage, page), 
    totalPages, 
    totalUsers, 
    page: page > Math.ceil(totalUsers / itemsPerPage) ? 1 : page }]
    
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

/**
 * 

import mock from '@/@fake-db/mock'
import { genId, paginateArray } from '@/@fake-db/utils'

const userData = JSON.parse(localStorage.getItem("userData") || "null")

const url = 'http://localhost:8080/utilizadores'

let users = []

fetch(url)
  .then(response => response.json())
  .then(utilizadores => {
    // Mapear os dados da API para o formato desejado
    users = utilizadores.map(user => ({
      id: user.id,
      nome: user.nome,
      contacto: user.contacto,
      email: user.email,
      sexo: user.sexo,
      username: user.username,
      areaCientifica: user.areaCientifica,
      tipoUtilizador: user.tipoUtilizador,
      departamento: user.departamento,
      avatar: "",
    }))

    // Os dados formatados estarão em `users`
    console.log(users)
  })
  .catch(error => console.error('Erro ao buscar dados da API:', error))


// 👉  return users
// eslint-disable-next-line sonarjs/cognitive-complexity
mock.onGet('/apps/users/list').reply(config => {
  const { q = '', tipoUtilizador = null, departamento = null, areaCientifica = null, options = {} }
    = config.params ?? {}

  const { sortBy = '', itemsPerPage = 10, page = 1 } = options
  const queryLower = q.toLowerCase()

  // filter users
  let filteredUsers = users.filter(user =>
    ((user.nome.toLowerCase().includes(queryLower) ||
    user.email.toLowerCase().includes(queryLower)) &&
    user.tipoUtilizador === (tipoUtilizador || user.tipoUtilizador)
    && user.departamento === (departamento || user.departamento)
    && user.areaCientifica === (areaCientifica || user.areaCientifica))).reverse()

  // sort users
  const sort = JSON.parse(JSON.stringify(sortBy))
  if (sort.length) {
    if (sort[0]?.key === 'user') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.nome.localeCompare(b.nome)
        else
          return b.nome.localeCompare(a.nome)
      })
    }


    /*
    //Aqui deve ser por departamento
    if (sort[0]?.key === 'billing') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.billing.localeCompare(b.billing)
        else
          return b.billing.localeCompare(a.billing)
      })
    }*/

/*
    if (sort[0]?.key === 'tipoUtilizador') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.tipoUtilizador.localeCompare(b.tipoUtilizador)
        else
          return b.tipoUtilizador.localeCompare(a.tipoUtilizador)
      })
    }


    if (sort[0]?.key === 'departamento') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.departamento.localeCompare(b.departamento)
        else
          return b.currentdepartamento.localeCompare(a.departamento)
      })
    }


    if (sort[0]?.key === 'areaCientifica') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.areaCientifica.localeCompare(b.areaCientifica)
        else
          return b.areaCientifica.localeCompare(a.areaCientifica)
      })
    }
  }
  const totalUsers = filteredUsers.length

  // total pages
  const totalPages = Math.ceil(totalUsers / itemsPerPage)

  return [200, {
    users: paginateArray(filteredUsers, itemsPerPage, page),
    totalPages,
    totalUsers,
    page: page > Math.ceil(totalUsers / itemsPerPage) ? 1 : page,
  }]

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

*/
