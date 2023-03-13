<template>
  <div class="
              w-full
              py-[15px]
              text-black
              space-y-[30px]
              [&>div>h3]:underline-static [&>div>h3]:pb-[15px] [&>div>h3]:mb-[20px]
            ">
    <!-- Search Filter -->
    <div>
      <h3>Title</h3>
      <div class="
                  relative
                  flex
                  items-center
                  w-full
                  text-grey
                  leading-[26px]
                ">
        <input v-model="titleSearch" type="text" class="
                    w-full h-[44px]
                    border-solid border-[1px] border-grey-soft
                    pl-[10px] pr-[40px] py-[2px]
                  " placeholder="Enter Keyword" />
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="absolute right-[15px]" />
      </div>
    </div>

    <!-- Price Filter -->
    <div>
      <h3>Salary</h3>
      <ul>
        <li v-for="priceRange in priceRangeFilter" :key="priceRange.id">
          <label class="text-grey text-[16px]">
            <input v-model="priceRange.isSelected" name="checkbox" @change="uniqueCheck($event, priceRange.id)"
              type="checkbox" class="radio mr-[5px] " />
            {{ priceRange.label }}
          </label>
        </li>
      </ul>
    </div>

    <!-- Categories Filter -->
    <div>
      <h3>Skills</h3>
      <button v-for="(category, index) in categories" :key="index" class="tag-filter-custom"
        :class="{ active: category.isActive }" @click="category.isActive = !category.isActive">
        {{ category.name }}
      </button>
    </div>

    <!-- Province Filter -->
    <div>
      <h3>Province</h3>
      <select v-model="provinceSelected" class="
                  w-full h-[44px]
                  pl-[10px] pr-[40px] py-[2px]
                  border-solid border-[1px] border-grey-soft
                ">
        <option v-for="province in provinces" :key="province.id">
          {{ province.name }}
        </option>
      </select>
    </div>

    <!-- Level Filter -->
    <div>
      <h3>Level</h3>
      <select v-model="levelSelected" class="
                  w-full h-[44px]
                  pl-[10px] pr-[40px] py-[2px]
                  border-solid border-[1px] border-grey-soft
                ">
        <option v-for="level in levels" :key="level.id">
          {{ level.name }}
        </option>
      </select>
    </div>

    <button @click="search()"
      class="btn-solid border-transparent !mx-0 bg-red-600 text-white hover:border-red-600 hover:text-red-600">Search</button>
  </div>
</template>

<script>
import skillAPI from '../../apis/skills'
export default {
  data() {
    return {
      titleSearch: '',
      priceRangeFilter: [
        {
          id: 1,
          label: 'Under 5.000.000đ',
          fromValue: 0,
          toValue: 5000000,
          isSelected: false,
        },
        {
          id: 2,
          label: '5.000.000đ - 15.000.000đ',
          fromValue: 5000000,
          toValue: 15000000,
          isSelected: false,
        },
        {
          id: 3,
          label: '15.000.000đ - 30.000.000đ',
          fromValue: 15000000,
          toValue: 30000000,
          isSelected: false,
        },
        {
          id: 4,
          label: '30.000.000đ - 50.000.000đ',
          fromValue: 30000000,
          toValue: 50000000,
          isSelected: false,
        },
        {
          id: 5,
          label: 'Over 50.000.000đ',
          fromValue: 50000000,
          toValue: 999999999,
          isSelected: false,
        },
      ],
      categories: [],
      provinces: [{ id: 1, name: 'Hà Nội' }, { id: 2, name: 'TP. Hồ Chí Minh' }, { id: 3, name: 'Đà Nẵng' }],
      provinceSelected: '',
      levels: [{ id: 1, name: 'Intern' }, { id: 2, name: 'Fresher' }, { id: 3, name: 'Junior' }, { id: 4, name: 'Middle' }, { id: 5, name: 'Senior' }, { id: 6, name: 'Leader' }],
      levelSelected: '',
    }
  },
  async fetch() {
    this.categories = await skillAPI.getAllSkills()
    this.categories = this.categories.map((obj) => ({ ...obj, isActive: false }))
  },
  methods: {
    uniqueCheck(e, checkboxId) {
      if (e.target.checked) {
        this.priceRangeFilter.forEach(priceRange => {
          if (priceRange.id !== checkboxId) {
            priceRange.isSelected = false
          }
        })
      }
    },
    async search() {
      const categoriesSelected = this.categories.filter(obj => obj.isActive)
      let categoriesSelectedId
      if (categoriesSelected.length === 0) {
        categoriesSelectedId = this.categories.map(obj => obj.id)
      }
      else {
        categoriesSelectedId = categoriesSelected.map(obj => obj.id)
      }

      const priceRangeSelected = this.priceRangeFilter.find(obj => obj.isSelected)
      const priceRange = priceRangeSelected ? [priceRangeSelected.fromValue, priceRangeSelected.toValue] : [0, 999999999]

      const selectedLevelId = this.levels.find(obj => obj.name === this.levelSelected)

      const searchData = {
        titleSearch: this.titleSearch,
        skillsSelectedId: categoriesSelectedId,
        province: this.provinceSelected,
        levelId: selectedLevelId?.id,
        salaryRange: priceRange
      }

      await this.$emit('search', searchData)
    }
  }
}
</script>
<style scoped>
h3 {
  font-weight: 400;

}
</style>