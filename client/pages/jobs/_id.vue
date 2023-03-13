<template>
  <div>
    <div class="container grid grid-cols-4">
      <the-side-bar />

      <!-- Loading -->
      <div v-if="$fetchState.pending" class="col-span-3 px-[20px]">
        <v-loading />
      </div>

      <!-- job Details -->
      <div v-else class="col-span-3 px-[20px]">
        <div class="mb-[30px]">
          <div
            class="p-[30px] border-[1px] border-solid border-[#ddd] rounded-[4px] [&>h4]:font-medium [&>h4]:mt-[15px] [&>h4]:mb-[10px]">
            <h3 class="font-medium">{{ job.title }}</h3>
            <div>
              <font-awesome-icon icon="fa-solid fa-map-location-dot" />
              {{ job.address }}
            </div>
            <div class="mb-[5px]">
              <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
              {{ showSalary(job) }}
            </div>
            <div class="mt-[10px] mb-[15px]">
              <button class="tag-custom mr-[10px]">
                Fresher Accepted
              </button>
              <button class="tag-custom mr-[10px]">
                Full Time
              </button>
              <button class="tag-custom mr-[10px]">
                Hot Job
              </button>
            </div>
            <h4>Skills</h4>
            <div class="mb-[20px]">
              <button class="tagButton">
                VueJS
              </button>
              <button class="tagButton">
                NodeJS
              </button>
              <button class="tagButton">
                ExpressJS
              </button>
              <button class="tagButton">
                SQL
              </button>
              <button class="tagButton">
                AWS
              </button>
            </div>
            <h4>Requirements</h4>
            <div>
              <p>{{ job.requirement }}</p>
            </div>
            <h4>Job Description</h4>
            <p>{{ job.description }}</p>
            <h4>Your Skills and Experience</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor nisi vitae cupiditate quaerat asperiores
              magnam nemo totam distinctio neque repellendus ab, sapiente deserunt ducimus ut beatae eius reprehenderit
              in numquam?</p>
            <h4>Benefits</h4>
            <p>{{ job.benefit }}</p>
            <div v-if="!isApplied" class="max-w-[300px] mt-[20px]">
              <button class="w-full bg-[#26AE61] px-[20px] py-[10px] rounded-[4px] text-white" @click="handleApply">Apply
                For This Job</button>
            </div>
            <div v-else class="max-w-[300px] mt-[20px]">
              <button class="w-full bg-[#ff4444] px-[20px] py-[10px] rounded-[4px] text-white">You have applied
                job</button>
            </div>
          </div>
          <div class="col-span-4 px-[30px] space-y-[10px]">

          </div>
        </div>
      </div>
    </div>
    <div class="modal absolute top-0 left-0" v-if="isShowModal">
      <apply-form :candidate="candidate" @closeModal="isShowModal = false" @applyJob="applyJob()" />
    </div>
  </div>
</template>

<script>
import jobAPI from '~/apis/jobs'
import axios from 'axios'
export default {
  layout: 'default',
  meta: {
    auth: { authority: 0 }
  },
  data() {
    return {
      isShowModal: false,
      job: {
        type: Object,
        required: true,
      },
      resume: {},
      candidate: {},
      isApplied: false,
    }
  },
  async fetch() {
    const id = this.$route.params.id
    const res1 = await jobAPI.getJobById(id)
    this.job = res1
    const res2 = await axios.get(`/resumes/${this.$auth.user?.id || -1}/load-content`)
    this.resume = res2.data
    if (this.$auth.user.id) {
      const res3 = await axios.get(`/candidates/${this.$auth.user.id}`)
      this.candidate = res3.data
      const res4 = await axios.get(`/candidates-apply-jobs/check/${this.$auth.user.id}`)
      this.isApplied = res4.data
    }
  },
  methods: {
    handleApply() {
      if (!this.$auth.user?.id) {
        this.$toast.error("You need to login first")
        return
      }
      if (!!this.resume?.page?.length) {
        if (confirm("You haven't create your resume yet. Are you sure you want to create a new one?")) {
          this.$router.push(`/cv/${this.$auth.user?.id}/edit`)
        } else {
          return
        }
      } else
        this.isShowModal = true
    },
    showSalary(job) {
      return `${job.salary_from}đ  -  ${job.salary_to}đ`
    },
    async applyJob() {
      await axios.post("/candidates-apply-jobs", {
        candidate_id: this.$auth.user?.id,
        job_id: this.$route.params.id,
        point: 0,
      })

      this.isShowModal = false
      this.$toast.success('Apply successfully')
      this.isApplied = true
    }
  }
}
</script>

<style scoped>
.tagButton {
  border: 1px solid #11b719;
  background-color: #E7F8E8;
  color: #11b719;
  border-radius: 999px;
  padding: 3px 15px;
  margin-right: 10px;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>