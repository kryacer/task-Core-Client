<template>
  <div>
      <p>
          <a class="pull-right" href="#" @click.stop.prevent="goBack()">Go Back</a>
        </p>
    <form novalidate class="md-layout" @submit.prevent="validateTask">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Add Task</div>
        </md-card-header>

        <md-card-content>
                <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                          <md-field :class="getValidationClass('UserName')">
                            <label for="name">Name</label>
                            <md-input name="name" id="name" autocomplete="given-name" v-model="form.Name" :disabled="sending" />
                            <span class="md-error" v-if="!$v.form.Name.required">The name is required</span>
                            <span class="md-error" v-else-if="!$v.form.Name.minlength">Invalid name</span>
                          </md-field>
                        </div>
                      </div>

                      <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                          <md-field :class="getValidationClass('UserName')">
                            <label for="Description">Description</label>
                            <md-textarea name="Description" id="Description" autocomplete="Description" v-model="form.Description" :disabled="sending" />
                            <span class="md-error" v-if="!$v.form.Description.required">The Description is required</span>
                            <span class="md-error" v-else-if="!$v.form.Description.minlength">Invalid description</span>
                          </md-field>
                        </div>
                      </div>
                      
                      <!-- <label for="IsDone" style="display:inline-flex;">Mark as done:</label>
                            <md-checkbox style="display:inline-flex;" v-model="form.IsDone"></md-checkbox> -->
                      
                      <div>
                        <label>DeadLine</label>
                        <md-datepicker v-model="form.DeadLine" />
                      </div>
                        
                      <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                          <md-field>
                            <label>Tags (space separated)</label>
                            <tag-input v-model="form.Tags" :disabled="sending"></tag-input>
                            
                          </md-field>
                          <tag-list v-model="form.Tags" style="padding: 5px 0" :disabled="sending"></tag-list>
                        </div>
                      </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Add</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="taskSaved">The task {{ form.Name }} was added successfully!</md-snackbar>
    </form>
  </div>
  
</template>
<script>
  import tasks from 'services/tasks'
  import tagInput from 'components/Tasks/tag-input.vue'
  import tagList from 'components/Tasks/tag-list.vue'
  // import account from 'services/account'
 // import { mapState } from 'vuex'
  // import Datepicker from 'vuejs-datepicker'

  // import Datepicker from 'vuejs-datepicker'

  // import moment from 'moment'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    components: {
       tagInput, tagList
    },
    data: ()=> ({
      form: {
          Name: '',
          Description: '',
          // IsDone: false,
          DeadLine: '',
          Tags: []
        },
        sending: false,
        taskSaved: false
    }),
    validations: {
      form: {
        Name: {
          required,
          minLength: minLength(3)
        },
        Description: {
          required,
          minLength: minLength(3)
        }
      }
    },
    computed:{
      
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      },
      // getDateToday () {
      //   return new Date()
      // },
      // getDateYesterday () {
      //   const myDate = new Date()
      //   return new Date(myDate.setTime(myDate.getTime() - 1 * 86400000))
      // },
      // getDateWeek () {
      //   const myDate = new Date()
      //   return new Date(myDate.setTime(myDate.getTime() + 7 * 86400000))
      // },
      
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
        return ""
      },
      validateTask () {
        this.form.Tags = tasks.tagsFilter(this.form.Tags)
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.sending = true
          // tasks
          //   .create(this.form)
          //   .then(() => {
          //     this.$router.push({
          //       path: '/tasks'
          //     })
          //   })
          //   .catch(err => {
          //     this.$toast.error({
          //       title: err.response.data.Message,
          //       message: err.response.data.ModelState
          //     })
          //   })
          //   .then(() => {
          //     this.sending = false
          //     this.taskSaved = true
          //   })
          
          tasks.create(this.form)
            .catch(err => {
              this.$toast.error({
                title: err.response.data.Message,
                message: err.response.data.ModelState
              })
            })
            .then(() => {
              this.sending = false
              this.taskSaved = true
              this.$router.push({
                path: '/tasks'
              })
            })
            
        }
      }
    }
  }
</script>
<style scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  
  .md-card{
      overflow: hidden;
      margin: 0 auto;
  }
</style>