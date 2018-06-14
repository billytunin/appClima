const cron = require('node-cron');

let task = cron.schedule('* * * * *', function(){
  console.log('running a task every minute');
});

task.start();