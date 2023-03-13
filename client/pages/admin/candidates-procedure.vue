<template>
  <div class="w-full min-h-[100vh] bg-light-gray p-[25px] bg-[#F6F7F9]">
    <div class="w-full h-full bg-white">
      <div class="flex items-center p-[15px] border-b-solid border-b-[1px]">
        <span class="mr-[6px]"><font-awesome-icon icon="fa-solid fa-gear" /></span>
        <h4 class="font-medium">Candidates Procedure</h4>
      </div>
      <div class="flex items-center p-[15px] border-b-solid border-b-[1px]">
        <v-text-field class="!max-w-[300px] mr-[20px]" label="Name of Candidate" v-model="searchName" />
        <v-autocomplete class="!max-w-[300px] mr-[20px]" clearable label="Job" v-model="selectedJob" :items="listJobs"
          item-text="title" return-object />
        <v-btn variant="flat" color="error" @click="search()">Search</v-btn>
      </div>
      <div class="h-[550px] flex flex-row gap-[12px] w-full overflow-x-scroll px-[20px] py-[12px]">
        <div v-for="step in listStepsShow"
          class="h-[500px] overflow-y-hidden min-w-[20%] bg-[#fafafa] border-[1px] border-solid border-[#ddd]">
          <h4 class="px-[10px] py-[5px] bg-[#1BAF65] text-white">{{ step.name }}</h4>
          <draggable :class="`draggable-${step.id}`"
            class="custom-step h-[450px] over-flow-y-hidden list-group px-[10px] py-[5px]" :list="step.listCajs"
            group="people" @change="log($event, step)" :move="checkMove">
            <div class="list-group-item bg-[#efeefe] p-[10px] mt-[5px] mb-[10px]" v-for="(caj, index) in step.listCajs"
              :key="index">
              <div class="grid grid-cols-12" @click="handleTarget(caj)">
                <div class="col-span-3">
                  <img class="w-[40px] h-[40px] rounded-full" :src="caj.candidate.avatar_url" />
                </div>
                <div class="col-span-9">
                  <h4 class="text-[14px] flex justify-between">{{ caj.candidate.fullname }}
                    <v-icon class="max-w-[22px] max-h-[21px]" @click="selectCaj(caj)">mdi-dots-vertical</v-icon>
                  </h4>
                  <p class="text-[12px] break-words leading-[14px] mb-0">{{ caj.candidate.email }}</p>
                  <p class="text-[12px] break-words leading-[14px]">{{ caj.point }} points</p>
                </div>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <base-confirm ref="confirm" />

    <div class="modal absolute top-0 left-0 w-full h-full flex justify-center items-center" v-if="isShowModal">
      <div class="w-[800px] h-[670px] bg-white">
        <h3 class="mx-[25px] my-[15px]">Details</h3>
        <v-form class="pl-[25px] pr-[50px] pt-[15px] pb-[10px]">
          <v-row>
            <v-col lg="3">
              <img
                class="min-w-[35px] max-w-[100px] max-h-[100px] min-h-[100px] rounded-full ml-[20px] -mr-[30px] cursor-pointer"
                :src="selectedCaj.candidate.avatar_url" alt="" />
            </v-col>
            <v-col lg="4">
              <p class="required">Name</p>
              <v-text-field disabled v-model="selectedCaj.candidate.fullname" label="Title" outlined
                clearable></v-text-field>
            </v-col>
            <v-col lg="5">
              <p class="required">Email</p>
              <v-text-field disabled v-model="selectedCaj.candidate.email" label="Email" outlined
                clearable></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col lg="4">
              <p class="required">Phone Number</p>
              <v-text-field disabled v-model="selectedCaj.candidate.phone_number" label="Phone Number"
                outlined></v-text-field>
            </v-col>
            <v-col lg="8">
              <p>Address</p>
              <v-text-field disabled v-model="selectedCaj.candidate.address" outlined name="input-7-4"
                label="Address"></v-text-field>
            </v-col>
          </v-row>

          <span>CV: </span>
          <NuxtLink class="text-blue-500" :to="`/resume/${selectedCaj.candidate.id}`" target="_blank">Here</NuxtLink>

          <v-row>
            <v-col lg="3">
              <p class="required">Point</p>
              <v-text-field v-model="selectedCaj.point" label="Phone Number" type="number" outlined></v-text-field>
            </v-col>
            <v-col lg="9">
              <p>Note</p>
              <v-textarea v-model="selectedCaj.note" outlined name="input-7-4" label="Description"></v-textarea>
            </v-col>
          </v-row>
        </v-form>
        <button @click="updateCaj()"
          class="ml-[25px] mb-[15px] border-[#26AE61] rounded-[5px] bg-[#26AE61] text-white px-[15px] py-[5px]">
          Update</button>
        <button @click="isShowModal = !isShowModal"
          class="ml-[10px] mb-[15px] border-[#ff4444] rounded-[5px] bg-[#ff4444] text-white px-[15px] py-[5px]">
          Cancel</button>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable"
import cajAPI from "~/apis/candidates_apply_jobs"
import stepAPI from "~/apis/steps"
import jobAPI from "~/apis/jobs"
import procedureAPI from "~/apis/procedures"
import axios from 'axios'
export default {
  layout: 'admin-layout',
  meta: {
    auth: { authority: 1 }
  },
  components: {
    draggable
  },
  data() {
    return {
      listSteps: [],
      listStepsShow: [],
      searchName: "",
      listJobs: [],
      selectedJob: {},
      changes: {},
      isShowModal: false,
      selectedCaj: {},
    };
  },
  async fetch() {
    this.listJobs = await jobAPI.getAllJobs()
    this.listSteps = await stepAPI.getAllSteps()
    this.listSteps = this.listSteps.filter(step => step.status_id != 1)
    this.listSteps = this.listSteps.map(step => ({ ...step, listCajs: [] }))
    for (let i = 0; i < this.listSteps.length; i++) {
      this.listSteps[i].listCajs = await cajAPI.getAllCajs(0, this.listSteps[i].id)
    }
    this.listStepsShow = this.listSteps
  },
  methods: {
    selectCaj(caj) {
      this.isShowModal = !this.isShowModal
      this.selectedCaj = caj
    },
    async updateCaj() {
      await axios.put("/candidates-apply-jobs/update", {
        candidate_id: this.selectedCaj.candidate_id,
        job_id: this.selectedCaj.job_id,
        point: this.selectedCaj.point,
        note: this.selectedCaj.note
      })
      this.isShowModal = !this.isShowModal
    },
    add: function () {
      this.list.push({ name: "Juan" });
    },
    replace: function () {
      this.list = [{ name: "Edgard" }];
    },
    clone: function (el) {
      return {
        name: el.name + " cloned"
      };
    },
    log: async function (evt, step) {
      if (evt.moved) return
      if (evt.added)
        this.changes = { evt, step }
      else if (evt.removed) {
        if (confirm('Are you sure to move this candidate to selected step?')) {
          await axios.put("/candidates-apply-jobs", {
            data: {
              candidate_id: evt.removed.element.candidate_id,
              job_id: evt.removed.element.job_id,
              step_id: this.changes.step.id
            }
          })
          this.changes = {}
        } else {
          console.log(this.changes.step)
          console.log(this.changes.evt)
          this.listStepsShow = this.listStepsShow.map(s => {
            if (s.id == step.id) {
              s.listCajs.push(this.changes.evt.added.element)
              return s
            }
            else if (s.id == this.changes.step.id) {
              const newS = s.listCajs.filter(caj => caj.candidate_id != this.changes.evt.added.element.candidate_id)
              s.listCajs = newS
              return s
            } else return s
          })
          this.changes = {}
        }
      }
    },
    checkMove: function (evt) {
      const toClassLists = evt.to.classList
      if (toClassLists.value.includes('active')) return true
      return false
    },

    async handleTarget(caj) {
      const procedure_id = caj.job.procedure_id
      const procedure = await procedureAPI.getProcedureById(procedure_id)
      const availStepIds = procedure.steps.map(step => step.id)
      for (let i = 0; i < this.listStepsShow.length; i++) {
        const className = `draggable-${this.listStepsShow[i].id}`
        const nodeDraggable = document.querySelector(`.${className}`)
        if (availStepIds.includes(this.listStepsShow[i].id)) {
          nodeDraggable.classList.add('active')
          nodeDraggable.classList.remove('errors')
        }
        else {
          nodeDraggable.classList.remove('active')
          nodeDraggable.classList.add('errors')
        }
      }
    },

    search: async function () {
      this.listStepsShow = this.listSteps.map(step => {
        const stepClone = JSON.parse(JSON.stringify(step))
        if (this.selectedJob?.id)
          stepClone.listCajs = step.listCajs.filter(caj => caj.job_id == this.selectedJob.id && caj.candidate.fullname.toLowerCase().includes(this.searchName.toLowerCase()))
        else
          stepClone.listCajs = step.listCajs.filter(caj => caj.candidate.fullname.toLowerCase().includes(this.searchName.toLowerCase()))
        return stepClone
      })

      if (this.selectedJob?.id) {
        const procedure = await procedureAPI.getProcedureById(this.selectedJob.procedure_id)
        const stepIds = procedure.steps.map(step => step.id)
        this.listStepsShow = this.listStepsShow.filter(step => stepIds.includes(step.id))
      }
    }
  }
};
</script>
<style scoped>
.custom-step:hover,
.custom-step:hover:focus,
.custom-step:active {
  overflow-y: auto !important;
}

.custom-step.active {
  border: 3px solid #1BAF65;
  border-bottom: none;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>