<template>
  <div class="home">
    <div class="columns">
      <div class="column">
        <UserEntries />
      </div>
      <div class="column">
        <WindowOpener />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import WindowOpener from '@/components/WindowOpener.vue'
import UserEntries from '@/components/UserEntries.vue'

export default {
  name: 'Home',
  components: {
    WindowOpener,
    UserEntries
  }
}
</script>
