// plugins/vue-google-oauth2.js
// file name can be changed to whatever you want
import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId:
    '724953140197-6nmrq14e01431303c29hh1j5re98jb0q.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
  fetch_basic_profile: false,
}
Vue.use(GAuth, gauthOption)
