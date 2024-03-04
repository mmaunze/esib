import axios from '@axios'
import { defineStore } from 'pinia'

export const useObraListStore = defineStore('ObraListStore', {
  actions: {
    // 👉 Buscar dados das obras
    fetchObras(params) { return axios.get('/pages/obras/list', { params }) },

    // 👉 Adicionar Obra
    addObra(obraData) {
      return new Promise((resolve, reject) => {
        axios.post('/pages/obras/obra', {
          obra: obraData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 Buscar obra única
    fetchObra(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/pages/obras/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Remover Obra
    deleteObra(id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/pages/obras/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
