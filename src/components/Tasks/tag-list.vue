<template> 
<div class="tagBlock">
  <span v-for="(tag, index) in value" :key="tag" class="spanTag" >
    {{tag}}
    <button @click="remove(index)" class="tagClose">x</button>
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
<style>
.spanTag{
  margin-right: 2px;
  border-radius: 15px;
  background-color: #5d6aef;
  padding: 3px;
  color: white;
}
.tagClose{
  /* height: 7px;
  padding: 2px;
  top:1px;
  width:1px; */
  background-color: #8b90c1;
  border-radius: 30px;
  border: 0px;
  font-size: 14px;
  color: white;
}
.tagBlock{
  margin: -20px 0 0 -4px;
}
</style>