<template lang="html">
  <div :class="positionClass(chair)" class="row-position" @click="markSeat()"></div>
</template>

<script lang="js">

  export default  {
    props: ["chair"],
    methods: {
      positionClass(chair){
        return{
          'chair': chair,
          'empty': !chair,
          'marked': chair && chair.marked && chair.available,
          'booked': chair && !chair.available
        }
      },
      markSeat(){
        if (!this.chair.available) return;
        this.$store.dispatch({ type: "markSeat", chair: this.chair, marked: !this.chair.marked });
        // setTimeout(() => {
        //   this.chair.marked && this.$store.dispatch({ type: "markSeat", chair: this.chair, marked: false });
        // }, 10000);
      }
    }
}
</script>