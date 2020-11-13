
import {theaterService} from '@/services/theater.service.js';


export default {
    state: {
        theater: null,
        marked: []
    },
    getters: {
        theater(state){
            return state.theater;
        },
        markedSeats(state){
            return state.marked
        }
    },
    mutations: {
        setTheater(state, { theater }) {
            state.marked = [];
            state.theater = theater
            state.theater.forEach(row => {
                row.forEach(chair => chair?.marked && state.marked.push(chair))
            });
        },
        emptySeat(state, { pos }) {
            theaterService.createSeat(pos.row, pos.chair);
        },
        markSeat(state, { chair, marked }) {
            chair.marked = marked;
            var markedSeats = !state.marked ? [] : state.marked.slice();
            if (marked){
                markedSeats.push(chair);
            }
            else{
                markedSeats = markedSeats.filter(chair => chair.marked);
            }
            state.marked = markedSeats;
        },
        bookSeats(state) {
            state.marked.forEach(chair=>{
                chair.available = false;
                chair.marked = !chair.marked;
            });
            state.marked = [];
        }
    },
    actions: {
        loadTheater(context) {
            setTimeout(async () => { 
                const theater = await theaterService.query();
                context.commit({ type: 'setTheater', theater })
            }, 1000);
        },
        async emptySeat({ commit }, { pos }) {
            commit({ type: 'emptySeat', pos })
            await theaterService.emptySeat(pos)
        },
        async markSeat({commit}, {chair, marked}){
            commit({ type: 'markSeat', chair, marked })
            return await theaterService.saveSeat(chair);
        },
        async bookSeats({ commit }){
            var seats = this.getters.markedSeats.slice();
            commit({ type: 'bookSeats' })
            return await theaterService.saveSeats(seats);
        },
        async saveSeat({ commit }, { seat }) {
            const savedSeat = await theaterService.saveSeat(seat)
            commit({ type: 'saveSeat', seat: savedSeat })
            return savedSeat
        }
    },
    modules: {}
}