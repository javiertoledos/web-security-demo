<template>
  <div class="user-entries">
    <h3 class="title">Entries</h3>
    <form v-if="isAuthenticated" @submit.prevent="addMessage" @reset.prevent="clearMessage">
      <div class="field">
        <label class="label" for="message">Message</label>
        <div class="control">
          <textarea v-model="newMessage" required id="message" class="textarea" placeholder="write sometning" />
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button type="reset" class="button is-link is-light">Clear</button>
          <router-link class="button" to="/clear">Delete my messages</router-link>
        </div>
      </div>
    </form>
    <p v-else>
      <router-link to="/login">Log in</router-link> to post a new comment.
    </p>
    <div class="messages mt-3">
      <div v-for="message in messages" class="message mt-1 box" :key="message.timestamp">
        <span class="author">{{ message.email }}</span>
        <div class="content" v-html="message.message" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
    messages() {
      return this.$store.state.messages
    },
    newMessage: {
      get() {
        return this.$store.state.newMessage
      },
      set(message) {
        this.$store.commit('setNewMessage', message)
      }
    }
  },
  methods: {
    addMessage() {
      this.$store.dispatch('addMessage')
    },
    clearMessage(){
      this.message = ''
    }
  }
}
</script>