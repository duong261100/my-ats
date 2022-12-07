<template>
  <div class="
      w-full
      px-[15px]
      space-y-[30px]
      text-black
      [&>div>h3]:underline-static [&>div>h3]:pb-[15px] [&>div>h3]:mb-[20px]
    ">

    <!-- Widget Search -->
    <div>
      <h3>Search</h3>
      <div class="
          relative
          flex
          items-center
          w-full
          text-[#989898]
          leading-[26px]
        ">
        <input type="text" class="
            w-full h-[44px]
            border-solid border-[1px] border-grey-soft
            pl-[10px] pr-[40px] py-[2px]
          " placeholder="Enter Keyword" />
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="absolute right-[15px]" />
      </div>
    </div>

    <!-- Widget Categories-->
    <div class="widget-categories">
      <h3>Categories</h3>
      <ul class="footer-ul">
        <nuxt-link v-for="(category, index) in categories" :key="index" to="/"
          class="transition-product-card block not-last:border-b-[1px] border-solid !border-grey-soft">
          <li>
            {{ category }}
          </li>
        </nuxt-link>
      </ul>
    </div>
  </div>
</template>

<script>
// import categoryAPI from '../../apis/categories'
export default {
  data() {
    return {
      categories: ["Backend", "C#", "Frontend", "Golang", "Java", "NodeJS", "NoSQL", "Nuxt", "Python", "SQL", "Vue"],
    }
  },
  async fetch() {
    // this.categories = await categoryAPI.getAllCategories()
  },
}
</script>