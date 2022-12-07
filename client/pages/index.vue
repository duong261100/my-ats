<template>
  <div class="content">
    <buy-section />
    <service-section />
    <gift-card-section />
    <service-section />
  </div>
</template>

<script lang="ts">

export default ({
  layout: 'home-layout',
  name: 'IndexPage',
  meta: {
    auth: { authority: 0 }
  }
})
</script>
