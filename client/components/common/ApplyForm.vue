<template>
  <div class="absolute w-[800px] h-[650px] bg-white">
    <h3 class="mx-[25px] my-[15px]">Application</h3>
    <v-form class="pl-[25px] pr-[50px] pt-[15px] pb-[10px]">
      <v-row>
        <v-col lg="3">
          <img
            class="min-w-[35px] max-w-[100px] max-h-[100px] min-h-[100px] rounded-full ml-[20px] -mr-[30px] cursor-pointer"
            :src="candidate.avatar_url" alt="" />
        </v-col>
        <v-col lg="6">
          <p class="required">Name</p>
          <v-text-field v-model="candidateData.fullname" label="Title" outlined clearable></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col lg="6">
          <p class="required">Email</p>
          <v-text-field v-model="candidateData.email" label="Title" outlined clearable></v-text-field>
        </v-col>
        <v-col lg="6">
          <p class="required">Phone Number</p>
          <v-text-field v-model="candidateData.phone_number" label="Phone Number" outlined></v-text-field>
        </v-col>
      </v-row>

      <p>Address</p>
      <v-textarea v-model="candidateData.address" outlined name="input-7-4" label="Description"></v-textarea>

      <span>Your CV: </span>
      <NuxtLink class="text-blue-500" :to="`/resume/${this.$auth.user.id}`" target="_blank">Here</NuxtLink>
    </v-form>
    <button @click="$emit('applyJob')"
      class="ml-[25px] mb-[15px] border-[#26AE61] rounded-[5px] bg-[#26AE61] text-white px-[15px] py-[5px]">
      Apply</button>
    <button @click="$emit('closeModal')"
      class="ml-[10px] mb-[15px] border-[#ff4444] rounded-[5px] bg-[#ff4444] text-white px-[15px] py-[5px]">
      Cancel</button>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      rules: rules,
    }
  },
  props: {
    candidate: {}
  },
  data() {
    return {
      candidateData: {
        avatar_url: "../../_nuxt/assets/image/default-avatar.jpg",
        fullname: "",
        phone_number: "",
        address: "",
        email: "",
      }
    }
  },
  fetch() {
    if (this.candidate)
      this.candidateData = this.candidate
  }
}
</script>

<style scoped></style>