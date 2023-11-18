# RAMPAGE-Redis-NodeJS
Interact with Redis 7 on your RAMPAGE.Host server.

Rent a server today: https://rampagecloud.com/store/game-hosting

# Code Example
```js
const Redis = require("@rampagecorp/redis");
const redisHost = "region.shared.rampage.host";
const redisPort = 3000;

const redisClient = new RedisClient(redisHost, redisPort);

try {
  // Set a key-value pair
  redisClient.set("example_key", "example_value");

  // Get the value by key
  const value = await redisClient.get("example_key");
  console.log(`Value for 'example_key': ${value}`);

  // Delete a key
  redisClient.delete("example_key");

  // Close the connection
  redisClient.close();
} catch (error) {
  console.error(`Error: ${error.message}`);
}
```
