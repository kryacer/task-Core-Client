<template>
<input type="text" v-model="editableTags">
</template>
<script>
export default {
  props: ['value'],
  computed: {
    editableTags: {
      get () {
        return this.value.join(' ')
      },
      set (val) {
        this.$emit('input', val.split(' '))
      }
    }
  }
}
</script>
