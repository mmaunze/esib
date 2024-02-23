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
  livroname: 'mmaunze',
  areaCientifica: 'engenharia',
  tipoUtilizador: 'Adminsitrador',
  departamento: 'engenharia informatica',
}

const livros = [
  {
    id: 20200401054,
    nome: 'Meldo',
    contacto: '872135644',
    email: 'mmaunze@unilurio.ac.mz',
    sexo: 'M',
    livroname: 'mmaunze',
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
    livroname: 'mmaunze',
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
    livroname: 'mmaunze',
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
    livroname: 'mmaunze',
    areaCientifica: 'quimica',
    tipoUtilizador: 'Docente',
    departamento: 'Ecologia Marinha',
    avatar: avatar2,
  },

]

// 👉  return livros
// eslint-disable-next-line sonarjs/cognitive-complexity
mock.onGet('/apps/livros/list').reply(config => 
{
  const { q = '', tipoUtilizador = null, departamento = null, areaCientifica = null, options = {} } 
  = config.params ?? {}

  const { sortBy = '', itemsPerPage = 10, page = 1 } = options
  const queryLower = q.toLowerCase()

  // filter livros
  let filteredlivros = livros.filter(livro =>
    ((livro.nome.toLowerCase().includes(queryLower) || 
    livro.email.toLowerCase().includes(queryLower)) && 
    livro.tipoUtilizador === (tipoUtilizador || livro.tipoUtilizador) 
    && livro.departamento === (departamento || livro.departamento) 
    && livro.areaCientifica === (areaCientifica || livro.areaCientifica))).reverse()

  // sort livros
  const sort = JSON.parse(JSON.stringify(sortBy))
  if (sort.length) {
    if (sort[0]?.key === 'livro') {
      filteredlivros = filteredlivros.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.nome.localeCompare(b.nome)
        else
          return b.nome.localeCompare(a.nome)
      })
    }


    if (sort[0]?.key === 'tipoUtilizador') {
      filteredlivros = filteredlivros.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.tipoUtilizador.localeCompare(b.tipoUtilizador)
        else
          return b.tipoUtilizador.localeCompare(a.tipoUtilizador)
      })
    }


    if (sort[0]?.key === 'departamento') {
      filteredlivros = filteredlivros.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.departamento.localeCompare(b.departamento)
        else
          return b.currentdepartamento.localeCompare(a.departamento)
      })
    }


    if (sort[0]?.key === 'areaCientifica') {
      filteredlivros = filteredlivros.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.areaCientifica.localeCompare(b.areaCientifica)
        else
          return b.areaCientifica.localeCompare(a.areaCientifica)
      })
    }
  }
  const totallivros = filteredlivros.length

  // total pages
  const totalPages = Math.ceil(totallivros / itemsPerPage)

  return [200, { livros: paginateArray(filteredlivros, itemsPerPage, page), 
    totalPages, 
    totallivros, 
    page: page > Math.ceil(totallivros / itemsPerPage) ? 1 : page }]
    
})

// 👉 Add livro
mock.onPost('/pages/obras/livros/livro').reply(config => {
  const { livro } = JSON.parse(config.data)

  livro.id = genId(livros)
  livros.push(livro)

  return [201, { livro }]
})

// 👉 Get Single livro
mock.onGet(/\/pages\/obras\/livros\/\d+/).reply(config => {
  // Get event id from URL
  const livroId = config.url?.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  const Id = Number(livroId)
  const livroIndex = livros.findIndex(e => e.id === Id)
  const livro = livros[livroIndex]

  Object.assign(livro, {
    taskDone: 1230,
    projectDone: 568,
    taxId: livroData.taxId,
    language: livroData.language,
  })
  if (livro)
    return [200, livro]

  return [404]
})

mock.onDelete(/\/pages\/obras\/livros\/\d+/).reply(config => {
  // Get livro id from URL
  const livroId = config.url?.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  const Id = Number(livroId)
  const livroIndex = livros.findIndex(e => e.id === Id)
  if (livroIndex >= 0) {
    livros.splice(livroIndex, 1)

    return [200]
  }

  return [400]
})
export default livros
