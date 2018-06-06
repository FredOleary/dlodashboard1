'use strict';

const fs			= require('fs');
const path			= require('path');
const Sequelize		= require('sequelize');
const basename		= path.basename(__filename);
const associations	= require('./associations');
const customMethods	= require('./custom-methods');
const db			= {};

const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT
});

fs
  .readdirSync(__dirname)
  .filter(file => {
	  return (file.indexOf('.') !== 0) &&
		  (file !== basename) &&
		  (!['associations.js', 'custom-methods.js'].includes(file)) &&
		  (file.slice(-3) === '.js');
  })
  .forEach(file => {
	const model = sequelize['import'](path.join(__dirname, file));
	db[model.name] = model;
  });

customMethods(db);
associations(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;