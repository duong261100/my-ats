<template>
  <div class="text-white">

    <!-- Cart - Login - Register - Logout - Profile -->
    <div class="pt-[20px]">
      <div class="container">
        <div class="
                  flex
                  justify-end
                  space-x-[20px]
                  transition-none
                ">
          <!-- logout - profile -->
          <span v-if="isLogin && this.$auth.user?.fullname" class="flex items-center justify-end">
            <p>Hello, {{ this.$auth.user.fullname }}</p>
            <nuxt-link to="/users/profile">
              <img class="min-w-[35px] max-w-[35px] max-h-[35px] rounded-full ml-[20px] -mr-[30px] cursor-pointer"
                :src="this.$auth.user.avatar_url || '../../_nuxt/assets/image/default-avatar.jpg'" alt="" />
            </nuxt-link>
            <button @click="logout()" class="text-[20px] hover:text-blue-soft ml-[45px]">
              <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
            </button>
          </span>
          <!-- login - register -->
          <span v-else class="flex items-center justify-end space-x-[10px] text-white">
            <nuxt-link to="/login" tag="button" class="btn btn-default hover:text-blue-soft">Login</nuxt-link>
            <nuxt-link to="/login" tag="button" class="btn btn-default hover:text-blue-soft">Register</nuxt-link>
          </span>
        </div>
      </div>
    </div>

    <!-- Logo - Navbar -->
    <div>
      <div class="container flex place-content-between items-center">
        <!-- Logo -->
        <div>
          <nuxt-link to="/" class="cursor-pointer w-[250px]" tag="img" :src="require('~/assets/image/logo.png')" />
        </div>

        <!-- Navbar-->
        <div>
          <ul class="
                    flex
                    mr-[15px]
                    space-x-[30px]
                    [&>li>a]:py-[15px] [&>li>a]:relative
                  ">
            <li>
              <nuxt-link to="/" class="underline-animation">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/jobs/search" class="underline-animation">
                Filter Search</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/jobs/applied" class="underline-animation">
                Applied Job</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/users/profile" class="underline-animation">
                My Profile</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/cv/1/edit" class="underline-animation">
                My CV</nuxt-link>
            </li>
            <li class="relative group">
              <a href="#" class="underline-animation">Languages</a>
              <ul class="
                        dropdown-custom
                        grid grid-cols-1
                        invisible
                        w-[150px]
                        opacity: 0
                        group-hover:opacity-100 group-hover:visible group-hover:top-[37px]
                      ">
                <a v-for="(language, index) in languages" :key="index">
                  <li>
                    {{ language }}
                  </li>
                </a>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      languages: ['English'],
      isLogin: true,
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$toast.success("Log out successfully")
      this.isLogin = false
    }
  }
}
</script>

<style scoped></style>