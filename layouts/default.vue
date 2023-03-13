<template>
  <v-app dark>
    <v-app-bar  :absolute="!fixed" app>
      <v-spacer />
      <v-btn  to="/" icon>
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title>部門文件管理系統</v-toolbar-title>
      <v-spacer />
      <v-btn v-if="isLoggedIn" icon to="/files">
        文件
      </v-btn>
      <v-btn v-if="isLoggedIn" icon to="/departments">
        部門
      </v-btn>
      <v-btn v-if="isLoggedIn" icon @click="logout">
        登出
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt /> <!-- 各頁部件會出現的地方 -->
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed:{
    ...mapState(['isLoggedIn'])
  },
  methods:{
    // 登出
    logout(){
      this.$store.dispatch('logout')
      this.$router.push({ path: '/' })
    }
  }
}
</script>
