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
  list (page) {
    return axios.get(`${api.url}/Task/GetAllPaged?page=${page}`)
  },
  delete (id) {
    return axios.delete(`${api.url}/Task/delete?id=${id}`)
  },
  edit (obj) {
    return axios.put(`${api.url}/task/update`, obj)
  },
  search (text, page){
    return axios.get(`${api.url}/task/search`,
    {
      params: {
        query: text,
        page
      }
    })
  },
  searchByTag (tag, page){
    return axios.get(`${api.url}/task/searchByTag`,
    {
      params: {
        tag,
        page
      }
    })
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
