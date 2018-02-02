<template>
  <md-layout md-gutter>
    <md-layout></md-layout>
    <md-layout md-flex-large="33" md-flex-medium="50" md-flex-small="75" md-flex-xsmall="100">

      <md-whiteframe md-tag="section" class="form">
        <md-progress class="md-accent" :class="{'hidden': !state.loading}" md-indeterminate></md-progress>
        <div class="form-container">
          <h1>
            <span>Add Task</span>
            <br/>
        
          </h1>
          <md-input-container :class="{'md-input-invalid': errors.has('Name')}">
            <label>Name</label>
            <md-input name="Name"  data-vv-name="Name" data-vv-rules="required" type="Name" v-model="task.Name" v-validate :disabled="state.loading"></md-input>
            <span class="md-error">{{errors.first('Name')}}</span>
          </md-input-container>

          <md-input-container :class="{'md-input-invalid': errors.has('Description')}">
            <label>Description</label>
            <md-input name="Description"  data-vv-name="Description" data-vv-rules="required" type="Description" v-model="task.Description" v-validate :disabled="state.loading"></md-input>
            <span class="md-error">{{errors.first('Description')}}</span>
          </md-input-container>
          
          <label class="label">Tags (space separated)</label>
          <tag-input v-model="task.tags" class="input"></tag-input>
          <tag-list v-model="task.tags" style="padding: 5px 0"></tag-list>
          <!-- <md-input-container :class="{'md-input-invalid': errors.has('UserName')}">
            <label>Tag</label>
            <md-input name="UserName"  data-vv-name="UserName" data-vv-rules="required" type="UserName" v-model="credentials.UserName" v-validate :disabled="state.loading"></md-input>
            <span class="md-error">{{errors.first('UserName')}}</span>
          </md-input-container> -->
          
          <md-button class="md-raised md-accent" id="btnSubmit" @click.native="formValidate" :disabled="state.loading">Add</md-button>
        </div>
        
      </md-whiteframe>
    </md-layout>
    <md-layout></md-layout>
  </md-layout>
</template>
<script>
  import tasks from 'services/tasks'
  import tagInput from 'components/Management/Tasks/tag-input.vue'
  import tagList from 'components/Management/Tasks/tag-list.vue'
  // import account from 'services/account'
 // import { mapState } from 'vuex'
  import Datepicker from 'vuejs-datepicker'
  // import moment from 'moment'

  export default {
    name: 'task-create',
    components: {
      Datepicker, tagInput, tagList
    },
    data () {
      return {
        state: {
          loading: false
        },
        task: {
          Name: 'asdw',
          Description: 'wqrqt',
          UserId: null,
          tags: []
        }
        
      }
    },
    computed:{
      userinfo () {
        return this.$store.getters.userInfo || {}
      }
    },
    methods: {
      getDateToday () {
        return new Date()
      },
      getDateYesterday () {
        const myDate = new Date()
        return new Date(myDate.setTime(myDate.getTime() - 1 * 86400000))
      },
      getDateWeek () {
        const myDate = new Date()
        return new Date(myDate.setTime(myDate.getTime() + 7 * 86400000))
      },
      formValidate (event) {
        event.preventDefault()

        this.$validator.validateAll().then(success => {
          if (!success) return
          this.state.loading = true
            this.task.UserId = this.userinfo.id
          tasks
            .create(this.task)
            .then(() => {
              this.$router.push({
                path: '/tasks'
              })
            })
            .catch(err => {
              this.$toast.error({
                title: err.response.data.Message,
                message: err.response.data.ModelState
              })
            })
            .then(() => {
              this.state.loading = false
            })
        })
      }
    },
    created () {
      // this.Task.DateDue = this.getDateWeek()
        
      

      // account
      //   .getUsers()
      //   .then(res => {
      //     this.Catalog.Users = res.data
      //   })
      //   .catch(() => {
      //     this.$toast.error({
      //       title: 'Error',
      //       message: 'Unable to fetch users list'
      //     })
      //   })
    }
    
  }
</script>
