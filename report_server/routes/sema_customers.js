const express = require('express');
const router = express.Router();
const connectionTable = require('../seama_services/db_service').connectionTable;
const semaLog = require('../seama_services/sema_logger');

/* GET customers in the database. */

var attsToGrab = ["id", "address", "contact_name", "customer_type_id",
	"due_amount", "gps_coordinates", "kiosk_id", "name", "phone_number",
	"created_date", "gender", "updated_date"];

const sqlSiteIdOnly = "SELECT * " +
	"FROM customer_account " +
	"WHERE kiosk_id = ?";
const sqlStartDateOnly = "SELECT * " +
	"FROM customer_account " +
	"WHERE kiosk_id = ? " +
	"AND created_date >= ?";
const sqlEndDateOnly = "SELECT * " +
	"FROM customer_account " +
	"WHERE kiosk_id = ? " +
	"AND created_date <= ?";
const sqlStartEndDate = "SELECT * " +
	"FROM customer_account " +
	"WHERE kiosk_id = ? " +
	"AND created_date BETWEEN ? AND ?";
const sqlUpdateDateOnly = "SELECT * " +
	"FROM customer_account " +
	"WHERE kiosk_id = ? " +
	"AND updated_date >= ?";
//const sqlLastUpdated = "SELECT * FROM customer_account WHERE kiosk_id = ? AND ";

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
			if (req.query.hasOwnProperty("begin-date") && req.query.hasOwnProperty("end-date")) {
				console.log("LOG: ", "Begin and End")
				getCustomersStartEndDate(connection, req, res);
			}
			else if (req.query.hasOwnProperty("begin-date")) {
				getCustomersStartDateOnly(connection, req, res);
				console.log("LOG: ", "Begin");
			}
			else if (req.query.hasOwnProperty("end-date")) {
				getCustomersEndDateOnly(connection, req, res);
				console.log("LOG: ", "End");
			}
			else {
				getCustomersSiteID(connection, req, res);
				console.log("LOG: ", "Site Only");
			}

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


const getCustomersStartDateOnly = (connection, req, res ) => {
	return new Promise((resolve, reject) => {
		connection.query(sqlStartDateOnly, [req.query['site-id'], req.query['begin-date']], function(err, result) {
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

const getCustomersEndDateOnly = (connection, req, res ) => {
	return new Promise((resolve, reject) => {
		connection.query(sqlEndDateOnly, [req.query['site-id'], req.query['end-date']], function(err, result) {
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

const getCustomersStartEndDate = (connection, req, res ) => {
	return new Promise((resolve, reject) => {
		connection.query(sqlStartEndDate, [req.query['site-id'], req.query['begin-date'], req.query["end-date"]], function(err, result) {
			if (err) {
				semaLog.error('customers - failed', { err });
				res.status(500).send(err.message);
				reject(err);
			}
			else {
				semaLog.info('customers - succeeded');
				console.log("LOG: worked")

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


const getCustomersStartDateOnly = (connection, req, res ) => {
	return new Promise((resolve, reject) => {
		connection.query(sqlStartDateOnly, [req.query['site-id'], req.query['begin-date']], function(err, result) {
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

function getSQLQuery() {

}

module.exports = router;
