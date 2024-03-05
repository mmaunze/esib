import mock from '@/@fake-db/mock'
import { genId, paginateArray } from '@/@fake-db/utils'
import avatar1 from '@images/avatars/avatar-5.png'


const url = 'http://localhost:8080/obras/livros'

let livros = []

fetch(url)
  .then(response => response.json()).then(listaLivros => {
    // Mapear os dados da API para o formato desejado
    livros = listaLivros.map(livro => ({
      id: livro.id,
      titulo: livro.titulo,
      autores: livro.autores,
      nrPaginas: livro.nrPaginas,
      localPublicacao: livro.localPublicacao,
      anoPublicacao: livro.anoPublicacao,
      areaCientifica: livro.areaCientifica,
      localizacao: livro.localizacao,
      supervisor: livro.supervisor,
      fotografia: avatar1,
      idioma: livro.idioma,
      estado: livro.estado,
      referencia: livro.referencia,
      faculdade: livro.faculdade,
      curso: livro.curso,
      supervisor: livro.supervisor,
      coSupervisor: livro.coSupervisor,
    }))
    console.log('Todas monografias carregadas com Sucesso')
  })
  .catch(error => console.error('Erro ao buscar monografias:', error))


// 👉  return obras

// eslint-disable-next-line sonarjs/cognitive-complexity
mock.onGet('/obras/livros').reply(config => {
  const { q = '', supervisor = null, faculdade = null, idioma = null, estado = null, areaCientifica = null, options = {} }
    = config.params ?? {}

  const { sortBy = '', itemsPerPage = 10, page = 1 } = options
  const queryLower = q.toLowerCase()

  // filter obras
  let filteredMonografias = livros.filter(monografia =>
    ((monografia.titulo.toLowerCase().includes(queryLower) ||
    monografia.autores.toLowerCase().includes(queryLower)) &&
    monografia.faculdade === (faculdade || monografia.faculdade)
    && monografia.estado === (estado || monografia.estado)
    && monografia.idioma === (idioma || monografia.idioma)
    && monografia.supervisor === (supervisor || monografia.supervisor)
    && monografia.areaCientifica === (areaCientifica || monografia.areaCientifica))).reverse()

  // sort obras
  const sort = JSON.parse(JSON.stringify(sortBy))
  if (sort.length) {
    if (sort[0]?.key === 'titulo') {
      filteredMonografias = filteredMonografias.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.titulo.localeCompare(b.titulo)
        else
          return b.titulo.localeCompare(a.titulo)
      })
    }


    if (sort[0]?.key === 'idioma') {
      filteredMonografias = filteredMonografias.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.autores.localeCompare(b.idioma)
        else
          return b.autores.localeCompare(a.idioma)
      })
    }


    if (sort[0]?.key === 'autores') {
      filteredMonografias = filteredMonografias.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.autores.localeCompare(b.autores)
        else
          return b.autores.localeCompare(a.autores)
      })
    }

    if (sort[0]?.key === 'faculdade') {
      filteredMonografias = filteredMonografias.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.faculdade.localeCompare(b.faculdade)
        else
          return b.faculdade.localeCompare(a.faculdade)
      })
    }


    if (sort[0]?.key === 'estado') {
      filteredMonografias = filteredMonografias.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.estado.localeCompare(b.estado)
        else
          return b.currentestado.localeCompare(a.estado)
      })
    }


    if (sort[0]?.key === 'areaCientifica') {
      filteredMonografias = filteredMonografias.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.areaCientifica.localeCompare(b.areaCientifica)
        else
          return b.areaCientifica.localeCompare(a.areaCientifica)
      })
    }
  }

  const totalMonografias = filteredMonografias.length

  // total pages
  const totalPages = Math.ceil(totalMonografias / itemsPerPage)

  return [200, {
    monografias: paginateArray(filteredMonografias, itemsPerPage, page),
    totalPages,
    totalObras: totalMonografias,
    page: page > Math.ceil(totalMonografias / itemsPerPage) ? 1 : page,
  }]

})

// 👉 Add obra
mock.onPost('/obras/monografias/monografia').reply(config => {
  const { obra } = JSON.parse(config.data)

  obra.id = genId(livros)
  livros.push(obra)

  return [201, { obra }]
})

// 👉 Get Single obra
mock.onGet(/\/obras\/monografias\/\d+/).reply(config => {
  // Get event id from URL
  const obraId = config.url?.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  const Id = Number(obraId)
  const monografiaIndex = livros.findIndex(e => e.id === Id)
  const monografia = livros[monografiaIndex]

  if (monografia)
    return [200, monografia]

  return [404]
})

mock.onDelete(/\/obras\/monografias\/\d+/).reply(config => {
  // Get obra id from URL
  const obraId = config.url?.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  const Id = Number(obraId)
  const monografiaIndex = livros.findIndex(e => e.id === Id)
  if (monografiaIndex >= 0) {
    livros.splice(monografiaIndex, 1)

    return [200]
  }

  return [400]
})
export default livros

