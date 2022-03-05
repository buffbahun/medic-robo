const mqtt = require("mqtt");
let client = mqtt.connect("mqtt://broker.hivemq.com");

const https = require("http");

client.on("connect", () => {
  setInterval(() => {
    https
      .get("http://localhost:3000/med", (resp) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          if (JSON.parse(data).length !== 0) {
            let ary = JSON.parse(data);
            let send = [];
            ary.forEach((item) => {
              send.push({ bedNo: item.bedNo, med: item.medicine });
            });
            console.log(JSON.stringify(send));
            client.publish("med-time", JSON.stringify(send));
          }
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  }, 60000);
});
