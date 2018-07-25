var snsService = require('../service/sns/SNS.js');
const env = Object.assign({}, process.env);
var chai = require('chai');
var assert = chai.assert;
process.env.region = 'your-region';
process.env.accessKeyId = 'your-aws-access-key';
process.env.secretAccessKey = 'your-aws-access-secrect';

describe('Publish Message To Topic Testing', function(){
	this.timeout(20000);

	it('Should publish message to topic', function(done){
		var data = {};
		data.title = 'TEST MESSAGE';
		data.date = '2018-05-01';
		var sns = new snsService(data);

		sns.push().then(function(data){
			assert.deepEqual(data, Object(data), 'Data type is object');
			assert(data.ResponseMetadata);
			assert(data.MessageId);
			assert(typeof data.MessageId === 'string');
			done();
		})

	})
})