const mqtt = require("mqtt");
let client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  client.subscribe("med-time");
  console.log("client suscribed successfully");
});

client.on("message", (topic, message) => {
  console.log(message.toString());
});
