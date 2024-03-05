import axios from '@axios'
import { defineStore } from 'pinia'

export const useUtilizadorListStore = defineStore('UtilizadorStore', {
  actions: {
    // 👉 Fetch users data
    fetchUsers(params) { return axios.get('/utilizadores', { params }) },

    // 👉 Add User
    addUser(userData) {
      return new Promise((resolve, reject) => {
        axios.post('/utilizadores/utilizador', {
          user: userData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single user
    fetchUser(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/utilizadores/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete User
    deleteUser(id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/utilizadores/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
