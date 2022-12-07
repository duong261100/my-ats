<template>
  <div class="container grid grid-cols-4">
    <the-side-bar />

    <!-- Loading -->
    <div v-if="$fetchState.pending" class="col-span-3 px-[20px]">
      <v-loading />
    </div>

    <!-- Book Details -->
    <div v-else class="col-span-3 px-[20px]">
      <div class="mb-[30px]">
        <div
          class="p-[30px] border-[1px] border-solid border-[#ddd] rounded-[4px] [&>h4]:font-medium [&>h4]:mt-[15px] [&>h4]:mb-[10px]">
          <h3 class="font-medium">Front End Developer</h3>
          <div>
            <font-awesome-icon icon="fa-solid fa-map-location-dot" />
            117 Phạm Hùng, Nam Từ Liêm, Hà Nội
          </div>
          <div class="mt-[10px] mb-[20px]">
            <button class="tag-custom mr-[10px]" v-for="i in 3">
              Fresher Accepted
            </button>
          </div>
          <h4>Skills</h4>
          <div class="mb-[20px]">
            <button class="tagButton" v-for="i in 5">
              Html5
            </button>
          </div>
          <h4>Requirements</h4>
          <div class="grid grid-cols-10">
            <div class="col-span-2">
              <p>Availability</p>
              <p>Education</p>
              <p>Age</p>
              <p>Experience</p>
              <p>Language</p>
            </div>
            <div class="col-span-8">
              <p>Availability</p>
              <p>Education</p>
              <p>Age</p>
              <p>Experience</p>
              <p>Language</p>
            </div>
          </div>
          <h4>Job Description</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor nisi vitae cupiditate quaerat asperiores
            magnam nemo totam distinctio neque repellendus ab, sapiente deserunt ducimus ut beatae eius reprehenderit
            in numquam?</p>
          <h4>Your Skills and Experience</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor nisi vitae cupiditate quaerat asperiores
            magnam nemo totam distinctio neque repellendus ab, sapiente deserunt ducimus ut beatae eius reprehenderit
            in numquam?</p>
          <h4>Benefits</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor nisi vitae cupiditate quaerat asperiores
            magnam nemo totam distinctio neque repellendus ab, sapiente deserunt ducimus ut beatae eius reprehenderit
            in numquam?</p>
          <div class="max-w-[300px] mt-[20px]">
            <button class="w-full bg-[#26AE61] px-[20px] py-[10px] rounded-[4px] text-white">Apply For This Job</button>
          </div>
        </div>
        <div class="col-span-4 px-[30px] space-y-[10px]">

        </div>
      </div>

      <the-review-tabs :book="book" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  meta: {
    auth: { authority: 0 }
  },
  data() {
    return {
      book: {
        type: Object,
        required: true,
      },
      relatedBooks: {
        type: Object,
        required: true,
      },
    }
  },
  async fetch() {
    const id = this.$route.params.id

    this.book = await bookAPI.getBookWithRatingById(id)
    const books = await bookAPI.getAllBooks()

    this.relatedBooks = await books.slice(0, 3)
  },
  computed: {
    categories() {
      const categories = this.book.categories.map((el) => el.name)
      return categories.slice().join(', ')
    },
    price() {
      return this.$formatPrice(this.book.price)
    },
  },
  methods: {
    addItemToCart(book) {
      this.$store.dispatch('cart/addItemToCart', book)
      this.$toast.success("Add to cart succcessfully!");
    }
  },
}
</script>

<style scoped>
.tagButton {
  border: 1px solid #ddd;
  border-radius: 999px;
  padding: 5px 15px;
  margin-right: 10px;
}
</style>