var Queue = require('../service/sqs/Queue.js');
const env = Object.assign({}, process.env);
var chai = require('chai');
var assert = chai.assert;
process.env.queueName = 'your-queue-name';
process.env.region = 'your-region-name';
process.env.accessKeyId = 'your-aws-access-key';
process.env.secretAccessKey = 'your-aws-access-secrect';
var queueUrl = 'your-queue-url';

var queue = new Queue();

describe('Queue Service Function Testing', function(){
	this.timeout(20000);

	it('Should return url for queue', function(done){
		queue.getUrl().then(function(data){
			assert.equal(data.QueueUrl, queueUrl, 'Return Url is correct');
			done();
		});
	});

	it('Should receive message from queue', function(done){
		queue.getMessage(function(error, data){
			assert.deepEqual(data, Object(data), 'Data type is object');
			assert(data.url);
			assert(data.ResponseMetadata);
			done();
		});
	});
})