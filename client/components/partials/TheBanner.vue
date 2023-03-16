<template>
  <div class="dark-layer relative w-full h-[600px] text-white">
    <img class="w-full h-full object-cover" src="~/assets/image/banner-background.jpg" alt="">
    <div class="container absolute left-0 right-0 bottom-[100px]">
      <h2>Find Job</h2>
      <h3 class="text-white/70">We provide you with best jobs faster and easier</h3>
      <div class="w-full relative inline-block mt-[20px]">

        <div class="flex mt-[70px] w-full rounded-[3px] bg-white ">
          <!-- Search Field -->
          <div class="input-container title">
            <label class="label-custom" for="intro-keywords">What job are you looking
              for?</label>
            <input v-model="title" class="text-black font-normal leading-[27px] text-[15.5px] p-[5px]" id="intro-keywords"
              name="search_keywords" type="text" placeholder="Job title">
          </div>

          <!-- Search Field -->
          <div class="input-container">
            <label class="label-custom" for="intro-keywords">Where?</label>
            <select v-model="address" class="w-full h-full text-black font-normal leading-[27px] text-[15.5px] p-[5px]"
              id="intro-keywords" name="search_keywords" type="text" placeholder="Junior">
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Hải Phòng">Hải Phòng</option>
            </select>
          </div>

          <!-- Search Field -->
          <div class="input-container !border-none">
            <label class="label-custom" for="intro-keywords">Your level?</label>
            <select v-model="level" class="w-full h-full text-black font-normal leading-[27px] text-[15.5px] p-[5px]"
              id="intro-keywords" name="search_keywords" type="text" placeholder="Junior">
              <option value="1">Intern</option>
              <option value="2">Fresher</option>
              <option value="3">Junior</option>
              <option value="4">Middle</option>
              <option value="5">Senior</option>
            </select>
          </div>

          <!-- Search Field -->
          <div class="flex grow-0 m-[8px] items-center !max-w-[100px]">
            <button class="px-[25px] py-[10px] bg-green-main rounded-[4px]" @click="searchHandle">Search</button>
          </div>
        </div>
      </div>

      <p class="mt-[20px] text-white/70">Need more search options? <nuxt-link to="/jobs/search"><u
            class="text-green-main">Advanced Search</u></nuxt-link></p>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      address: '',
      level: '',
    }
  },
  methods: {
    searchHandle() {
      this.$router.push({
        name: 'jobs-search-params',
        params: { searchData: { titleSearch: this.title, provinceSelected: this.address, levelId: this.level } }
      })
    }
  }
}
</script>

<style scoped>
.input-container {
  position: relative;
  display: flex;
  flex-grow: 1;
  border-right: 1px solid #e4e4e4;
  padding: 10px 12px;
  align-items: center;
}

.input-container.title {
  flex-grow: 3;
}
</style>