const redis = require('redis');
const client = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379,
});

client.on('connect', () => {
    console.log("connected to redis");
});

client.on('error', err => {
    console.log('Error ' + err);
});
