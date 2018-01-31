import Vue from 'vue'
import VeeValidate from 'vee-validate'


/*
const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'en',
  dictionary: null,
  strict: true
}




*/
// VeeValidate.Validator.updateDictionary(dictionary)

// VeeValidate.dictionary.merge({
//   en: {
//         attributes: {
//           Email: 'Email Address',
//           UserName: 'Username',
//           password: 'Password',
//           confirmPassword: 'Confirm Password'
//         }
//   }
// });

// const message = this.$validator.dictionary.getMessage('en', 'credentials');
// this.errors.add('credentials', message); // this message i want to move to the dictionary
Vue.use(VeeValidate)
