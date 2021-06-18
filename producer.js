const queue = require('./bull');
const random = require("random-string")
var log4js = require("log4js");
var logger = log4js.getLogger();

logger.level = "info";
queue.on('global:progress', function(jobId, progress) {
  logger.info(`Job ${jobId} is ${progress * 100}% ready!`);
});
queue.on('global:completed', jobId => {
  logger.info(`Job with id ${jobId} has been completed`);
})
const  main = async () => {
  for(let i=0;i<10;i++){
    const job = await queue.add({ //job producer is simply some Node program that adds jobs to a queue
      key: random(10)
    },{
      delay:5000
    });
    logger.info("Producer生產者:",job.data,await queue.count())
  }
}
main()