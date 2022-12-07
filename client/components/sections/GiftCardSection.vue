<template>
  <div class="ads-section py-[70px] w-full text-white">
    <div class="container relative flex flex-col pt-[30px] pb-[50px]">
      <h2 class="mb-[20px] w-1/2">Explore a faster, easier, and better job search</h2>
      <div v-for="content in contents">
        <div class="float-left w-[40%]">
          <div class="flex items-center px-[30px] py-[10px] w-full">
            <font-awesome-icon class="mr-[20px] text-green-main" icon="fa-solid fa-check" />
            <h5 class="text-gray-main">
              {{ content }}
            </h5>
          </div>
        </div>
      </div>
      <img class="absolute right-[-200px] bottom-0 mr-[200px] rounded-[7px] w-[500px] h-[400px] object-cover"
        src="~/assets/image/ads-image.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contents: [
        "Unmatched quality of remote, hybrid, and flexible jobs",
        "Premium skills tests, remote courses, career coaching, and more",
        "Unmatched quality of remote, hybrid, and flexible jobs"
      ],
    }
  },
}
</script>
<style scoped>
.ads-section {
  background-image: url('~/assets/image/ads-banner.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>