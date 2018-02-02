<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Sign In</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('userName')">
                <label for="user-name">User Name</label>
                <md-input name="user-name" id="user-name" autocomplete="given-name" v-model="form.UserName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.UserName.required">The user name is required</span>
                <span class="md-error" v-else-if="!$v.form.UserName.minlength">Invalid user name</span>
              </md-field>
            </div>
          </div>
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('Password')">
                <label for="user-name">Password</label>
                <md-input name="password" id="password" type="password" v-model="form.Password" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.Password.required">The password is required</span>
                <span class="md-error" v-else-if="!$v.form.Password.minlength">Invalid password</span>
              </md-field>
            </div>
          </div>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <router-link class="md-primary" tag="md-button" to="/signup">Don't have an account?</router-link>
          <md-button type="submit" class="md-primary" :disabled="sending">Sign In</md-button>
        </md-card-actions>
      </md-card>

      <!-- <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar> -->
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        UserName: 'aaron',
        Password: '123456zZ'
      },
      sending: false
    }),
    validations: {
      form: {
        UserName: {
          required,
          minLength: minLength(3)
        },
        Password: {
          required,
          minLength: minLength(6)
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
        return ""
      },
      ...mapActions(['signin']),
      
      clearForm () {
        this.$v.$reset()
        this.form.UserName = null
        this.form.Password = null
      },
      
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.sending = true
          this.signin(this.form)
            .catch(err => {
              console.dir(err)
              if (err.response && err.response.status === 400) {
                this.$toast.error({
                  title: 'Signin failed',
                  message: err.response.data.error_description
                })
              } else {
                this.$toast.error({
                  title: 'Error',
                  message: 'An unknown error occurred'
                })
              }
            })
            .then(()=> {
              this.sending = false
            })
        }
      }
    }
  }
</script>

<style  scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  
  .md-card{
      overflow: hidden;
      margin: 100px auto;
  }
</style>