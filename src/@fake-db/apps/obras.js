import mock from '@/@fake-db/mock'
import { genId, paginateArray } from '@/@fake-db/utils'
import avatar1 from '@images/avatars/avatar-1.png'


const url = 'http://localhost:8080/obras'

let obras = []

fetch(url)
  .then(response => response.json()).then(listaObras => {
    // Mapear os dados da API para o formato desejado
    obras = listaObras.map(obra => ({
      id: obra.id,
      titulo: obra.titulo,
      autores: obra.autores,
      nrPaginas: obra.nrPaginas,
      localPublicacao: obra.localPublicacao,
      anoPublicacao: obra.anoPublicacao,
      areaCientifica: obra.areaCientifica,
      localizacao: obra.localizacao,
      tipoObra: obra.tipoObra,
      fotografia: avatar1,
      idioma: obra.idioma,
      estado: obra.estado,
      referencia: obra.referencia,
    }))
    console.log('Todas Obras carregadas com Sucesso')
  })
  .catch(error => console.error('Erro ao buscar obras:', error))


// 👉  return obras

// eslint-disable-next-line sonarjs/cognitive-complexity
mock.onGet('/obras').reply(config => {
  const { q = '', tipoObra = null, estado = null, areaCientifica = null, options = {} }
    = config.params ?? {}

  const { sortBy = '', itemsPerPage = 10, page = 1 } = options
  const queryLower = q.toLowerCase()

  // filter obras
  let filteredObras = obras.filter(obra =>
    ((obra.titulo.toLowerCase().includes(queryLower) ||
    obra.autores.toLowerCase().includes(queryLower)) &&
    obra.tipoObra === (tipoObra || obra.tipoObra)
    && obra.estado === (estado || obra.estado)
    && obra.areaCientifica === (areaCientifica || obra.areaCientifica))).reverse()

  // sort obras
  const sort = JSON.parse(JSON.stringify(sortBy))
  if (sort.length) {
    if (sort[0]?.key === 'titulo') {
      filteredObras = filteredObras.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.titulo.localeCompare(b.titulo)
        else
          return b.titulo.localeCompare(a.titulo)
      })
    }


    if (sort[0]?.key === 'idioma') {
      filteredObras = filteredObras.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.autores.localeCompare(b.idioma)
        else
          return b.autores.localeCompare(a.idioma)
      })
    }


    if (sort[0]?.key === 'autores') {
      filteredObras = filteredObras.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.autores.localeCompare(b.autores)
        else
          return b.autores.localeCompare(a.autores)
      })
    }

    if (sort[0]?.key === 'tipoObra') {
      filteredObras = filteredObras.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.tipoObra.localeCompare(b.tipoObra)
        else
          return b.tipoObra.localeCompare(a.tipoObra)
      })
    }


    if (sort[0]?.key === 'estado') {
      filteredObras = filteredObras.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.estado.localeCompare(b.estado)
        else
          return b.currentestado.localeCompare(a.estado)
      })
    }


    if (sort[0]?.key === 'areaCientifica') {
      filteredObras = filteredObras.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.areaCientifica.localeCompare(b.areaCientifica)
        else
          return b.areaCientifica.localeCompare(a.areaCientifica)
      })
    }
  }

  const totalObras = filteredObras.length

  // total pages
  const totalPages = Math.ceil(totalObras / itemsPerPage)

  return [200, {
    obras: paginateArray(filteredObras, itemsPerPage, page),
    totalPages,
    totalObras,
    page: page > Math.ceil(totalObras / itemsPerPage) ? 1 : page,
  }]

})

// 👉 Add obra
mock.onPost('/obras/obra').reply(config => {
  const { obra } = JSON.parse(config.data)

  obra.id = genId(obras)
  obras.push(obra)

  return [201, { obra }]
})

// 👉 Get Single obra
mock.onGet(/\/obras\/\d+/).reply(config => {
  // Get event id from URL
  const obraId = config.url?.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  const Id = Number(obraId)
  const obraIndex = obras.findIndex(e => e.id === Id)
  const obra = obras[obraIndex]

  if (obra)
    return [200, obra]

  return [404]
})

mock.onDelete(/\/obras\/\d+/).reply(config => {
  // Get obra id from URL
  const obraId = config.url?.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  const Id = Number(obraId)
  const obraIndex = obras.findIndex(e => e.id === Id)
  if (obraIndex >= 0) {
    obras.splice(obraIndex, 1)

    return [200]
  }

  return [400]
})
export default obras

