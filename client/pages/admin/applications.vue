<template>
  <div class="w-full min-h-[100vh] bg-light-gray p-[25px] bg-[#F6F7F9]">
    <div class="w-full h-full bg-white">
      <div class="flex items-center p-[15px] border-b-solid border-b-[1px]">
        <span class="mr-[6px]"><font-awesome-icon icon="fa-solid fa-gear" /></span>
        <h4 class="font-medium">Applications</h4>
      </div>

      <div class="my-[30px] px-[30px]">
        <div v-for="application in applications" :key="application.id"
          class="candidate border-[1px] border-solid border-[#e9f0f3] rounded-[4px] p-[20px] mb-[15px]">
          <v-row>
            <v-col lg="1">
              <img class="rounded-full mt-[3px]" :src="application.candidate.avatar_url" alt="">
            </v-col>
            <v-col lg="3">
              <p class="font-semibold !m-0">{{ application.candidate.fullname }}</p>
              <p class="!m-0 text-[13px] !-mt-[5px]">{{ application.candidate.address }}</p>
              <v-chip v-for="i in 3" :key="i" class="mr-2" color="green" outlined small label>
                Success
              </v-chip>
            </v-col>
            <v-col lg="3">
              <p class="!m-0 text-[14px]"><v-icon class="mr-[5px] !text-[18px]">mdi-email-arrow-right</v-icon>{{
                application.candidate.email }}</p>
              <p class="!m-0 text-[14px]"><v-icon class="mr-[5px] !text-[18px]">mdi-phone-in-talk</v-icon>{{
                application.candidate.phone_number }}
              </p>
              <p class="!m-0 text-[14px]"><v-icon class="mr-[5px] !text-[19px]">mdi-facebook</v-icon>{{
                application.candidate.cv_url }}</p>
            </v-col>
            <v-col lg="3">
              <p class="font-medium text-[14px] !m-0">{{ application.job.title }}</p>
            </v-col>
            <v-col lg="2" class="text-center">
              <div class="flex gap-[10px] justify-center">
                <v-btn color="primary" fab x-small>
                  <NuxtLink class="!text-white" :to="`/resume/${application.candidate.id}`" target="_blank">
                    <v-icon class="!text-white">mdi-file-document-arrow-right</v-icon>
                  </NuxtLink>
                </v-btn>
                <v-btn color="success" fab x-small @click="acceptApplication(application)">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn color="error" fab x-small @click="rejectApplication(application)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CajAPI from '~/apis/candidates_apply_jobs'
export default {
  layout: 'admin-layout',
  meta: {
    auth: { authority: 1 }
  },
  data: function () {
    return {
      applications: [],
    }
  },
  async fetch() {
    this.applications = await CajAPI.getAllCajs(1)
  },
  methods: {
    async acceptApplication(application) {
      await CajAPI.moveCandidateToStep(application.candidate_id, application.job_id)
      this.applications = this.applications.filter(applicationItem => applicationItem != application)
      this.$toast.success('Accept successfully')
    },
    async rejectApplication(application) {
      await CajAPI.rejectCandidateApplyJob(application.candidate_id, application.job_id)
      this.applications = this.applications.filter(applicationItem => applicationItem != application)
      this.$toast.success('Reject successfully')
    }
  }
}
</script>

<style lang="scss" scoped>
.candidate {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>