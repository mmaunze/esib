import { defineStore } from 'pinia'
import axios from '@axios'

export const useCursoListStore = defineStore('CursoListStore', {
  actions: {
    // 👉 Fetch cursos data
    fetchCursos(params) {
      return axios.get('/cursos/list', { params })
    },

    // 👉 Add Curso
    addCurso(cursoData) {
      return new Promise((resolve, reject) => {
        axios.post('/cursos/curso', {
          curso: cursoData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single curso
    fetchCurso(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/cursos/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete Curso
    deleteCurso(id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/cursos/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
