// eslint-disable-next-line
import axios from 'utilities/axios'
// eslint-disable-next-line
import qs from 'qs'

import api from 'api'

export default {
  signup (obj) {
    return axios.post(`${api.url}/users`, obj)
  },
  signin (obj) {
  
    return axios.post(`${api.url}/users/authenticate/`, obj)
  },
  signout () {
    // return axios.post(`${api.url}/api/Account/Logout`)
  },
  
  getUsers () {
    return axios.get(`${api.url}/api/users/Users`)
  }

}
