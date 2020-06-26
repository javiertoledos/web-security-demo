<template>
  <div class="flash-message">
    <div class="message" :class="flashMessage.type" v-if="flashMessage.message">
      {{ flashMessage.message }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['flashMessage'])
  }
}
</script>