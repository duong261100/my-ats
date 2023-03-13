<template>
    <div class="resume_item resume_work">
        <div class="title">
            <p class="bold">
                Experience
            </p>
        </div>
        <ul>
            <li v-for="i in 1">
                <div class="date">date</div>
                <div class="info" style="margin-bottom: 10px;">
                    <h4>company_name</h4>
                    <p>position</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'ExperiencePart',

    methods: {
        // getDate(experience) {
        //     const startDate = moment(this.$get(experience, 'start_date')).format('DD/MM/YYYY');
        //     const endDate = experience.end_date ? moment(experience.end_date).format('DD/MM/YYYY') : 'now';

        //     return `${startDate} - ${endDate}`;
        // },
    },
};
</script>
