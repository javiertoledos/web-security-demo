<template>
  <div class="window-opener">
    <h3 class="title">New tab links</h3>
    <div class="field has-addons">
      <div class="control">
        <a class="button" href="https://bad-site.web.app/" target="blank">
          New tab
        </a>
      </div>
      <div class="control">
        <a class="button" href="https://bad-site.web.app/" rel="noopener" target="blank">
          Noopener
        </a>
      </div>
      <div class="control">
        <a  class="button" href="https://bad-site.web.app/" rel="noreferrer" target="blank">
          Noreferrer
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>

<style scoped>
.has-addons {
  justify-content: center;
}
</style>