const env = Object.assign({}, process.env);
process.env.queueName = 'your-queue-name';
process.env.region = 'your-region-name';
process.env.accessKeyId = 'your-aws-access-key';
process.env.secretAccessKey = 'your-aws-access-secrect';
process.env.workerLambdaName = 'your-worker-lambda-name';

var invoke = require('../service/invoke.js');
var chai = require('chai');
var assert = chai.assert;
var response = require('../service/response.js');

describe('Invoke Function Testing',function(){

	it('It should invoke worker function', function(done){
		this.timeout(60000);
		var event = {};
		var callback = (context, data) => {
			assert.deepEqual(data, Object(data), 'Data type is object');
			var body = JSON.parse(data.body);
			assert(body.message);
			assert(typeof body.message == 'string');
			done();
		}

		invoke.worker(event, context, callback);
	});

	it('It should return reponse object', function(done){
		var message = 'This is test message';
		var getMessage = response.get(200, message);
		assert.deepEqual(getMessage, Object(getMessage), 'Get Message is object');
		assert.equal(getMessage.statusCode, 200, 'Status Code is 200');
		assert.equal(JSON.parse(getMessage.body).message, message, 'Status Code is 200');
		done();
	});
})
