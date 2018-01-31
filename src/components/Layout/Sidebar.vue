<template>
  <div>
    <md-sidenav class="md-left md-fixed" ref="leftSidenav">
      <md-whiteframe class="md-large" md-tag="md-toolbar" md-elevation="0">
        <div class="md-toolbar-container"></div>
        <div class="md-toolbar-container">
          <h2 class="md-title">
            <template v-if="isAuthenticated && userInfo">{{userInfo.username}}</template>
          </h2>
        </div>
      </md-whiteframe>
      <md-list v-show="!isAuthenticated">
        <md-subheader>
          <span>Account</span>
        </md-subheader>
        <md-list-item>
          <md-icon>person_outline</md-icon>
          <span>
            <router-link to="/signin">Sign In</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>person_add</md-icon>
          <span>
            <router-link to="/signup">Register</router-link>
          </span>
        </md-list-item>
        
        
        <md-list-item>
          <md-icon>phone</md-icon>
          <span>
            <router-link to="/contact">Contact</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>info</md-icon>
          <span>
            <router-link to="/about">About</router-link>
          </span>
        </md-list-item>
      </md-list>
      <md-list v-show="isAuthenticated">
        <md-subheader>
          <span>Account</span>
        </md-subheader>
        <!-- <md-list-item>
          <md-icon>dashboard</md-icon>
          <span>
            <router-link class="md-clean" to="/dashboard">Dashboard</router-link>
          </span>
        </md-list-item> -->
        <md-list-item>
          <md-icon>person</md-icon>
          <span>
            <router-link to="/profile">Profile</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>subdirectory_arrow_left</md-icon>
          <span>
            <a href="#" @click="openDialog('signout')">Sign Out</a>
          </span>
        </md-list-item>
        <md-subheader>
          <span>Tasks</span>
        </md-subheader>
       
        <md-list-item>
          <md-icon>work</md-icon>
          <span>
            <router-link to="/tasks">Tasks</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>phone</md-icon>
          <span>
            <router-link to="/contact">Contact</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>info</md-icon>
          <span>
            <router-link to="/about">About</router-link>
          </span>
        </md-list-item>
      </md-list>
    </md-sidenav>

    <md-dialog-confirm md-title="Are you sure to Sign Out?" md-content=" " md-ok-text="Sign Out" md-cancel-text="Cancel" ref="signout" @close="onClose">
    </md-dialog-confirm>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'side-bar',
    props: ['open'],
    watch: {
      $route () {
        this.$refs.leftSidenav.close()
      },
      open () {
        this.$refs.leftSidenav.toggle()
      },
      isAuthenticated () {
        this.$router.push({
          path: '/'
        })
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'userInfo'])
    },
    methods: {
      ...mapActions(['signout']),
      openDialog (ref) {
        this.$refs[ref].open()
      },
      onClose (type) {
        if (type === 'ok') {
          this.signout()
        }
      }
    }
  }
</script>

<style>

</style>
