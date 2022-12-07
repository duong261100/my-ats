<template>
  <div class="container">
    <div class="grid grid-cols-12 gap-[60px] p-[30px] w-[90%]">
      <div class="col-span-4">
        <img class="w-full mb-[20px]"
          src="https://storage.googleapis.com/book-store-41a6b.appspot.com/1667411293360.post-image-1?GoogleAccessId=firebase-adminsdk-1lna4%40book-store-41a6b.iam.gserviceaccount.com&Expires=1893430800&Signature=rqfkHCI18Kd4GPAct0QXw%2BiaN3h8cpTt1I32idOzQQh%2FE8NUGFsi3TJwXGyfMlXlZjRLASDosr5w7hfsdVJRaBnKV1EEg4QUFBUh2FiOt5TP1b1xeSI2zOBNWb4ygPoXEYhMrybTWbjfLzowSg9UFLJnTthb8C0uPhuLb5xqWmvtGC5f4PGpnwWZGNjwBuePuiLCDptAccVRrIIrZjtzJyWDiA61sdRMoGIFb5TsI3gNQLKiUgmVRIH7VZLUbZpRFi5c7MaPaRsXYwg6UkUTJUngYjxdHT7jnoNMc9RDPXBX%2BU8M%2B9lreBlxXN0LO6mdNv7tG%2F5MykEiySd3GLB8YQ%3D%3D"
          alt="" />
        <div class="space-y-[10px] text-[#808080]">
          <div class="flex my-[20px]">
            <h4 class="inline-block font-medium text-[16px] uppercase mr-[10px]">Contact</h4>
            <span class="grow-1 w-full h-[2px] inline-block m-auto border-b-[1px] border-solid border-[#ddd]"></span>
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-envelope" />
            vubinhduong261100@gmail.com
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-phone" />
            0123456789
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-address-book" />
            22 Lương Khánh Thiện, Tương Mai, Hoàng Mai, Hà Nội
          </div>
          <div class="flex !mt-[30px]">
            <h4 class="inline-block font-medium text-[16px] uppercase mr-[10px]">Personal</h4>
            <span class="grow-1 w-full h-[2px] inline-block m-auto border-b-[1px] border-solid border-[#ddd]"></span>
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-cake-candles" />
            26 / 11 / 2000
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-rocket" />
            Chơi bóng đá, nghe nhạc, xem phim
          </div>
        </div>
      </div>
      <div class="col-span-8">
        <h3 class="font-medium">Jeremy Rose</h3>
        <p class="text-blue-main font-medium mb-[20px]">Product Designer</p>
        <div class="flex my-[20px]">
          <h4 class="inline-block font-medium text-[16px] uppercase mr-[10px]">Summary</h4>
          <span class="grow-1 w-full h-[2px] inline-block m-auto border-b-[1px] border-solid border-[#ddd]"></span>
        </div>
        <p class="mb-[20px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, a dolores quas
          voluptatibus dicta culpa
          facere corrupti, omnis quae repudiandae obcaecati eligendi? Accusamus corrupti atque et. Commodi corrupti
          quasi quibusdam.</p>
        <div class="flex my-[20px]">
          <h4 class="inline-block font-medium text-[16px] uppercase mr-[10px]">Skills</h4>
          <span class="grow-1 w-full h-[2px] inline-block m-auto border-b-[1px] border-solid border-[#ddd]"></span>
        </div>
        <div class="mb-[20px]">
          <button v-for="i in 8" class="tag-custom mr-[10px] mb-[10px]">React Native</button>
          <button class="tag-custom mr-[10px] mb-[10px]">+</button>
        </div>
        <div class="flex my-[20px]">
          <h4 class="inline-block font-medium text-[16px] uppercase mr-[10px]">Experience</h4>
          <span class="grow-1 w-full h-[2px] inline-block m-auto border-b-[1px] border-solid border-[#ddd]"></span>
        </div>
        <div v-for="i in 2" class="mb-[15px]">
          <h6 class="font-medium">Junior Ruby Backend</h6>
          <div class="flex justify-between italic">
            <span class="font-medium text-[13px] text-black">Sun* Asterisk</span>
            <span>01/06/2021 - 01/08/2021</span>
          </div>
          <p class="text-[13px]">Developing with Nuxt, Express and MySQL (Typescript, Tailwind) <br />
            Basic ecommerce web with cart, filter search, multi-tags search, sort and pagination</p>
        </div>
        <div class="flex justify-end !mt-[20px]">
          <button @click="updateProfile"
            class="border-[#00c851] rounded-[5px] bg-[#00c851] disabled text-white px-[15px] py-[5px] mr-[10px]">Update</button>
          <nuxt-link :to="{ path: '/' }" tag="button"
            class="border-[#ff4444] rounded-[5px] bg-[#ff4444] text-white px-[15px] py-[5px">
            Cancel</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userAPI from "../../apis/users"
import axios from 'axios'
export default {
  meta: {
    auth: { authority: 0 }
  },
  data() {
    return {
      user: {},
      file: "",
    }
  },
  async fetch() {
    this.user = await userAPI.getUserDetail()
  },
  methods: {
    handleUpload() {
      this.file = this.$refs.file.files[0]
    },
    async updateProfile() {
      if (this.file) {
        const formData = new FormData()
        formData.append("file", this.file)

        if (this.user.image) {
          try {
            await axios.post('/upload/delete', { image: this.user.image })
          } catch (error) {
            console.log(error)
            this.$toast.error(error.message)
          }
        }

        await axios.post('/upload', formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(response => {
          this.user.image = response.data
        }).catch(error => {
          this.$toast.error(error.message)
        })
      }

      try {
        await userAPI.updateUser(this.user)
        this.$toast.success("Update successfully!")
        this.$router.push({ name: 'index' })
      } catch (error) {
        this.$toast.error(error.message)
      }
    }
  }
}
</script>

<style scoped>
label {
  display: inline-block;
  width: 100px;
  font-weight: bold;
}

.info-input {
  padding: 3px 5px;
  border-bottom: 1px solid #333;
  width: 300px;
}

textarea {
  border: 1px solid #888;
}
</style>