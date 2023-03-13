<template>
    <div id="editor" class="border">
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Job Pro</title>
                <link
                    rel="stylesheet"
                    href="http://localhost:3000/templates/template1.css"
                >
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined"
                >
            </head>
            <body>
                <div class="wrapper">
                    <div class="resume">
                        <div class="left">
                            <div class="img_holder">
                                <img src="https://loremflickr.com/640/480">
                            </div>
                            <div class="contact_wrap pb">
                                <div class="title">Contact</div>
                                <div class="contact">
                                    <ul>
                                        <li>
                                            <div class="li_wrap">
                                                <div class="icon">
                                                    <span class="material-icons-outlined">call</span>
                                                </div>
                                                <div class="text">phone_number</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="li_wrap">
                                                <div class="icon">
                                                    <span class="material-icons-outlined">email</span>
                                                </div>
                                                <div class="text">email</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="li_wrap">
                                                <div class="icon">
                                                    <span class="material-icons-outlined">location_on</span>
                                                </div>
                                                <div class="text">address</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="skills_wrap pb">
                                <div class="title">Skills</div>
                                <div class="contact">
                                    <ul>
                                        <li>
                                            <div class="li_wrap">
                                                <div class="text">English</div>
                                            </div>
                                            <div class="li_wrap">
                                                <div class="text">Communication</div>
                                            </div>
                                            <div class="li_wrap">
                                                <div class="text">Time management</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="header">
                                <div class="name_role">
                                    <div class="name">name</div>
                                    <div class="role">PHP Dev</div>
                                </div>
                                <div class="about">description</div>
                            </div>
                            <div class="right_inner">
                                <!-- <div v-for="(item, index) in outline" :key="index">
                                    <component
                                        :is="item"
                                    />
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    </div>
</template>

<script>
    import Description from './Description.vue';
    import Education from './Education.vue';
    import Experience from './Experience.vue';
    import Certification from './Certification.vue';

    export default {
        name: 'CVTemplate1',

        components: {
            Description,
            Education,
            Experience,
            Certification,
        },

        props: {
            // outline: {
            //     type: Array,
            //     required: true,
            // },
        },
    };
</script>
