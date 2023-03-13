<template>
  <div class="container py-[50px]">
    <div class="grid grid-cols-12 gap-[30px]">
      <div class="col-span-7">
        <h3 class="mb-[30px]">Recent Jobs</h3>
        <p v-if="listCajs.length == 0" class="mb-[30px]">You haven't apply any job yet</p>
        <ul class="border-[1px] border-solid border-[#ddd] rounded-[4px]">
          <li v-for="caj in listCajs" class="job">
            <a class="flex flex-row" href="">
              <div class="min-w-[60px] max-w-[60px] mt-[10px]">
                <img
                  src="https://workscout.in/wp-content/uploads/job-manager-uploads/company_logo/2021/11/company-logo-06-150x150.png"
                  alt="">
              </div>
              <div class="flex-1 pl-[25px] pr-[50px]">
                <h5>{{ caj.job.title }}</h5>
                <div class="row">
                  <span>
                    <font-awesome-icon icon="fa-solid fa-tag" />
                    {{ stringifySkills(caj.job) }}
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-angles-up" />
                    {{ caj.job.level.description }}
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-map-location" />
                    {{ caj.job.address }}
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
                    {{ showSalary(caj.job) }}
                  </span>
                </div>
              </div>
              <div class="m-auto">
                <button class="tag-custom !border-green-main !text-green-main">{{ caj.step.name }}</button>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="listCajs.length > 0" class="col-span-5">
        <h3 class="mb-[30px]">Detail Jobs</h3>
        <div class="border-[1px] border-solid border-[#ddd] px-[50px] py-[35px] rounded-[4px]">
          <h4 class="text-black mb-[10px] text-[22px]">{{ listCajs[0]?.job?.title }}</h4>
          <div class="mb-[20px] space-x-[5px]">
            <button class="tag-custom">Full Time</button>
            <button class="tag-custom">Full Time</button>
            <button class="tag-custom">Full Time</button>
          </div>
          <div class="row [&>span]:leading-[27px] mb-[30px]">
            <span>
              <font-awesome-icon icon="fa-solid fa-tag" />
              {{ stringifySkills(listCajs[0]?.job) }}
            </span>
            <span>
              <font-awesome-icon icon="fa-solid fa-angles-up" />
              {{ listCajs[0]?.job?.level?.description }}
            </span>
            <span>
              <font-awesome-icon icon="fa-solid fa-map-location" />
              {{ listCajs[0]?.job?.address }}
            </span>
            <span>
              <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
              {{ showSalary(listCajs[0]?.job) }}
            </span>
          </div>
          <div class="mt-[15px] mb-[20px]">
            <span>
              Tham gia phát triển các ứng dụng, nâng cấp và triển khai các sản phẩm phần mềm theo xu hướng công nghệ
              trên
              nền tảng PHP.
              <br />
              Tìm hiểu yêu cầu, phân tích, thiết kế, nghiên cứu công nghệ công nghệ mới và review source code, đưa ra
              giải pháp áp dụng vào sản phẩm dịch vụ của công ty.
            </span>
          </div>
          <div class="text-center">
            <button :disabled="!canCancelApply()" @click="deleteCaj()"
              class="m-auto w-1/2 bg-red-main px-[20px] py-[10px] rounded-[4px] text-white">Cancel Apply</button>
            <p v-if="!canCancelApply()" class="text-red-600 mt-[10px]">You can't cancel apply while interviewing</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cajAPI from '~/apis/candidates_apply_jobs.js'
export default {
  layout: 'home-layout',
  name: 'IndexPage',
  meta: {
    auth: { authority: 1 }
  },
  data() {
    return {
      listCajs: [],
      cajSelected: {}
    }
  },
  async fetch() {
    this.listCajs = await cajAPI.getCandidatesApplyJobByCandidateId(this.$auth.user.id)
  },
  methods: {
    showSalary(job) {
      return `${job?.salary_from}đ  -  ${job?.salary_to}đ`
    },
    stringifySkills(job) {
      if (!job) return ''
      return job.skills.map(skill => skill.name).join(", ")
    },
    canCancelApply() {
      return this.listCajs[0]?.step_id == 1
    },
    async deleteCaj() {
      if (confirm(`Are you sure you want to delete`)) {
        await cajAPI.rejectCandidateApplyJob(this.$auth.user.id, this.listCajs[0].job_id)
        this.listCajs = []
        this.$toast.success('Cancel apply successfully!')
      }
    }
  },
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