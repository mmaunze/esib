import axios from '@axios'
import { defineStore } from 'pinia'

export const useMonografiaListStore = defineStore('MonografiaStore', {
  actions: {
    // 👉 Fetch users data
    fetchMonografias(params) { return axios.get('/pages/obras/monografias', { params }) },

    // 👉 Add User
    addMonografia(monografiaData) {
      return new Promise((resolve, reject) => {
        axios.post('/pages/obras/monografia/monografia', {
          monografia: monografiaData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single user
    fetchMonografia(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/pages/obras/monografias/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete User
    deleteMonografia(id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/pages/obras/monografias/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
