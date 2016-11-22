<template>
  <i @click="back" class="fa fa-long-arrow-left back" aria-hidden="true"></i>
</template>
<style>
</style>
<script>

  export default{
    data () {
      return {}
    },
    methods: {
      back: function() {
        history.go(-1);
      }
    }
  }
</script>
