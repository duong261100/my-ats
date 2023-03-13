<template>
  <div class="min-w-[260px] h-[100vh]">
    <ul>
      <nuxt-link to="/admin/">
        <li :class="{ active: $route.path === '/admin/' }">Dashboard</li>
      </nuxt-link>
      <nuxt-link to="/admin/new-job">
        <li :class="{ active: $route.path === '/admin/new-job' }">Post New Job</li>
      </nuxt-link>
      <nuxt-link to="/admin/all-jobs">
        <li :class="{ active: $route.path === '/admin/all-jobs' }">All Jobs</li>
      </nuxt-link>
      <nuxt-link to="/admin/manage-procedure">
        <li :class="{ active: $route.path === '/admin/manage-procedure' }">Manage Procedure</li>
      </nuxt-link>
      <nuxt-link to="/admin/applications">
        <li :class="{ active: $route.path === '/admin/applications' }">Applications</li>
      </nuxt-link>
      <nuxt-link to="/admin/candidates-procedure">
        <li :class="{ active: $route.path === '/admin/candidates-procedure' }">Candidates Procedure</li>
      </nuxt-link>
      <nuxt-link to="/admin/new-job">
        <li @click="logout()">Logout</li>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      activePage: 1
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$toast.success("Log out successfully")
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
ul {
  padding-left: 0;
}

li {
  color: #667488;
  line-height: 24px;
  padding: 14px 0 14px 15px;
  border-bottom: 1px solid #f3f5f9;
}

li.active {
  background-color: #E7F8E8;
  color: #11b719;
}

li:hover {
  background-color: #E7F8E8;
  color: #11b719;
  cursor: pointer;
}
</style>