<template lang="html">
  <section class="loading-component">
     <img :src="image"/>
  </section>
</template>

<script lang="js">
  import image from "@/assets/img/loading2.gif"  
  export default  {
    name: 'loading-component',
    data: function () {
      return {
          image: image
      }
    }
}
</script>

<style scoped lang="scss">
.loading-component img{
  width: 50px
}
</style>
