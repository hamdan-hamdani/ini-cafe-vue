import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalCart: 0,
    count: 0,
    name: 'Hamdani Hamdan',
    todos: [],
    user: {},
    token: localStorage.getItem('token') || null,
    products: [],
    register: [],
    message: '',
    search: '',
    tmpSearch: [],
    page: 1,
    limit: 12,
    totalProducts: 0,
    lastPage: 0,
    activ: false,
    activeAddUpdate: false,
    activeHumMenu: false,
    ActivBtnCancel: false,
    ActivBtnOk: false,
    isActiveCart: false,
    isActiveCartNavbar: false
  },
  mutations: {
    kirimEmail (state) {
      var nodemailer = require('nodemailer')
      var fs = require('fs')

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mychat709@gmail.com',
          pass: 'Konsisten1!'
        }
      })

      var template = fs.readFileSync('index.html', 'utf-8')

      var mailOptions = {
        from: 'mychat709',
        to: state.user.email,
        subject: 'Selamat Datang di MyChat',
        html: template
      }
      console.log(mailOptions.html)

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err
        console.log('Email sent: ' + info.response)
      })
    },
    settotalCart (state, payload) {
      state.totalCart = payload
    },
    setCount (state, payload) {
      state.count = payload
    },
    plus (state) {
      state.count++
    },
    minus (state) {
      state.count--
    },
    setTodosu (state, payload) {
      state.todos = payload
    },
    setUser (state, payload) {
      state.user = payload
      state.token = payload.token
    },
    setRegister (state, payload) {

    },
    setAddProduct (state, payload) {
      state.products = payload
    },
    setProduct (state, payload) {
      state.products = payload
      state.totalProducts = payload[0].totalData
      const lastPage = Math.ceil(this.state.totalProducts / this.state.limit)
      state.lastPage = lastPage
    },
    setToken (state, payload) {
      state.token = payload
    },
    setMessage (state, payload) {
      state.message = payload
    },
    setSearch (state, payload) {
      state.products = payload
    },
    mutActive (state, payload) {
      state.activ = payload
    },
    mutActiveAddUpdate (state, payload) {
      state.activeAddUpdate = payload
    },
    mutHumMenu (state, payload) {
      state.activeHumMenu = payload
    },
    mutIsActiveCart (state, payload) {
      state.isActiveCart = payload
    },
    mutIsActiveCartNavbar (state, payload) {
      state.isActiveCartNavbar = payload
    },
    mutMsgAdd (state, payload) {
      state.message = payload
    },
    mutActivBtnCancel (state, payload) {
      state.ActivBtnCancel = payload
    },
    mutActivBtnOk (state, payload) {
      state.ActivBtnOk = payload
    }
  },
  actions: {
    actAllProducts (setex) {
      return new Promise((resolve, reject) => {
        axios.get('https://api-inicafe.fwdev.online/api/v1/products/?page=' + this.state.page + '&limit=' + this.state.limit)
          .then(res => {
            setex.commit('setProduct', res.data.result)
            resolve(res.data.result)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    actAddProduct (setex, payload) {
      return new Promise((resolve, reject) => {
        axios.post('https://api-inicafe.fwdev.online/api/v1/products/', payload)
          .then(async res => {
            resolve(res.data.result)
            return await new Promise((resolve, reject) => {
              axios.get('https://api-inicafe.fwdev.online/api/v1/products/?page=' + this.state.page + '&limit=' + this.state.limit)
                .then(res => {
                  setex.commit('setProduct', res.data.result)
                  resolve(res.data.result)
                })
                .catch(err => {
                  console.log(err)
                  reject(err)
                })
            })
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    actNextPage (setex, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.get('https://api-inicafe.fwdev.online/api/v1/products/?page=' + payload + '&limit=' + this.state.limit)
          .then((res) => {
            setex.commit('setProduct', res.data.result)
            resolve(res.data.result)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getTodos (setex, payload) {
    },
    actMessage (setex, payload) {
      setex.commit('setMessage', payload)
    },
    actSearch (setex, payload) {
      return new Promise((resolve, reject) => {
        axios.get('https://api-inicafe.fwdev.online/api/v1/products/?search=' + payload)
          .then(res => {
            console.log('res')
            console.log(res)
            setex.commit('setSearch', res.data.result)
            resolve(res.data.result)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    login (setex, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.post('https://api-inicafe.fwdev.online/api/v1/users/login', payload)
          .then(res => {
            console.log('res')
            console.log(res)
            setex.commit('setUser', res.data.result)
            localStorage.setItem('token', res.data.result.token)
            resolve(res.data.result)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    send (setex, payload) {
      return new Promise((resolve, reject) => {
        axios.post('https://api-inicafe.fwdev.online/api/v1/users/register', payload)
          .then(res => {
            resolve(res.data.result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getProducts (setex) {
      return new Promise((resolve, reject) => {
        axios.get('https://api-inicafe.fwdev.online/api/v1/products/?page=1&limit=3')
          .then(res => {
            setex.commit('setProduct', res.data.result)
            resolve(res.data.result)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getRegister (setex) {
      return new Promise((resolve, reject) => {
      })
    },
    interceptorsRequest (setex, payload) {
      axios.interceptors.request.use(function (config) {
      // Do something before request is sent
        console.log(payload)
        config.headers.Authorization = `Bearer ${setex.state.token}`
        return config
      }, function (error) {
        console.log(payload)
        console.log('ini error request')
        console.log(error)
        // Do something with request error
        return Promise.reject(error)
      })
    },

    // Add a response interceptor
    interceptorsResponse (setex, payload) {
      axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
        console.log(response)
        console.log(payload, 'response')
        return response
      }, function (error) {
        console.log(payload)
        console.log('ini error response')
        console.log(error.response)
        if (error.response.status === 401 && error.response.data.result.message === 'token invalid') {
          localStorage.removeItem('token')
          setex.commit('setToken', null)
          Router.push('/login')
        } else if (error.response.status === 401 && error.response.data.result.message === 'token expired') {
          alert('Token expired silahkan login')
          localStorage.removeItem('token')
          setex.commit('setToken', null)
          Router.push('/login')
        } else if (error.response.status === 401 && error.response.data.result.message === 'data sudah ada') {
          setex.commit('setMessage', error.response.data.result.message)
        } else if (error.response.status === 401 && error.response.data.result.message === 'Email Or Password Wrong') {
          setex.commit('setMessage', error.response.data.result.message)
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
      })
    }
  },
  getters: {
    getisActiveCart (state) {
      return state.isActiveCart
    },
    getisActiveCartNavbar (state) {
      return state.isActiveCartNavbar
    },
    gettotalCart (state) {
      return state.totalCart
    },
    getCount (state) {
      return state.count * 2
    },
    getTodos (state) {
      return state.todos
    },
    isLogin (state) {
      return state.token !== null
    },
    Products (state) {
      return state.products
    },
    getMessage (state) {
      return state.message
    },
    getSearch (state) {
      return state.search
    },
    gettmpSearch (state) {
      return state.tmpSearch
    },
    getProductsAll (state) {
      return state.products
    },
    getTotalProducts (state) {
      return state.totalProducts
    },
    getlastpage (state) {
      return state.lastPage
    },
    getActiv (state) {
      return state.activ
    },
    getActivAddUpdate (state) {
      return state.activeAddUpdate
    },
    getActiveHumMenu (state) {
      return state.activeHumMenu
    },
    getActivBtnCancel (state) {
      return state.ActivBtnCancel
    },
    getActivBtnOK (state) {
      return state.ActivBtnOk
    },
    getPage (state) {
      return state.page
    },
    getLimit (state) {
      return state.limit
    },
    getUser (state) {
      return state.user.email
    }
  }
})
