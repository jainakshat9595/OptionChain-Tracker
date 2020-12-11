const symbolData = require('../models/symbolData.js');

module.exports = {

	getSymbolData : (req, res) => {

		let _result = {
			status: 400,
			data: {},
			message: 'Bad request'
		}

		symbolData.getAll((err, data_tag) => {
			
			// if(err) {
			// 	console.log('Homepage.js > getHomePageContent > getPopularTags', 'error', req.body, err);

			// 	let __result = {
			// 		..._result,
			// 		status: 500,
			// 		message: 'Internal server error'
			// 	};
			// 	return res.status(__result.status).send(__result);
			// }
			// else {
				
			// 	Webinar.getHeroBanner((err, data_webinar) => {

			// 		if(err) {
			// 			console.log('Webinar.js > getHerobanner', 'error', req.body, err);

			// 			let __result = {
			// 				..._result,
			// 				status: 500,
			// 				message: 'Internal server error'
			// 			};
			// 			return res.status(__result.status).send(__result);
			// 		}
			// 		else {
			// 			let __result = {
			// 				..._result,
			// 				status: 200,
			// 				data: {
			// 					highlightedTags: [
			// 						...data_tag
			// 					],
			// 					heroBannerItems: [
			// 						...data_webinar
			// 					]
			// 				},
			// 				message: 'Content fetched successfully.'
			// 			};

			// 			return res.status(__result.status).send(__result);

			// 		}

			// 	});

			// }

		});


	}
}