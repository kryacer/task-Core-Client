<template> 
<div>
  <span v-for="(tag, index) in value" :key="tag" class="tag is-info" style="margin-right: 2px">
    {{tag}}
    <button @click="remove(index)"></button>
  </span>
</div>
</template>
<script>
export default {
  props: ['value'],
  methods: {
    remove (index) {
      const clonedValue = this.value.slice()
      clonedValue.splice(index, 1)
      this.$emit('input', clonedValue)
    }
  }
}
</script>
