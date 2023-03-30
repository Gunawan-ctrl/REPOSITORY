import { api } from 'boot/axios'
import { createToken } from 'boot/createToken'
const ListService = {
  getListCategories () {
    return api.get('categories/getAll')
  },
  getListSubject () {
    return api.get('subject/getAll')
  },
  getListAuthor () {
    return api.get('author/getAll')
  }
}

export {
  ListService
}
