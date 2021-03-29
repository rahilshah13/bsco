const redis = require('redis');
const { promisify } = require("util");

const client = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379,
});

//promisify commands
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);


client.on('connect', () => {
    console.log("connected to redis");
});

client.on('error', err => {
    console.log('Error ' + err);
});

module.exports = {
    client,
    getAsync,
    setAsync,
    delAsync
}
