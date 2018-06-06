const express = require('express');
const router = express.Router();
const connectionTable = require('../seama_services/db_service').connectionTable;
const semaLog = require('../seama_services/sema_logger');

/* GET customers in the database. */

var attsToGrab = ["id", "address", "contact_name", "customer_type_id",
	"due_amount", "gps_coordinates", "kiosk_id", "name", "phone_number",
	"created_date", "gender"];

const sqlSiteIdOnly = "SELECT * FROM customer_account WHERE kiosk_id = ?";
const sqlStartDateOnly = "SELECT * FROM customer_account WHERE kiosk_id = ? AND created_date >= ?";
const sqlEndDateOnly = "";
const sqlStartandEndDate = "";
const sqlLastUpdated = "";

//SELECT * FROM customer_account WHERE kiosk_id = 2 AND created_date >= "2000-01-01 01:01:01"'



router.get('/', function(req, res) {
	semaLog.info('customers - Enter');


	const sessData = req.session;
	const connection = connectionTable[sessData.id];
	//let results = initResults();
	req.check("site-id", "Parameter site-id is missing").exists();


	console.log("LOG - Site-id: " + req.query['site-id']);
	req.getValidationResult().then(function(result) {
		if (!result.isEmpty()) {
			const errors = result.array().map((elem) => {
				return elem.msg;
			});
			semaLog.error("site-id VALIDATION ERROR: ", errors);
			res.status(400).send(errors.toString());
		}
		else {
			getCustomersSiteID(connection, req, res);
		}
	});
});

const getCustomersSiteID = (connection, req, res ) => {
	return new Promise((resolve, reject) => {
		connection.query(sqlSiteIdOnly, [req.query['site-id']], function(err, result) {
			if (err) {
				semaLog.error('customers - failed', { err });
				res.status(500).send(err.message);
				reject(err);
			}
			else {
				semaLog.info('customers - succeeded');

				try {
					if (Array.isArray(result) && result.length >= 1) {
						const values = result.map(item => {
							const toKeep = {};

							for (let i = 0; i < attsToGrab.length; i++) {
								toKeep[attsToGrab[i]] = item[attsToGrab[i]];
							}
							return toKeep;
						});
						resolve(res.json({ customers: values}));
					} else {
						resolve(res.json({customers: []}));
					}


				} catch(err) {
					semaLog.error('customers - failed', { err });
					res.status(500).send(err.message);
					reject(err);
				}
			}
		});
	})
}

module.exports = router;
