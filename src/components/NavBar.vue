<template>
  <v-app-bar
    class="app-bar--primary-border primary--text"
    color="white"
    clipped-left
    flat
    app
  >
    <v-app-bar-nav-icon
      class="primary--text"
      v-if="showNavIcon"
      @click="toggleDrawer()"
      ></v-app-bar-nav-icon>
    <v-toolbar-title>
        <router-link to="/" tag="span">
            <span class="toolbar-title--app">{{ this.title }}</span>
        </router-link>
    </v-toolbar-title>
  </v-app-bar>
</template>


<script>
  import store from '@/store'
  
  export default {
    data() {
      return {
          title: 'V O J A R O'
      }
    },
    methods: {
      toggleDrawer() {
        this.$store.commit(`shared/toggleDrawer`)
      }
    },
    computed: {
      showNavIcon() {
        return store.getters['auth/isAuthenticated']
      }
    }
  }
</script>

<style lang="sass">
  .app-bar--primary-border .v-toolbar__content
    border-bottom: 3px solid var(--v-primary-base)

  .toolbar-title--app
    cursor: pointer
    font-weight: 500
    -webkit-user-select: none
    -moz-user-select: none
    -ms-user-select: none
    user-select: none
</style>