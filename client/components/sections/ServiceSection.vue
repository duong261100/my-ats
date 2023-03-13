<template>
  <div class="container py-[50px]">
    <div class="grid grid-cols-12 gap-[30px]">
      <div class="col-span-7">
        <h3 class="mb-[30px]">Recent Jobs</h3>
        <ul class="border-[1px] border-solid border-[#ddd] rounded-[4px]">
          <li v-for="job in recentJobs" :key="job.id" class="job">
            <nuxt-link :to="`/jobs/${job.id}`">
              <div class="flex flex-row">
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
                      {{ stringifySkills(job.skills) }}
                    </span>
                    <span>
                      <font-awesome-icon icon="fa-solid fa-angles-up" />
                      {{ job.level.name }}
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
                  <button class="tag-custom">Full Time</button>
                </div>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="col-span-5">
        <h3 class="mb-[30px]">Detail Jobs</h3>
        <div class="border-[1px] border-solid border-[#ddd] px-[50px] py-[35px] rounded-[4px]">
          <h4 class="text-black mb-[5px] text-[22px]">Senior Health and Nutrition Advisor</h4>
          <div class="mb-[20px] space-x-[5px]">
            <button class="tag-custom">Full Time</button>
            <button class="tag-custom">Full Time</button>
            <button class="tag-custom">Full Time</button>
          </div>
          <div class="row [&>span]:leading-[27px] mb-[20px]">
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
          <div class="mb-[20px]">
            <span>
              Tham gia phát triển các ứng dụng, nâng cấp và triển khai các sản phẩm phần mềm theo xu hướng công nghệ
              trên
              nền tảng PHP.
              <br />
              Tìm hiểu yêu cầu, phân tích, thiết kế, nghiên cứu công nghệ công nghệ mới và review source code, đưa ra
              giải pháp áp dụng vào sản phẩm dịch vụ của công ty.
            </span>
          </div>
          <div>
            <button class="w-full bg-[#26AE61] px-[20px] py-[10px] rounded-[4px] text-white">View Details This Job</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jobAPI from '../../apis/jobs'
export default {
  data() {
    return {
      recentJobs: []
    }
  },
  async fetch() {
    this.recentJobs = await jobAPI.getAllJobs()
    this.recentJobs = this.recentJobs.slice(0, 4)
  },
  fetchOnServer: false,
  methods: {
    stringifySkills(skills) {
      return skills.map(skill => skill.name).join(", ")
    },
    showSalary(job) {
      return `${job.salary_from}đ  -  ${job.salary_to}đ`
    },
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