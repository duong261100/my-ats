<template>
  <div class="
        dark-layer
        relative
        flex flex-col
        justify-center items-center
        w-full
        text-white text-center
      ">
    <img class="w-full h-[300px] object-cover bg-no-repeat bg-top" src="../../assets/image/static-banner.jpg"
      alt="~/assets/image/book-2.png" />

    <!-- Bread Scrumb -->
    <div class="absolute !top-[55%]">
      <h2>Jobs Finder</h2>
      <p class="text-[16px] tracking-[2px]">We provide you with best jobs faster and easier</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: {
        titleSearch: "",
      }
    }
  }
}
</script>

<style></style>