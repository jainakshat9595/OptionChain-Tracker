const HomePageController = require('../controllers/homepage.js');
const CommonController = require('../controllers/common.js');

module.exports = (router) => {
    
    router.route('/data/:symbol').get(HomePageController.getSymbolData);
    // router.route('/data').post(HomePageController.createUser);

    CommonController.startCron();

    return router;

};