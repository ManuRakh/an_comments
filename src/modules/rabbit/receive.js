const amqp = require('amqplib');
const commentsService = require("../comments.module/comments.service.js");
const dotenv = require("dotenv");
dotenv.config();

async function receiveMessage(exchange) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, 'fanout', { durable: false });

  const { queue } = await channel.assertQueue('', { exclusive: true });
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
  channel.bindQueue(queue, exchange, '');

  channel.consume(queue, async (msg) => {
    try {
      const parsedMessage = JSON.parse(msg.content.toString());
    
      const { action, object_type: objectType, id, ...mainObject} = parsedMessage;
      if (!action || !objectType) throw new Error("Invalid action or object type");
      console.log({action})
      if (objectType === "comments") {
        if (action === "create") await commentsService.createComment(mainObject);
        if (action === "update") await commentsService.updateComment(mainObject, id);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, {
    noAck: true
  });
}

module.exports = { receiveMessage };
