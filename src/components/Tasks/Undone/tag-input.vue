<template>
<!-- <input type="text" v-model="editableTags"> -->
<md-input type="text" name="tags" id="Tags" autocomplete="tags" v-model="editableTags" />
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
