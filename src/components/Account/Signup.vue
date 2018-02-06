<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateUser">
          <md-card class="md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
              <div class="md-title">Register</div>
            </md-card-header>
    
            <md-card-content>
                    <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100">
                              <md-field :class="getValidationClass('FirstName')">
                                <label for="first-name">First Name</label>
                                <md-input name="user-name" id="user-name" autocomplete="given-name" v-model="form.FirstName" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.FirstName.required">The first name is required</span>
                                <span class="md-error" v-else-if="!$v.form.FirstName.minlength">Invalid first name</span>
                              </md-field>
                            </div>
                          </div>
                          <div class="md-layout md-gutter">
                                <div class="md-layout-item md-small-size-100">
                                  <md-field :class="getValidationClass('lastName')">
                                    <label for="last-name">Last Name</label>
                                    <md-input name="last-name" id="last-name" autocomplete="given-name" v-model="form.LastName" :disabled="sending" />
                                    <span class="md-error" v-if="!$v.form.LastName.required">The last name is required</span>
                                    <span class="md-error" v-else-if="!$v.form.LastName.minlength">Invalid last name</span>
                                  </md-field>
                                </div>
                              </div>
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
              <md-field :class="getValidationClass('email')">
                    <label for="email">Email</label>
                    <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.Email" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.Email.required">The email is required</span>
                    <span class="md-error" v-else-if="!$v.form.Email.email">Invalid email</span>
                  </md-field>
              

            <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('Password')">
                    <label for="password">Password</label>
                    <md-input name="password" id="password" type="password" v-model="form.Password" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.Password.required">The password is required</span>
                    <span class="md-error" v-else-if="!$v.form.Password.minlength">Invalid password</span>
                  </md-field>
                </div>
              </div>
              <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('Password')">
                        <label for="user-name">Confirm Password</label>
                        <md-input name="password" id="password" type="password" v-model="form.ConfirmPassword" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.Password.required">The password is required</span>
                        <span class="md-error" v-else-if="!$v.form.Password.minlength">Invalid password</span>
                      </md-field>
                    </div>
                  </div>
            </md-card-content>
    
            <md-progress-bar md-mode="indeterminate" v-if="sending" />
    
            <md-card-actions>
            <router-link class="md-primary" tag="md-button" to="/signin">Already have an account?</router-link>
              <md-button type="submit" class="md-primary" :disabled="sending">Register</md-button>
            </md-card-actions>
          </md-card>
    
          <md-snackbar :md-active.sync="userSaved">The user {{ form.UserName }} was registered with success!</md-snackbar>
        </form>
      </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        FirstName: 'Askhat',
        LastName: 'Tuyenbayev',
        UserName: 'kryacer',
        Email: 'tm.askhat@gmail.com',
        Password: '123456zZ',
        ConfirmPassword: '123456zZ'
      },
      sending: false,
      userSaved: false,
    }),
    validations: {
      form: {
        FirstName: {
          required,
          minLength: minLength(3)
        },
        LastName: {
          required,
          minLength: minLength(3)
        },
        UserName: {
          required,
          minLength: minLength(3)
        },
        Password: {
          required,
          minLength: minLength(6)
        },
        Email: {
          required,
          email
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
      ...mapActions(['signup']),
      
      clearForm () {
        this.$v.$reset()
        this.form.FirstName = null
        this.form.LastName = null
        this.form.UserName = null
        this.form.Email = null
        this.form.Password = null
        this.form.ConfirmPassword = null
      },
      
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.sending = true

          this.signup(this.form)
            .catch(err => {
              console.dir(err)
              if (err.response && err.response.status === 400) {
                this.$toast.error({
                  title: err.response.statusText,
                  timeOut: 2500,
                    message: err.response.data.ModelState[''][0]
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
              this.userSaved = true
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
      margin: 0 auto;
  }
</style>