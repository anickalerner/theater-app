'use strict';

import {utils} from './utils.service.js';

export const dbService = {
    query,
    get,
    post,
    postBulk,
    insert
}

function query(collectionName) {
    var collection = utils.loadFromStorage(collectionName);
    if (!collection) collection = [];
    return Promise.resolve(collection);
}

async function get(collectionName, pos) {
    var collection = await query(collectionName);
    return collection[pos.row-1][pos.chair-1];
}

async function post(collectionName, item) {
    //console.log(item);
    var collection = await query(collectionName);
    const pos = item.position;
    collection[pos.row-1][pos.chair-1] = item;
    utils.storeToStorage(collectionName, collection);
    return Promise.resolve(item);
}

async function postBulk(collectionName, items) {
    //console.log(item);
    var collection = await query(collectionName);
    items.map(item=>{
    const pos = item.position;
    collection[pos.row-1][pos.chair-1] = item;
    });
    utils.storeToStorage(collectionName, collection);
    return Promise.resolve(items);
}

async function insert(collectionName, items) {
    var collection = await query(collectionName);
    collection.push(...items);    
    utils.storeToStorage(collectionName, collection);
    return Promise.resolve();
}