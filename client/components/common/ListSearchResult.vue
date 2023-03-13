<template>
  <div class="">
    <!-- Sort Filter -->
    <div class="
              w-full
              p-[15px]
              border-b-[1px] border-grey-light border-solid
            ">
      <span>Arrange by:</span>
      <select v-model="sortMethodSelected" @change="sortjobs()" class="
                h-[30px]
                px-[10px]
                border-solid border-[1px] border-grey-light
                rounded-[3px]
                ml-[20px]
                text-[14px]
              ">
        <option value="1">Newest</option>
        <option value="2">Level</option>
        <option value="3">Alphabet</option>
      </select>
    </div>

    <!-- List jobs -->
    <div class="p-[15px]">
      <ul class="border-[1px] border-solid border-[#ddd] rounded-[4px]">
        <li v-for="job in showedJobs" :key="job.id" class="job">
          <nuxt-link class="flex flex-row" :to="`/jobs/${job.id}`">
            <div class="min-w-[60px] max-w-[60px] mt-[10px]">
              <img
                src="https://workscout.in/wp-content/uploads/job-manager-uploads/company_logo/2021/11/company-logo-06-150x150.png"
                alt="">
            </div>
            <div class="flex-1 pl-[25px] pr-[50px]">
              <h5>{{ job.title }}</h5>
              <div class="row">
                <span>
                  <font-awesome-icon icon="fa-solid fa-tag" />
                  {{ stringifySkills(job) }}
                </span>
                <span>
                  <font-awesome-icon icon="fa-solid fa-angles-up" />
                  {{ job.level.description }}
                </span>
                <span>
                  <font-awesome-icon icon="fa-solid fa-map-location" />
                  {{ job.address }}
                </span>
                <span>
                  <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
                  {{ showSalary(job) }}
                </span>
              </div>
            </div>
            <div class="m-auto">
              <button class="tag">Full Time</button>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>

    <base-paginator class="my-[30px] mr-[30px]" :total-pages="totalPages" :total="totaljobs" :per-page="perPage"
      :current-page="currentPage" :has-more-pages="hasMorePages" @pagechanged="showMore" />
  </div>
</template>

<script>
export default {
  props: {
    jobs: [],
  },
  data() {
    return {
      jobsCustom: [],
      sortMethodSelected: 1,
      page: 1,
      perPage: 8,
      currentPage: 1,
    }
  },
  async fetch() {
    this.jobsCustom = this.jobs
  },
  watch: {
    jobs: {
      immediate: true,
      handler(val) {
        this.jobsCustom = val
      }
    }
  },
  computed: {
    totaljobs() {
      return this.jobsCustom.length
    },
    totalPages() {
      return Math.ceil(this.jobsCustom.length / this.perPage)
    },
    showedJobs() {
      const start = (this.currentPage - 1) * this.perPage
      return this.jobsCustom.slice(start, start + this.perPage)
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
    sortjobs() {
      if (this.sortMethodSelected == 2) {
        this.jobsCustom.sort((a, b) => (a.level_id > b.level_id) ? 1 : -1);
      } else if (this.sortMethodSelected == 3) {
        this.jobsCustom.sort((a, b) => (a.title > b.title) ? 1 : -1);
      } else {
        this.jobsCustom.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
      }
    },
    showSalary(job) {
      return `${job.salary_from}đ  -  ${job.salary_to}đ`
    },
    stringifySkills(job) {
      return job.skills.map(skill => skill.name).join(", ")
    }
  }
}
</script>

<style scoped>
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