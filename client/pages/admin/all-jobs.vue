<template>
  <div class="w-full min-h-[100vh] bg-light-gray p-[25px] bg-[#F6F7F9]">
    <div class="w-full h-full bg-white">
      <div class="flex items-center p-[15px] border-b-solid border-b-[1px]">
        <span class="mr-[6px]"><font-awesome-icon icon="fa-solid fa-gear" /></span>
        <h4 class="font-medium">All Jobs</h4>
      </div>
      <div class="my-[30px] px-[30px]">
        <v-card>
          <v-card-title>
            <div class="mt-[15px]">
              List of Jobs
            </div>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
              hide-details></v-text-field>
          </v-card-title>
          <div class="flex justify-start pl-[16px]">
            <v-switch v-model="targetSwitch" label="Show only uncompleted target" @click="filterJobs"></v-switch>
          </div>
          <v-data-table :headers="headers" :items="showedJobs" :search="search">
          </v-data-table>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import JobAPI from "~/apis/jobs"
export default {
  layout: 'admin-layout',
  meta: {
    auth: { authority: 1 }
  },
  data: function () {
    return {
      targetSwitch: false,
      search: '',
      headers: [
        { text: 'Title', value: 'title', width: '200px' },
        { text: 'Level', value: 'level.name' },
        { text: 'Number Hiring', value: 'number_hiring', align: 'center' },
        { text: 'Date To', value: 'date_to' },
        { text: 'Applied', value: 'applied' },
        { text: 'Interviewing', value: 'interviewing' },
        { text: 'Offering', value: 'offering' },
        { text: 'Hired', value: 'hired' },
        { text: 'Rejected', value: 'rejected' },
        { text: 'Total', value: 'total' },
      ],
      jobs: [],
      showedJobs: [],
    }
  },
  async fetch() {
    this.jobs = await JobAPI.getAllJobs()
    this.jobs = this.jobs.reverse()
    this.showedJobs = this.jobs
  },
  methods: {
    filterJobs() {
      this.showedJobs = this.targetSwitch ? this.jobs.filter(job => job.number_hiring > job.hired) : this.jobs
    }
  }
}
</script>

<style></style>