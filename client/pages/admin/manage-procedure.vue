<template>
  <div class="w-full min-h-[100vh] bg-light-gray p-[25px] bg-[#F6F7F9]">
    <div class="w-full h-full bg-white">
      <div class="flex items-center p-[15px] border-b-solid border-b-[1px]">
        <span class="mr-[6px]"><font-awesome-icon icon="fa-solid fa-gear" /></span>
        <h4 class="font-medium">Manage Procedure</h4>
      </div>

      <div class="w-full h-full px-[25px] py-[15px]">
        <p class="font-semibold">Create new procedure: </p>
        <v-row>
          <v-col lg="4">
            <p class="required">Name</p>
            <v-text-field v-model="newProcedure.name" label="Name" outlined clearable></v-text-field>
          </v-col>
          <v-col lg="8">
            <p>Description</p>
            <v-text-field v-model="newProcedure.description" label="Description" outlined clearable></v-text-field>
          </v-col>
        </v-row>
        <p class="required">Steps</p>
        <v-combobox @change="handleSelect" v-model="stepsSelect" :items="steps" item-text="name" label="Select steps"
          multiple small-chips single-line return-object outlined><template #selection="{ item }">
            <v-chip outlined color="green">{{ item.name }}</v-chip>
          </template>
        </v-combobox>

        <div class="mb-[30px]">
          <v-row v-for="step in stepsSelect" :key="step.id" dense>
            <v-spacer />
            <v-col lg="2"><v-chip class="ma-2" :color="`${chipColor(step.status_id)}`" text-color="white">{{
              step.name
            }}</v-chip></v-col>
            <v-col lg="9" class="m-auto">{{ step.description }}</v-col>
          </v-row>
        </div>

        <div class="mb-[40px]">
          <v-row v-if="stepsSelect.length" class="px-[15px]">
            <v-col lg="1" />
            <v-btn color="primary" small class="ml-[10px]" @click="createNewProcedure()">
              Create
            </v-btn>
          </v-row>
        </div>

        <p class="font-semibold">Create new step: </p>
        <v-row>
          <v-col lg="4">
            <p class="required">Name</p>
            <v-text-field v-model="newStep.name" label="Name" outlined clearable></v-text-field>
          </v-col>
          <v-col lg="2">
            <p>Type</p>
            <v-select :items="statuses" v-model="newStep.status_id" name="status" item-text="name" item-value="id"
              outlined />
          </v-col>
          <v-col lg="6">
            <p>Description</p>
            <v-text-field v-model="newStep.description" label="Description" outlined clearable></v-text-field>
          </v-col>
        </v-row>

        <div class="mb-[40px]">
          <v-row class="px-[15px]">
            <v-btn color="primary" small @click="createNewStep()">
              Create
            </v-btn>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import statusesAPI from '~/apis/statuses'
import stepsAPI from '~/apis/steps'
import axios from 'axios'
export default {
  layout: 'admin-layout',
  meta: {
    auth: { authority: 1 }
  },
  data() {
    return {
      stepsSelect: [],
      steps: [],
      statuses: [],
      newStep: {
        name: '',
        status_id: 2,
        description: '',
      },
      newProcedure: {
        name: '',
        description: '',
      }
    }
  },
  async fetch() {
    this.steps = await stepsAPI.getAllSteps()
    this.steps.sort((a, b) => (a.status_id > b.status_id) ? 1 : ((b.status_id > a.status_id) ? -1 : 0))
    this.statuses = await statusesAPI.getAllStatuses()
  },
  methods: {
    handleSelect() {
      this.stepsSelect.sort((a, b) => (a.status_id > b.status_id) ? 1 : ((b.status_id > a.status_id) ? -1 : 0))
    },
    chipColor(status_id) {
      const chipColors = ["cyan", "warning", "success", "error"]
      return chipColors[status_id] ?? "secondary"
    },
    async createNewStep() {
      try {
        const newStep = await stepsAPI.createStep(this.newStep)
        this.steps.push(newStep)
        this.steps.sort((a, b) => (a.status_id > b.status_id) ? 1 : ((b.status_id > a.status_id) ? -1 : 0))
        this.$toast.success('Create successfully')
      } catch (error) {
        this.$toast.success('Create failed')
      }
    },
    async createNewProcedure() {
      try {
        const stepIds = this.stepsSelect.map(step => step.id)
        console.log(stepIds)
        await axios.post("/procedures", {
          name: this.newProcedure.name,
          description: this.newProcedure.description,
          stepIds: stepIds
        })
        this.$toast.success('Create successfully')
      } catch (error) {
        this.$toast.error('Create failed')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>