<template>
  <div class="dark-layer relative w-full h-[600px] text-white">
    <img class="w-full h-full object-cover" src="~/assets/image/banner-background.jpg" alt="">
    <div class="container absolute left-0 right-0 bottom-[100px]">
      <h2>Find Job</h2>
      <h3 class="text-white/70">We help you to get your best job fatser and easier</h3>
      <div class="w-full relative inline-block mt-[20px]">

        <div class="flex mt-[70px] w-full rounded-[3px] bg-white ">
          <!-- Search Field -->
          <div class="input-container">
            <label for="intro-keywords">What job are you looking
              for?</label>
            <input class="text-black font-normal leading-[27px] text-[15.5px] p-[5px]" id="intro-keywords"
              name="search_keywords" type="text" placeholder="Job title">
          </div>

          <!-- Search Field -->
          <div class="input-container">
            <label for="intro-keywords">Where?</label>
            <input class="text-black font-normal leading-[27px] text-[15.5px] p-[5px]" id="intro-keywords"
              name="search_keywords" type="text" placeholder="Hanoi">
          </div>

          <!-- Search Field -->
          <div class="input-container !border-none">
            <label for="intro-keywords">Where?</label>
            <input class="text-black font-normal leading-[27px] text-[15.5px] p-[5px]" id="intro-keywords"
              name="search_keywords" type="text" placeholder="Hanoi">
          </div>

          <!-- Search Field -->
          <div class="flex grow-0 m-[8px] items-center">
            <button class="px-[25px] py-[10px] bg-green-main rounded-[4px]">Search</button>
          </div>
        </div>
      </div>
      <p class="mt-[20px] text-white/70">Need more search options? <u class="text-green-main">Advanced Search</u></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: {
        type: String,
        default: '',
      }
    }
  },
}
</script>

<style scoped>
label {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 3px;
  padding: 5px 10px;
  font-size: 13px;
  font-weight: 500;
  line-height: 22px;
  transform: translateY(calc(-100% - 15px));
}

.input-container {
  position: relative;
  display: flex;
  flex: 1;
  border-right: 1px solid #e4e4e4;
  padding: 10px 12px;
  align-items: center;
}
</style>