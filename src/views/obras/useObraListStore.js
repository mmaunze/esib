import axios from '@axios'
import { defineStore } from 'pinia'

export const useObraListStore = defineStore('ObraStore', {
  actions: {
    // 👉 Fetch users data
    fetchObras(params) { return axios.get('/obras', { params }) },

    // 👉 Add User
    addObra(obraData) {
      return new Promise((resolve, reject) => {
        axios.post('/obras/obra', {
          user: obraData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single user
    fetchObra(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/obras/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete User
    deleteObra(id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/obras/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
