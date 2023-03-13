<template>
  <div class="admin-header flex">
    <div class="w-[260px]">
      <div class="w-[260px] h-full border-right-custom">
        <img class="w-[200px] pt-[8px] m-auto" :src="require('~/assets/image/black-logo.png')" alt="">
      </div>
    </div>
    <div class="grow border-right-custom flex justify-between">
      <div class="w-[300px] my-auto">
        <input class="ml-[20px] border-solid border-grey border-[1px] rounded-full w-full px-[15px] py-[5px]" type="text">
      </div>
      <div class="flex items-center space-x-[20px] mr-[20px] !grow-0 !shrink-0">
        <p class="mb-0" @click="$router.push('/admin/new-job')">Đăng tin tuyển dụng</p>
        <p class="mb-0" @click="$router.push('/admin/manage-procedure')">Tạo Procedure</p>
        <p class="mb-0" @click="$router.push('/')">Website tuyển dụng</p>
        <font-awesome-icon icon="fa-solid fa-bell" />
      </div>
    </div>
    <div class="w-[200px] flex justify-center items-center">
      <div class="avatar">
        <img class="min-w-[40px] max-w-[40px] max-h-[40px] rounded-full mr-[10px] cursor-pointer"
          src="https://workscout.in/wp-content/uploads/2022/01/user-profile-avatar-590x590-1.jpg" alt="">
      </div>
      <p class="mr-[5px] mb-0">Hi, Duong!</p>
      <font-awesome-icon icon="fa-solid fa-chevron-down" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.admin-header {
  height: 60px;
  box-shadow: 0 0 18px 0 rgb(0 0 0 / 12%);
}

.border-right-custom {
  border-right: 1px solid rgba(0, 0, 0, 0.15);
}
</style>