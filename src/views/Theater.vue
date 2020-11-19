<template>
<section>
  <booking-popup/>
  <div class="main">
    <div class="plan">
      <div class="screen flex column flex-center">Screen this way</div>
      <div v-if="!theaterPlan">
        <loading-component/>
      </div>
        
      <transition name="fade">
        <div v-if="theaterPlan">
          <div v-for="(row, rowInd) in theaterPlan" :key="rowKey(rowInd)" class="flex">
            <chair v-for="(chair, chairInd) in row" :key="chairKey(chairInd)" :chair="chair"></chair>
          </div>      
          <seat-legend />
        </div>
      </transition>
     
    </div>
  </div>
  <PortalTarget name="notification-outlet"></PortalTarget>
</section>
</template>

<script lang="js">
import { theaterService } from "@/services/theater.service";
import Chair from '@/components/Chair.vue';
import SeatLegend from '@/components/Legend.vue';
import LoadingComponent from '@/components/LoadingComponent.vue'

export default {
  async created() {
    this.loadTheater();
  },
  data: function(){
    return {show: false}
  },
   mounted(){
    gsap.to(".screen", {backgroundColor: "#FF385C", borderRadius: 15, width: "60%", duration: 2, delay: 1 })
  },
  methods: {
    async loadTheater() {
      this.$store.dispatch({ type: "loadTheater" });
    },
    rowKey(ind){
      return 'row-' + ind;
    },
    chairKey(ind){
      return 'chair-' + ind;
    }
  },
  computed:{
    theaterPlan(){
      return this.$store.getters.theater;
    }
  },
  components: {
    Chair,
    BookingPopup: () => import('@/components/BookingPopup.vue'),
    SeatLegend,
    LoadingComponent
  },

}
</script>
<style lang="scss">
.main {
  display: flex;
  justify-content: center;
  .plan {
    display: flex;
    flex-direction: column;
    
    .screen{
      
      min-width: 400px;
      height: 50px;
      margin: 0 auto 20px;
      color: white;
      background-color: white;
    }
  }  
}
.fade-enter-active{
  transition: opacity .7s;
}
.fade-enter{
  opacity: 0;
}
</style>
