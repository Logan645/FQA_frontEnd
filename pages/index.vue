<template>
  <v-container>
    會員系統
    <ValidationObserver v-slot="{ invalid }">
      <ValidationProvider v-slot="{ errors }" rules="required|email" name="電子信箱">
        <v-text-field v-model="loginEmail" label="email" :error-messages="errors"></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required|min:8" name="密碼" vid="confirmation">
        <v-text-field v-model="loginPassword" label="密碼" :error-messages="errors" name="密碼" type="password"></v-text-field>
      </ValidationProvider>
      <v-btn :disabled="invalid" @click="login">登入</v-btn>
    </ValidationObserver>

    <ValidationObserver v-slot="{ invalid }">
      <ValidationProvider v-slot="{ errors }" rules="required" name="檔案標題">
        <v-text-field v-model="registerUsername" label="使用者名稱" :error-messages="errors"></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required|email" name="電子信箱">
        <v-text-field v-model="registerEmail" label="email" :error-messages="errors"></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required|min:8" name="密碼" vid="confirmation">
        <v-text-field v-model="registerPassword" label="密碼" :error-messages="errors" name="密碼" type="password"></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required|confirmed:confirmation" name="確認密碼" type="password">
        <v-text-field label="請再次輸入密碼" :error-messages="errors" ></v-text-field>
      </ValidationProvider>
      <v-btn :disabled="invalid" @click="register">註冊</v-btn><br/>
    </ValidationObserver>
  </v-container>
</template>

<script>
  import { mapState } from "Vuex";
  export default {
    name: 'IndexPage',
    data(){
      return{
        registerUsername:'',
        registerEmail:'',
        registerPassword:'',
        loginEmail:'',
        loginPassword:'',
      }
    },
    computed() {
      // 導入vueX狀態
      mapState(['isLoggedIn'])
    },
    methods:{
      async register(){      // 註冊
          const registerData ={
            "name": this.registerUsername,
            "email": this.registerEmail,
            "password": this.registerPassword
          }
          await this.$axios.post("/api/register", registerData);

      },
      async login(){ // 登入
        const loginData ={
          "email": this.loginEmail,
          "password": this.loginPassword
        }
        try{
          const login = await this.$store.dispatch('login',loginData)
          // const response = await this.$axios.post("/api/login", loginData);
          if(login){
            this.$router.push({ path: '/files' })
          }
        }
        catch(e){
          console.log(e);
          this.$message.error('登入失敗，請重試')
        }
      },
    },
  }
</script>
