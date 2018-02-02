// eslint-disable-next-line
import axios from 'utilities/axios'
// eslint-disable-next-line
import qs from 'qs'

import api from 'api'

export default {
  // signup (obj) {
  //   return axios.post(`${api.url}/users`, obj)
  // },
  // signin (obj) {
  
  //   return axios.post(`${api.url}/users/authenticate/`, obj)
  // },
  // signout () {
  //   // return axios.post(`${api.url}/api/Account/Logout`)
  // },
  
  // getUsers () {
  //   return axios.get(`${api.url}/api/users/Users`)
  // }

  signup (obj) {
    return axios.post(`${api.url}/Users/Register`, obj)
  },
  signin (obj) {
    // eslint-disable-next-line
    obj.grant_type = 'password'
    
    return axios.post(`${api.url}/Users/Login`, obj)
  },
  signout () {
    return axios.post(`${api.url}/Account/Logout`)
  },
  // getUserInfo () {
  //   return axios.get(`${api.url}/api/Account/UserInfo`)
  // },
  // getUsers () {
  //   return axios.get(`${api.url}/api/Account/Users`)
  // }
}
