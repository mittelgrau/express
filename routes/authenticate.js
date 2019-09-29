const express = require('express');
const router = express.router();
const argon2 = require('argon2');
const dotenv = require('dotenv');

async function decrypt(password){
    try {
        return verify = await argon2.verify(process.env.PASSWORD, password);
    } catch(err){
        return error;
    }
}