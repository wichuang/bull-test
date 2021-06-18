const Queue = require('bull');
const queue = new Queue('nike', {
  redis: {
    port: 6379,
    host: '127.0.0.1',
    db: 3,
    password: null
  },
  prefix: 'nike_',
  defaultJobOptions: {
    attempts: 1,
    removeOnComplete: true,
    backoff: false,
    delay: 0
  },
  limiter: {
    max: 200000,
    duration: 1000
  },
  settings: {
    maxStalledCount: 1,
    guardInterval: 1, // 重新调度延迟
    retryProcessDelay: 500, // delay before processing next job in case of internal error.
  // drainDelay: 50000 // 空队列时brpoplpush的等待时间
  }
});
module.exports = queue;