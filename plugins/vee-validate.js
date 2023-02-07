import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend,
} from 'vee-validate/dist/vee-validate.full'
import zhTW from 'vee-validate/dist/locale/zh_TW.json'
// import { extend } from 'vee-validate'; // 看起來未順利引入

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
localize('zh_TW', zhTW)

extend('ConfirmedPassword', {
  validate(value, {args}){
    console.log('value:'+value);
    console.log('args:'+args);
    return value === args;
  },
  params:['args'],
  message: "密碼不同，請重新輸入"
});