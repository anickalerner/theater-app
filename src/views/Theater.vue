<template>
<section>
  <booking-popup/>
  <div class="main">
    <div class="plan">
      <div class="screen flex column flex-center">Screen this way</div>
      <div v-for="(row, rowInd) in theaterPlan" :key="rowKey(rowInd)" class="flex">
        <chair v-for="(chair, chairInd) in row" :key="chairKey(chairInd)" :chair="chair"></chair>
      </div>      
      <seat-legend />
    </div>
  </div>
  <PortalTarget name="notification-outlet"></PortalTarget>
</section>
</template>

<script lang="js">
import { theaterService } from "@/services/theater.service";
import Chair from '@/components/Chair.vue';
import SeatLegend from '@/components/Legend.vue';
//import '@/components/BookingPopup.vue';
import BookingPopup from '@/components/BookingPopup.vue';

export default {
  async created() {
    this.loadTheater();
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
    BookingPopup,
    SeatLegend
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
      width: 60%;
      height: 50px;
      background-color: red;
      margin: 0 auto 20px;
      color: white;
    }
  }  
}
</style>
