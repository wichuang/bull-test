const queue = require('./bull');
var log4js = require("log4js");
var logger = log4js.getLogger();

logger.level = "info";
const  main = async () => {
  queue.process(async (job) => { //The process function will be called every time the worker is idling and there are jobs to process in the queue
    logger.info('Consumer消費者：',job.data);
     await new Promise(r => setTimeout(r,1000))
    return Promise.resolve();
  });
}
main()