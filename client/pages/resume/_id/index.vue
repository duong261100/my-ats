<template>
    <div class="w-full h-full bg-[#eee] view">
        <div class="flex flex-col items-center">
            <div class="gjs-navbar flex justify-end items-center">
                <div class="panel__basic-actions" />
                <span class="text-primary cursor-pointer text-3xl material-icons-outlined" @click="downloadResume">
                    <v-icon class="text-xl -mt-[3px]" size="40">mdi-download-box</v-icon>
                </span>
            </div>
            <div id="editor" data-attribute="editor" class="!h-[800px] overflow-hidden mb-[50px]">
                <!-- <CVTemplate2 ref="resumeTemplate" :outline="outline" /> -->
                <component :is="resumeTemplate" ref="resumeTemplate" :outline="outline" />
            </div>
        </div>
    </div>
</template>

<script>
import mixinView from '../../../components/CV/Builder/mixinView';
import CVTemplate1 from '../../../components/CV/Template/Template1/index.vue';
import CVTemplate2 from '../../../components/CV//Template/Template2/index.vue';
import Outline from '../../../components/CV/Builder/Outline.vue';
import axios from 'axios'
export default {
    name: 'CVBuilder',
    layout: 'empty',

    components: {
        CVTemplate1,
        CVTemplate2,
        Outline,
    },

    mixins: [mixinView],

    async fetch() {
        const res = await axios.get(`/resumes/${this.$route.params.id}/load-content`)
        this.resume = res.data.content
    },
};
</script>

<style lang="scss" scoped>
@import "../../../components/CV/Builder/style.scss";



#editor {
    width: 800px !important;
    height: fit-content;
}
</style>
