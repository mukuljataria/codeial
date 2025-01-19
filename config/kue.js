const kue = require('kue');

const queue = kue.createQueue();

// const queue = kue.createQueue({
//     redis: {
//       port: 6379, // Redis port
//       host: '172.26.118.172', // Replace with the actual WSL IP address
//     },
//   });

module.exports = queue;