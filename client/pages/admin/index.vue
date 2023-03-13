<template>
  <div class="w-full min-h-[100vh] bg-light-gray p-[25px] bg-[#F6F7F9]">
    <div class="w-full h-full bg-white">
      <div class="flex items-center p-[15px] border-b-solid border-b-[1px]">
        <span class="mr-[6px]"><font-awesome-icon icon="fa-solid fa-gear" /></span>
        <h4 class="font-medium">Dashboard</h4>
      </div>
      <div class="grid grid-cols-4 my-[20px] pl-[20px] pr-[5px] text-white">
        <div class="pr-[20px] h-[160px]">
          <div class="bg-[#1baf65] h-full relative rounded-[4px]">
            <div class="absolute left-[32px] top-1/2 -translate-y-1/2">
              <h3 class="font-semibold text-[42px] tracking-[1px]">11</h3>
              <h5 class="text-[18px] text-white leading-[24px] font-light mt-[4px]">Job active</h5>
            </div>
            <div class="absolute right-[32px] top-1/2 -translate-y-[40%] opacity-20 text-[65px]">
              <font-awesome-icon class="text-white" icon="fa-solid fa-location-dot" />
            </div>
          </div>
        </div>
        <div class="pr-[20px] h-[160px]">
          <div class="bg-[#f39f00] h-full relative rounded-[4px]">
            <div class="absolute left-[32px] top-1/2 -translate-y-1/2">
              <h3 class="font-semibold text-[42px] tracking-[1px]">{{ candidateNumberByStatus(2) }}</h3>
              <h5 class="text-[18px] text-white leading-[24px] font-light mt-[4px]">Under Interviewing</h5>
            </div>
            <div class="absolute right-[32px] top-1/2 -translate-y-[40%] opacity-20 text-[65px]">
              <font-awesome-icon class="text-white" icon="fa-solid fa-file-circle-question" />
            </div>
          </div>
        </div>
        <div class="pr-[20px] h-[160px]">
          <div class="bg-[#002758] h-full relative rounded-[4px]">
            <div class="absolute left-[32px] top-1/2 -translate-y-1/2">
              <h3 class="font-semibold text-[42px] tracking-[1px]">{{ candidateNumberByStatus(1) }}</h3>
              <h5 class="text-[18px] text-white leading-[24px] font-light mt-[4px]">New Applications</h5>
            </div>
            <div class="absolute right-[32px] top-1/2 -translate-y-[40%] opacity-20 text-[65px]">
              <font-awesome-icon class="text-white" icon="fa-solid fa-envelope" />
            </div>
          </div>
        </div>
        <div class="pr-[20px] h-[160px]">
          <div class="bg-[#ce024b] h-full relative rounded-[4px]">
            <div class="absolute left-[32px] top-1/2 -translate-y-1/2">
              <h3 class="font-semibold text-[42px] tracking-[1px]">{{ candidateNumberByStatus(4) }}</h3>
              <h5 class="text-[18px] text-white leading-[24px] font-light mt-[4px]">Passed</h5>
            </div>
            <div class="absolute right-[32px] top-1/2 -translate-y-[40%] opacity-20 text-[65px]">
              <font-awesome-icon class="text-white" icon="fa-solid fa-user-check" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full p-[30px]">
        <p class="font-semibold text-[20px]">Recruitment process (only opening) </p>
        <div class="row">
          <v-col lg="1" />
          <v-col lg="10">
            <apexchart ref="column" type="bar" :options="columnOptions" :series="columnSeries"></apexchart>
          </v-col>
        </div>
        <div class="row">
          <v-col lg="6">
            <p class="font-semibold text-[20px]">Overview process (only opening) </p>
            <apexchart ref="bar" type="bar" :options="barOptions" :series="barSeries"></apexchart>
          </v-col>
          <v-col lg="1" />
          <v-col lg="5">
            <p class="font-semibold text-[20px] !mb-[32px]">Details process (only opening) </p>
            <apexchart ref="pie" type="donut" :options="pieOptions" :series="pieSeries"></apexchart>
          </v-col>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cajAPI from '~/apis/candidates_apply_jobs'
import jobAPI from '~/apis/jobs'
import stepAPI from '~/apis/steps'
import statusAPI from '~/apis/statuses'
import { CHART_COLORS } from '~/constants/index'

export default {
  layout: 'admin-layout',
  meta: {
    auth: { authority: 1 }
  },
  data: function () {
    return {
      jobs: [],
      cajs: [],
      columnOptions: {
        chart: {
          id: 'vuechart-example'
        },
        colors: [
          function ({ dataPointIndex }) {
            return CHART_COLORS[dataPointIndex]
          }
        ],
        xaxis: {
          categories: []
        },
      },
      columnSeries: [{
        name: 'numbers',
        data: []
      }],


      barSeries: [{
        data: []
      }],
      barOptions: {
        chart: { type: 'bar' },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors: [...CHART_COLORS.slice(0, 2), ...CHART_COLORS.slice(-3)],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return val
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        }
      },


      pieSeries: [],
      pieOptions: {
        chart: {
          type: 'donut',
        },
        labels: [],
        colors: CHART_COLORS,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    }
  },
  async fetch() {
    this.jobs = await jobAPI.getAllJobs()
    this.cajs = await cajAPI.getAllCajs()
    const steps = await stepAPI.getAllSteps()
    const statuses = await statusAPI.getAllStatuses()

    const stepNames = steps.map(step => step.name)
    const statusNames = statuses.map(status => status.name)
    this.$refs.column.updateOptions({
      xaxis: {
        categories: stepNames
      }
    })
    this.$refs.bar.updateOptions({
      xaxis: {
        categories: statusNames
      }
    })
    this.$refs.pie.updateOptions({
      labels: stepNames
    })

    let data = []
    let overviewData = []
    for (let i = 0; i < steps.length; i++) {
      const filteredCajs = this.cajs.filter(caj => caj.step_id === steps[i].id)
      data.push(filteredCajs.length)
    }
    for (let i = 0; i < statuses.length; i++) {
      const filteredCajs = this.cajs.filter(caj => caj.step?.status_id === statuses[i].id)
      overviewData.push(filteredCajs.length)
    }
    this.$refs.column.updateSeries([{
      data: data
    }])
    this.$refs.bar.updateSeries([{
      data: overviewData
    }])
    this.pieSeries = data
  },
  methods: {
    candidateNumberByStatus(id) {
      const filteredCajs = this.cajs.filter(caj => caj.step?.status_id === id)
      return filteredCajs.length || 0
    },
  },
}
</script>