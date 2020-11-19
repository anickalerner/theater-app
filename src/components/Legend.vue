<template lang="html">
  <section class="legend flex">
    <div class="legend-item flex flex-start"><div class="row-position chair"></div><label>Available seat</label></div>
    <div class="legend-item flex flex-start"><div class="row-position chair marked"></div><label>Selected seat</label></div>
    <div class="legend-item flex flex-start"><div class="row-position chair booked"></div><label>Reserved seat</label></div>
  </section>
</template>

<script lang="js">

  export default  {
    props: [],
    name: 'seat-legend',
    mounted () {
      gsap.to(".legend-item", 
      {x: function(index, target, targets) { //function-based value
        return index * 50 + 200; 
      }
      , stagger: 0.25, duration: 1, delay: 1});
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
