<template lang="html">
  <section class="legend flex flex-start">
    <div class="row-position chair"></div><label>Available seat</label>
    <div class="row-position chair marked"></div><label>Selected seat</label>
    <div class="row-position chair booked"></div><label>Reserved seat</label>
  </section>
</template>

<script lang="js">

  export default  {
    props: [],
    name: 'seat-legend',
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style lang="scss">
  label{
    padding: 4px 10px 0;
  }
</style>
