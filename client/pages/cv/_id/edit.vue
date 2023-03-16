<template>
    <div class="w-full h-full">
        <div class="container">
            <div class="flex justify-end !mt-[20px] !mb-[20px] gap-[10px]">
                <nuxt-link :to="{ path: '/' }" tag="button"
                    class="border-[#ff4444] rounded-[5px] bg-[#ff4444] text-white px-[15px] py-[5px">
                    Back</nuxt-link>
            </div>
            <CVBuilder class="h-full bg-white" :resume="resume" />
        </div>
    </div>
</template>

<script>
import CVBuilder from '~/components/CV/Builder/index.vue';
import axios from 'axios'

export default {
    layout: "empty",
    meta: {
        auth: { authority: 1 }
    },
    name: 'CVBuilderPage',

    components: {
        CVBuilder,
    },

    data() {
        return {
            resume: ''
        }
    },

    async fetch() {
        const res = await axios.get(`/resumes/1/load-content`)
        this.resume = res.data.content
    },

    methods: {
        async save() {
            const content = localStorage.getItem('gjsProject')
            const res = await axios.post('/resumes/1/save-content', { candidate_id: 1, content })
        }
    }
};
</script>
