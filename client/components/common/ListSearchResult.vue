<template>
  <div class="px-[20px]">
    <!-- Sort Filter -->
    <div class="
          w-full
          p-[15px]
          border-b-[1px] border-grey-light border-solid
        ">
      <span>Arrange by:</span>
      <select v-model="sortMethodSelected" @change="sortBooks()" class="
            h-[30px]
            px-[10px]
            border-solid border-[1px] border-grey-light
            rounded-[3px]
            ml-[20px]
            text-[14px]
          ">
        <option value="1">Newest</option>
        <option value="2">Highest rate</option>
        <option value="3">Alphabet</option>
      </select>
    </div>

    <!-- List Books -->
    <div class="p-[15px]">
      <ul class="border-[1px] border-solid border-[#ddd] rounded-[4px]">
        <li v-for="i in 5" class="job">
          <a class="flex flex-row" href="">
            <div class="min-w-[60px] max-w-[60px] mt-[10px]">
              <img
                src="https://workscout.in/wp-content/uploads/job-manager-uploads/company_logo/2021/11/company-logo-06-150x150.png"
                alt="">
            </div>
            <div class="flex-1 pl-[25px] pr-[50px]">
              <h5>Java Senior</h5>
              <div class="row">
                <span>
                  <font-awesome-icon icon="fa-solid fa-tag" />
                  Senior, Java, English
                </span>
                <span>
                  <font-awesome-icon icon="fa-solid fa-angles-up" />
                  3+ years exp
                </span>
                <span>
                  <font-awesome-icon icon="fa-solid fa-map-location" />
                  Nam Tu Liem, Ha Noi
                </span>
                <span>
                  <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
                  $30.000.000 - $35.000.000
                </span>
              </div>
            </div>
            <div class="m-auto">
              <button class="tag">Full Time</button>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <base-paginator class="my-[30px] mr-[30px]" :total-pages="totalPages" :total="totalBooks" :per-page="perPage"
      :current-page="currentPage" :has-more-pages="hasMorePages" @pagechanged="showMore" />
  </div>
</template>

<script>
export default {
  props: {
    books: [],
  },
  data() {
    return {
      booksCustom: [],
      sortMethodSelected: 1,
      page: 1,
      perPage: 12,
      currentPage: 1,
    }
  },
  async fetch() {
    this.booksCustom = this.books
  },
  watch: {
    books: {
      immediate: true,
      handler(val) {
        this.booksCustom = val
      }
    }
  },
  computed: {
    totalBooks() {
      return this.booksCustom.length
    },
    totalPages() {
      return Math.ceil(this.booksCustom.length / this.perPage)
    },
    showedBook() {
      const start = (this.currentPage - 1) * this.perPage
      return this.booksCustom.slice(start, start + this.perPage)
    },
    hasMorePages() {
      return this.currentPage === this.totalPages
    }
  },
  methods: {
    showMore(page) {
      this.page = page
      this.currentPage = page
    },
    sortBooks() {
      if (this.sortMethodSelected == 2) {
        this.booksCustom.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
      } else if (this.sortMethodSelected == 3) {
        this.booksCustom.sort((a, b) => (a.title > b.title) ? 1 : -1);
      } else {
        this.booksCustom.sort((a, b) => (a.publication_date > b.publication_date) ? 1 : -1);
      }
    }
  }
}
</script>

<style>
.job {
  padding: 25px 20px;
  border-left: 4px solid #186fc9;
  border-bottom: 1px solid #ddd;
}

.job:last-child {
  border-bottom: none;
}

span {
  color: #808080;
  font-size: 14px;
}

button.tag {
  padding: 4px 8px;
  color: #186fc9;
  border: 1px solid #186fc9;
  border-radius: 3px;
  font-size: 12px;
  background-color: rgba(24, 111, 201, 0.07);
}

h5 {
  color: #333;
  margin-bottom: 5px;
}

svg {
  color: #808080;
  margin-right: 7px;
}

.row span {
  display: inline-block;
  margin-right: 10px;
}
</style>