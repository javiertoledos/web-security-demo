import Vue from 'vue'
import Vuex from 'vuex'
import { db, auth } from '../firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: {
      email: localStorage.getItem("currentUser.email"),
      uid: localStorage.getItem("currentUser.uid"),
    },
    flashMessage: {
      type: "",
      message: "",
    },
    newMessage: localStorage.getItem('newMessage'),
    messages: []
  },
  getters: {
    isAuthenticated(state) {
      return !!state.currentUser.uid
    }
  },
  mutations: {
    setFlashMessage(state, { type, message }) {
      state.flashMessage.type = type
      state.flashMessage.message = message
    },
    clearFlashMessage(state) {
      state.flashMessage.type= ''
      state.flashMessage.message = ''
    },
    setCurrentUser(state, { email, uid }) {
      state.currentUser.email = email
      state.currentUser.uid = uid
      localStorage.setItem("currentUser.email", email)
      localStorage.setItem("currentUser.uid", uid)
    },
    clearCurrentUser(state) {
      localStorage.removeItem("currentUser.email")
      localStorage.removeItem("currentUser.uid")
      state.currentUser.email = null
      state.currentUser.uid = null 
    },
    setNewMessage(state, message) {
      state.newMessage = message
      localStorage.setItem('newMessage', message)
    },
    setMessages(state, messages) {
      state.messages = messages
    }
  },
  actions: {
    async addMessage({state, commit}) {
      const document = {
        uid: state.currentUser.uid,
        email: state.currentUser.email,
        message: state.newMessage, 
        timestamp: Date.now()
      }

      try {
        await db.collection('messages').add(document)
      } catch (err) {
        commit('setFlashMessage', {
          type: 'error',
          message: `Couldn't add new message. ${err}`
        })
        return
      }

      commit('setNewMessage', '')
      commit('setFlashMessage', {
        type: 'success',
        message: 'Message created successfully'
      })
    },
    async logout({commit}) {
      try {
        await auth.signOut()
      } catch(err) {
        console.log(err)
      }
      commit('clearCurrentUser')
    },
  },  
  modules: {
  }
})

db.collection('messages').orderBy('timestamp', 'desc').limit(10)
  .onSnapshot((querySnapshot) => {
    const messages = []
    querySnapshot.forEach(doc => {
      const message = doc.data()
      message.id = doc.id
      messages.push(message)
    })
    store.commit('setMessages', messages)
  })

export default store
