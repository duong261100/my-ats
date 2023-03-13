<template>
    <div class="w-full h-full bg-[#eee]">
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
import mixin from '../../../components/CV/Builder/mixin';
import CVTemplate1 from '../../../components/CV/Template/Template1/index.vue';
import CVTemplate2 from '../../../components/CV//Template/Template2/index.vue';
import Outline from '../../../components/CV/Builder/Outline.vue';

export default {
    name: 'CVBuilder',
    layout: 'empty',

    components: {
        CVTemplate1,
        CVTemplate2,
        Outline,
    },

    mixins: [mixin],
};
</script>

<style lang="scss" scoped>
@import "../../../components/CV/Builder/style.scss";

#editor {
    width: 800px !important;
    height: fit-content;
}
</style>
