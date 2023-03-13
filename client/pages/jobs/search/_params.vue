<template>
  <div class="container grid grid-cols-7 gap-[30px]">
    <the-filter-bar class="col-span-2" @search="search" />

    <!-- Content -->
    <list-search-result class="col-span-5" :jobs="jobs" />
  </div>
</template>

<script>
import jobAPI from '../../../apis/jobs'
export default {
  meta: {
    auth: { authority: 0 }
  },
  data() {
    return {
      jobs: [],
      categories: [],
      searchData: {},
    }
  },
  async fetch() {
    // this.categories = await categoryAPI.getAllCategories()
    const params = this.$route.params.searchData || {}
    this.searchData = {
      titleSearch: params?.titleSearch || "",
      province: params?.provinceSelected || "",
      levelId: params?.levelId || "",
    }
    this.jobs = await jobAPI.searchJobs(this.searchData)
  },
  methods: {
    async search(searchData) {
      const res = await jobAPI.searchJobs(searchData)
      this.jobs = res
    },
  },
}
</script>

<style></style>