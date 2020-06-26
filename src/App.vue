<template>
  <div id="app">
    <nav class="navbar" id="nav">
      <router-link to="/">Home</router-link> |
      <template v-if="isAuthenticated">
        <router-link to="/logout">Logout</router-link>
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link>
      </template>
    </nav>
    <flash-message />
    <section class="section">
      <router-view class="container" />
    </section>
  </div>
</template>

<style lang="scss">
@import "bulma";

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import FlashMessage from './components/FlashMessage'
import { mapGetters } from 'vuex'
export default {
  components: {
    FlashMessage
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
}
</script>