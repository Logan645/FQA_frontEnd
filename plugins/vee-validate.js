import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  localize,
} from 'vee-validate/dist/vee-validate.full'
import zhTW from 'vee-validate/dist/locale/zh_TW.json'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
localize('zh_TW', zhTW)