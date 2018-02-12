<template>
  <div class="page-container md-layout-column">
    
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Task Manager</span>
      
      
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <h2 class="md-title">
            <template v-if="isAuthenticated && userInfo">{{userInfo.username}}</template>
          </h2>
      </md-toolbar>
      <md-list v-show="!isAuthenticated">
        <md-subheader>
          <span>Account</span>
        </md-subheader>
        <md-list-item>
          <md-icon>person_outline</md-icon>
          <span class="md-list-item-text">
            <router-link to="/signin">Sign In</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>person_add</md-icon>
          <span class="md-list-item-text">
            <router-link to="/signup">Register</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>phone</md-icon>
          <span class="md-list-item-text">
            <router-link to="/contact">Contact</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>info</md-icon>
          <span class="md-list-item-text">
            <router-link to="/about">About</router-link>
          </span>
        </md-list-item>
      </md-list>

      <md-list v-show="isAuthenticated">
        
        <md-list-item>
          <md-icon>home</md-icon>
          <span class="md-list-item-text">
            <router-link to="/">Home</router-link>
          </span>
        </md-list-item>
        <md-subheader>
          <span>Account</span>
        </md-subheader>
        <md-list-item>
          <md-icon>person</md-icon>
          <span class="md-list-item-text">
            <router-link to="/profile">Profile</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>subdirectory_arrow_left</md-icon>
          <span class="md-list-item-text">
            <a href="#" class="md-primary md-raised" @click="active = true">Sign Out</a>
          </span>
        </md-list-item>
        <md-subheader>
          <span>Tasks</span>
        </md-subheader>
        <md-list-item>
          <md-icon>work</md-icon>
          <span class="md-list-item-text">
            <router-link to="/tasks">Tasks</router-link>
          </span>
        </md-list-item>
        <md-subheader>
          <span>Info</span>
        </md-subheader>
        <md-list-item>
          <md-icon>phone</md-icon>
          <span class="md-list-item-text">
            <router-link to="/contact">Contact</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>info</md-icon>
          <span class="md-list-item-text">
            <router-link to="/about">About</router-link>
          </span>
        </md-list-item>
      </md-list>
    </md-drawer>
      
    <!-- <md-dialog-confirm md-title="Are you sure to Sign Out?" md-content=" " md-ok-text="Sign Out" md-cancel-text="Cancel" ref="signout" @close="onClose">
    </md-dialog-confirm> -->
      <md-dialog-confirm
      :md-active.sync="active"
      md-title="Are you sure to Sign Out?"
      md-content=" "
      md-confirm-text="Ok"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
   

    <md-content>
     <transition appear :name="transitionName" mode="out-in">
        <router-view></router-view>
      </transition>
    </md-content>
    
  </div>
  
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: '',
    data: () => ({
      showNavigation: false,
      active: false,
      transitionName: null
    }),
    watch: {
      isAuthenticated () {
        this.$router.push({
          path: '/'
        })
      },
      $route (to, from) {
        this.showNavigation = false;
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (toDepth === fromDepth) {
          this.transitionName = 'slide-up'
        } else {
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
      }
    },
      computed: {
      ...mapGetters(['isAuthenticated', 'userInfo'])
    },
    methods: {
      ...mapActions(['signout']),
      onCancel () {
      },
      onConfirm () {  
        // if (type === 'ok') {
          this.signout()
        // }
      }
    }
  }
</script>

<style>

  .page-container {
    /* min-height: 300px; */
     min-height: calc(125vh - 100px - 128px - 24px); 
     /* min-height: 300px;  */
    
    background: rgb(255, 255, 255);
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }

   /* Demo purposes only*/
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  .md-layout-item.md-size-50{
    min-width: 0;
    flex: 0 1 30%;
  }
  .md-content {
    padding: 16px;
     height: 100%; 
  }

</style>

