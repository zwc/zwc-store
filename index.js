'use strict';
const H = require('highland');
const redis = require("redis");
const client = redis.createClient();

const keys = H.wrapCallback((key, callback) => client.keys(key, (err, response) => { callback(err, response); }));
const get = H.wrapCallback((key, callback) => client.get(key, (err, response) => { callback(err, JSON.parse(response)); }));
const _set = H.wrapCallback((key, value, callback) => client.set(key, value, (err) => { callback(err); }));

module.exports = {
	keys,
	get,
	_set,
	del: (key) => client.del(key),
	set: (key, value) => client.set(key, JSON.stringify(value))
};