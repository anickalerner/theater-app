<template lang="html">
  <Portal to="notification-outlet">
    <section class="booking-popup" v-show="markedSeats.length">
      <h1>Your selected seats:</h1>
      <table class="selectedChairs">
        <thead>
          <tr>
            <th>Row</th>
            <th>Chair</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(seat, ind) in markedSeats" :key="ind">
            <td>{{seat.position.row}}</td>
            <td>{{seat.position.chair}}</td>
            <td>{{seat.price}}</td>
          </tr>
        </tbody>
      </table>
      <button @click="bookSeats">Book seats</button>
    </section>
  </Portal>
</template>

<script lang="js">
import { theaterService } from "@/services/theater.service.js";

  export default  {
    props: [],
    name: 'booking-popup',
    created(){
      console.log('created');
    },
    methods: {
      bookSeats(){
        this.$store.dispatch({ type: "bookSeats"});
      }
    },
    computed: {
      markedSeats(){
        return this.$store.getters.markedSeats;
      }
    }
}


</script>

<style scoped lang="scss">
.booking-popup {
  position: absolute;
  right: 70px;
  top: 70px;
  margin-left: 50px;
  padding: 10px;
  border-radius: 16px !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px !important;
  .selectedChairs {
    width: 100%;
  }
}
</style>
