import { dbService } from './db.service.js';
import { utils } from './utils.service.js';

const KEY = 'theater';
const basePrice = 2;
const gTheaterPlan = [
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1]
];


export const theaterService = {
    query,
    saveSeat,
    saveSeats,
    getSeat,
    getFromPos,
    emptySeat,
    createSeat
}

async function query() {
    var theater = await dbService.query(KEY);
    if (!theater || !theater.length) {
        theater = createSeats();
        await dbService.insert(KEY, theater);
    }
    return theater;
}

function createSeats() {
    return gTheaterPlan.map((row, rowIndex) =>
        row.map((chair, chairIndex) =>
            chair ? createSeat(rowIndex+1, chairIndex+1) : null
        )
    );
}

function createSeat(rowInd, colInd) {
    const position = {
        row: rowInd,
        chair: colInd
    };
    return {
        id: utils.getRandomId(),
        position,
        available: true,
        marked: false,
        price: getPrice(position)
    }
}

function getPrice({row, chair}) {
    const rows = gTheaterPlan.length;
    var chairPrice = basePrice;
    // The theater floor is divided to three tiers. 
    // Middle tier is the most expensive - base * 2,
    // first third is base * 1.5, farthers third is base * 1;
    if (row / rows <= 1) { //first tier
        chairPrice *= 1.5;
    }
    else if (row / rows <= 2) { // second tier
        chairPrice *= 2;
    }
    // Chairs at the edges of a row get 25% discount
    const rowLength = gTheaterPlan[0].length;
    if (chair < rowLength * 0.25 || chair > rowLength * 0.75) {
        chairPrice *= 0.75;
    }
    return Math.round(chairPrice);
}

async function getSeat(pos) {
    return await dbService.get(KEY, pos);
}

function getFromPos(pos){
    return gTheaterPlan[pos.row-1][pos.chair-1];
}

async function saveSeat(seat) {
    return dbService.post(KEY, seat);
}

async function saveSeats(seats) {
    console.log(seats);
    return dbService.postBulk(KEY, seats);
}


function emptySeat(pos) {
    return dbService.post(KEY, createSeat(pos.row, pos.chair));
}