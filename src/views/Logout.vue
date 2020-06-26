<template>
  <div>
    Logging out...
  </div>
</template>
<script>
export default {
  async mounted() {
    try {
      await this.$store.dispatch('logout')
      this.$router.push('/')
    } catch (err) {
      console.log(err)
    }
  }
}
</script>