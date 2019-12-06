import axios from 'axios'

// for production
const BASE_URL = window.origin

// for development
// const BASE_URL = 'http://localhost:4000'

export default {
  request(params) {
    // to minimise base url redunduncy
    params.url = BASE_URL + params.url

    // default to get
    params.method = params.method? params.method: 'GET'
    return axios(params)
  },

  getAllProducts() {
    return new Promise(async (resolve) => {
      let result = []
      try {
        result = (await this.request({
          url: '/products'
        })).data
      } catch (e) {
        console.log('Error while fetching data.: ', e)
      }

      resolve(result)
    })
  },

  getProduct(id) {
    return new Promise(async (resolve) => {
      let result = []
      try {
        result = (await this.request({
          url: `/product/${ id }`
        })).data
      } catch (e) {
        console.log('Error while fetching data.: ', e)
      }

      resolve(result)
    })
  },

  editProduct(id, data) {
    return new Promise(async (resolve) => {
      let result = []
      try {
        result = (await this.request({
          url: `/product/${ id }`,
          method: 'PATCH',
          contentType: 'application/json',
          data: data
        })).data
      } catch (e) {
        console.log('Error while fetching data.: ', e)
      }

      resolve(result)
    })
  },

  addProduct(data) {
    return new Promise(async (resolve) => {
      let result = []
      try {
        result = (await this.request({
          url: `/product/`,
          method: 'POST',
          contentType: 'application/json',
          data: data
        })).data
      } catch (e) {
        console.log('Error while fetching data.: ', e)
      }

      resolve(result)
    })
  },

  removeProduct(id) {
    return new Promise(async (resolve) => {
      let result = []
      try {
        result = (await this.request({
          url: `/product/${ id }`,
          method: 'DELETE',
          contentType: 'application/json',
          data: {}
        })).data
      } catch (e) {
        console.log('Error while fetching data.: ', e)
      }

      resolve(result)
    })
  }
}