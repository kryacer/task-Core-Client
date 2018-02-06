import api from 'api'
// eslint-disable-next-line
import axios from 'utilities/axios'

 const path = '/api/Tasks'

export default {
  create (obj) {
    return axios.post(`${api.url}/Task/Add`, obj)
  },

  getDetails (obj) {
    return axios.get(api.url + path, obj)
  },

  edit (obj) {
    return axios.post(api.url + path, obj)
  },

  remove (obj) {
    return axios.post(`${api.url + path}/Remove/?id=${obj.id}`, obj)
  },


  delete (obj) {
    return axios.post(api.url + path, obj)
  },

  list () {
    return axios.get(`${api.url}/Task/GetAll`)
  },
  oppositeMark (obj){
    return axios.post(`${api.url}/task/oppositeMark`, obj)
  },
  // list (type, obj) {
  //   return axios.get(`${api.url + path}?type=${type}${this.objToQuery(obj)}`)
  // },

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
