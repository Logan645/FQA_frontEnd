<template>
  <ValidationObserver v-slot="{ invalid }">
    會員系統
    <ValidationProvider v-slot="{ errors }" rules="required" name="檔案標題">
      <v-text-field v-model="registerUsername" label="使用者名稱" :error-messages="errors"></v-text-field>
    </ValidationProvider>
    <ValidationProvider v-slot="{ errors }" rules="required|email" name="電子信箱">
      <v-text-field v-model="registerEmail" label="email" :error-messages="errors"></v-text-field>
    </ValidationProvider>
    <ValidationProvider v-slot="{ errors }" rules="required|min:8" name="密碼">
      <v-text-field v-model="registerPassword" label="密碼" :error-messages="errors" name="password"></v-text-field>
    </ValidationProvider>
    <ValidationProvider v-slot="{ errors }" :rules="`required|ConfirmedPassword:${registerPassword}`" name="確認密碼">
      <v-text-field v-model="confirmedPassword" label="請再次輸入密碼" :error-messages="errors" ></v-text-field>
    </ValidationProvider>
    <v-btn :disabled="invalid" @click="register">註冊</v-btn><br/>
  </ValidationObserver>
</template>

<script>
  export default {
    name: 'IndexPage',
    data(){
      return{
        registerUsername:'',
        registerEmail:'',
        registerPassword:'',
        confirmedPassword:'',
      }
    },
    methods:{
      async register(){
          const registerData ={
            "name": this.registerUsername,
            "email": this.registerEmail,
            "password": this.registerPassword1
          }
          const response = await this.$axios.post("/api/register", registerData);
          console.log(response);
      },
    }
  }
</script>
