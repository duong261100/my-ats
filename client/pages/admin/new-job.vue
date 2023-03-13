<template>
  <div class="w-full min-h-[100vh] bg-light-gray p-[25px] bg-[#F6F7F9]">
    <div class="w-full h-full bg-white">
      <div class="flex items-center p-[15px] border-b-solid border-b-[1px]">
        <span class="mr-[6px]"><font-awesome-icon icon="fa-solid fa-gear" /></span>
        <h4 class="font-medium">Post New Job</h4>
      </div>

      <v-form class="pl-[25px] pr-[50px] pt-[15px] pb-[50px]">
        <p class="required">Job Title</p>
        <v-text-field v-model="newJobData.title" label="Title" outlined clearable
          :rules="[rules.required]"></v-text-field>

        <p>Job Description</p>
        <v-textarea v-model="newJobData.description" outlined name="input-7-4" label="Description"></v-textarea>

        <v-row>
          <v-col lg="8">
            <p class="required">Skills</p>
            <v-combobox v-model="skillsSelect" :items="skills" item-text="name" item-value="id" label="Select tags"
              multiple small-chips outlined :rules="[rules.required]"></v-combobox>
          </v-col>
          <v-col lg="4">
            <p class="required">Level</p>
            <v-select v-model="newJobData.level_id" :items="levels" item-text="name" item-value="id" label="Select level"
              outlined :rules="[rules.required]"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="4">
            <p class="required">Procedure</p>
            <v-select v-model="newJobData.procedure_id" :items="procedures" item-text="name" item-value="id"
              label="Select procedure" outlined :rules="[rules.required]"></v-select>
          </v-col>
          <v-col lg="4">
            <p class="required">Number hiring</p>
            <v-text-field v-model="newJobData.number_hiring" label="Number hiring" outlined clearable type="number"
              hide-details single-line :rules="[rules.required]"></v-text-field>
          </v-col>
          <v-col lg="4">
            <p class="required">Province</p>
            <v-text-field label="Province" outlined clearable :rules="[rules.required]" v-model="province"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="4">
            <p>Salary From</p>
            <v-text-field v-model="newJobData.salary_from" label="Salary From" outlined clearable type="number"
              hide-details single-line></v-text-field>
          </v-col>
          <v-col lg="4">
            <p>Salary To</p>
            <v-text-field v-model="newJobData.salary_to" label="Number hiring" outlined clearable type="number"
              hide-details single-line></v-text-field>
          </v-col>
          <v-col lg="4">
            <p class="required">Date To</p>
            <v-text-field v-model="newJobData.date_to" label="Date To" outlined clearable type="date" hide-details
              single-line :rules="[rules.required]"></v-text-field>
          </v-col>
        </v-row>
        <p class="required mt-[20px]" :rules="[rules.required]">Address</p>
        <v-textarea v-model="newJobData.address" outlined name="input-7-4" label="Address"
          :rules="[rules.required]"></v-textarea>
        <p class="required" :rules="[rules.required]">Requirement</p>
        <v-textarea v-model="newJobData.requirement" outlined name="input-7-4" label="Requirement"
          :rules="[rules.required]"></v-textarea>
        <p class="required" :rules="[rules.required]">Description</p>
        <v-textarea v-model="newJobData.description" outlined name="input-7-4" label="Description"
          :rules="[rules.required]"></v-textarea>
        <p class="required" :rules="[rules.required]">Benefit</p>
        <v-textarea v-model="newJobData.benefit" outlined name="input-7-4" label="Benefit"
          :rules="[rules.required]"></v-textarea>
        <v-row class="flex justify-end gap-[15px] !mt-[0px]">
          <v-btn color="error">
            Cancel
          </v-btn>
          <v-btn color="success" @click="createJob()">
            Submit
          </v-btn>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { rules } from "~/utils/validate"
import { defaultCompanyInfo } from "~/defaults/index"
import skillAPI from "~/apis/skills"
import levelAPI from "~/apis/levels"
import procedureAPI from "~/apis/procedures"
import axios from 'axios'
export default {
  layout: 'admin-layout',
  meta: {
    auth: { authority: 1 }
  },
  data() {
    return {
      skills: [],
      levels: [],
      procedures: [],
      skillsSelect: [],
      province: "Hà Nội",
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      rules: rules,
      newJobData: {
        title: '',
        level_id: null,
        number_hiring: null,
        address: defaultCompanyInfo.address,
        province: defaultCompanyInfo.province,
        salary_from: null,
        salary_to: null,
        procedure_id: null,
        date_to: null,
        requirement: '',
        description: '',
        benefit: '',
      }
    }
  },
  async fetch() {
    this.skills = await skillAPI.getAllSkills()
    this.levels = await levelAPI.getAllLevels()
    this.procedures = await procedureAPI.getAllProcedures()
  },
  methods: {
    async createJob() {
      try {
        const skillsSelectId = this.skillsSelect.map(skill => skill.id)
        console.log(skillsSelectId)
        await axios.post("/jobs", {
          title: this.newJobData.title,
          procedureId: this.newJobData.procedure_id,
          levelId: this.newJobData.level_id,
          numberHiring: this.newJobData.number_hiring,
          address: this.newJobData.address,
          province: this.newJobData.province,
          salaryFrom: this.newJobData.salary_from,
          salaryTo: this.newJobData.salary_to,
          dateTo: this.newJobData.date_to,
          requirement: this.newJobData.requirement,
          description: this.newJobData.description,
          benefit: this.newJobData.benefit,
          skillIds: skillsSelectId
        })
        this.$toast.success('Create successfully')
      } catch (error) {
        this.$toast.error('Create failed')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.required {
  &:after {
    content: " *";
    color: red;
  }
}
</style>