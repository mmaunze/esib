import axios from '@axios'
import { defineStore } from 'pinia'

export const useObraListStore = defineStore('ObraStore', {
  actions: {
    // 👉 Fetch users data
    fetchObras(params) { return axios.get('/pages/obras', { params }) },

    // 👉 Add User
    addObra(obraData) {
      return new Promise((resolve, reject) => {
        axios.post('/pages/obras/obra', {
          user: obraData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single user
    fetchObra(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/pages/obras/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete User
    deleteObra(id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/pages/obras/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
