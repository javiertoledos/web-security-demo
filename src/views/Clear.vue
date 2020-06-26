<template>
  <div>
    <p v-if="cleared">
      Cleared all messages!
    </p>
    <p v-else>
      Clearing all your messages
    </p>
  </div>
</template>

<script>
import { db } from '../firebase'

export default {
  data() {
    return {
      cleared: false
    }
  },
  async mounted() {
    const batch = db.batch()
    const snapshot = await db.collection('messages').where('uid','==', this.$store.state.currentUser.uid).get()

    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    })
    await batch.commit()
    this.cleared = true
  }
}
</script>