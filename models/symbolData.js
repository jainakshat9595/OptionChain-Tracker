const db = require('../database/index.js');

const symbolData = {};

// symbolData.getPopularTags = (result) => {
// 	db.query('select id, name, icon_file, slug from tags LIMIT 5 ',(err, res) => {
// 		if (err) {
// 			result(err, null);
// 			return;
// 		}
		
// 		result(null, res);
//   	});
// };

symbolData.getAll = () => new Promise((resolve, reject) => {
	
	db.query(`
		SELECT
			*
		FROM
			tags
		;  
	`,)
	.then((result, fields) => {
		resolve(result);
	})
	.catch(err => reject(err))

});

// symbolData.getIdBySlug = (slug) => new Promise((resolve, reject) => {
	
// 	db.query(`
// 		SELECT
// 			id
// 		FROM
// 			tags
// 		WHERE
// 			slug = ?
// 		;  
// 	`, [
// 		slug
// 	])
// 	.then((result) => {
// 		resolve(result);
// 	})
// 	.catch(err => reject(err))

// });

module.exports = symbolData;