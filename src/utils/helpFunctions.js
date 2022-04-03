import axios from "axios";
import localforage from "localforage";

export const getFromDB = key => {
    return new Promise((resolve, reject) => {
        localforage.getItem(key).then(value => {
            resolve(value);
        }).catch(function(err) {
            console.log(err);
            reject(err);
        });
    });
}

export const updateDB = (key, value) => {
    localforage.setItem(key, value)
    .catch(function(err) {
        console.log(err);
    });
}

export const getData = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(function (response) {
            resolve(response);
        }).catch(function (error) {
            reject(error);
        });
    });
}

export const sendData = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
        .then(function (response) {
            resolve(response);
        }).catch(function (error) {
            reject(error);
        });
    });
    
}