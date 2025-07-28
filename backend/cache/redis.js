const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: 'localhost',
    port: 6000
  }
});

redisClient.on('error', (err) => console.error('Redis Error:', err));

async function connectRedis() {
  await redisClient.connect();
  console.log('✅ Redis connected');
}

connectRedis();

module.exports = redisClient;
