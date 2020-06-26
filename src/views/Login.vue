<template>
  <div class="login">
    <div class="columns is-centered">
      <form class="column is-half-desktop" @submit.prevent="login">
        <h1 class="title is-1">Login</h1>
        <div class="field">
          <label class="label" for="email">Email</label>
          <div class="control">
            <input v-model.trim="email" class="input" type="email" required placeholder="email@example.com" id="email" />
          </div>
        </div>
        <div class="field">
          <label class="label" for="password">Password</label>
          <div class="control">
            <input v-model.trim="password" class="input" type="password" required placeholder="****" id="password" />
          </div>
        </div>
        <div class="control">
          <button class="button is-link" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth } from '../firebase'

export default {
  name: 'Home',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
        const response = await auth.signInWithEmailAndPassword(this.email, this.password);
        this.$store.commit('setCurrentUser', response.user)
        console.log(this.$router.currentRoute)
        this.$router.push(this.$router.currentRoute.query.from || '/')
      } catch (err) {
        this.$store.commit('setFlashMessage', {
          type: 'error',
          message: `Couldn't authenticate: ${err}`
        })
      }
    },
  },
  components: {
  //  HelloWorld
  }
}
</script>
