import api from 'api'
// eslint-disable-next-line
import axios from 'utilities/axios'

export default {
  create (obj) {
    return axios.post(`${api.url}/Task/Add`, obj)
  },
  oppositeMark (obj){
    return axios.post(`${api.url}/task/oppositeMark`, obj)
  },
  list () {
    return axios.get(`${api.url}/Task/GetAll`)
  },
  delete (id) {
    return axios.delete(`${api.url}/Task/delete?id=${id}`)
  },
  edit (obj) {
    return axios.put(`${api.url}/task/update`, obj)
  },
  search (text){
    return axios.get(`${api.url}/task/search?query=${text}`)
  },
  
  objToQuery (obj) {
    let query = ''
    let val = ''
    // eslint-disable-next-line
    for (const prop in obj) {
      val = obj[prop]
      if ((val && (val.trim && val.trim() !== '')) || val > 0) {
        query += `&${prop}=${val}`
      }
    }
    return query
  }
}
