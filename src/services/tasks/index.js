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
  searchByTag (tag){
    return axios.get(`${api.url}/task/searchByTag?tag=${tag}`)
  },
  tagsFilter (tags){
    const arr1 = []
    for(let i=0; i<tags.length; i+=1){
      if(tags[i] !==''){
        arr1.push(tags[i].toLowerCase())
      }
     }
     const uniqArray = Array.from(new Set(arr1))
     return uniqArray
 },
 getTags (){
   return axios.get(`${api.url}/Task/GetAllTags`)
 }
}
