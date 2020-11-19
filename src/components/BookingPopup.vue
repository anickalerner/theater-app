<template lang="html">
  <Portal to="notification-outlet">
    <transition name="custom-classes-transition" enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutUp">
    <section class="booking-popup" v-show="markedSeats.length">
      <h1>Your selected seats:</h1>
      <table class="selectedChairs">
        <thead>
          <tr>
            <th>Row</th>
            <th>Chair</th>
            <th>Price</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <transition-group name="seat-list" tag="tbody">        
          <tr v-for="(seat, ind) in markedSeats" :key="ind">
            <td>{{seat.position.row}}</td>
            <td>{{seat.position.chair}}</td>
            <td>{{seat.price}}</td>
            <td><span @click="removeRow(seat)" class="btn remove-btn" title="Remove">❌</span></td>
          </tr>
        </transition-group>
      </table>
      <button @click="bookSeats" class="btn action-btn">Book seats</button>
    </section>
    </transition>
  </Portal>
</template>

<script lang="js">
import { theaterService } from "@/services/theater.service.js";

  export default  {
    name: 'booking-popup',
    methods: {
      bookSeats(){
        this.$store.dispatch({ type: "bookSeats"});
      },
      removeRow(seat){
        this.$store.dispatch({ type: "markSeat", chair: seat, marked: false });
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
  padding: 22px 29px;
  border-radius: 16px !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px !important;
  .selectedChairs {
    width: 100%;
  }
}
button{
  display: inline-block;
  margin-top: 20px;
}
.seat-list-enter-active, .seat-list-leave-active {
  transition: all 1s;
}
.seat-list-enter, .seat-list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
