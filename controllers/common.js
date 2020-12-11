const cron = require('node-cron');

module.exports = {

	startCron: () => {

        cron.schedule('* * * * * *', () => {
            console.log('running every minute 1, 2, 4 and 5');
        });

	}	      
	  
}
