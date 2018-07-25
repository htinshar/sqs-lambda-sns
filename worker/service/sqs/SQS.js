'use strict';
var aws = require('aws-sdk');
var sqs = new aws.SQS({
	region: process.env.region,
	accessKeyId: process.env.accessKeyId,
	secretAccessKey: process.env.secretAccessKey
});
exports.delete = function(receiptHandle, queueUrl, callback) {
	sqs.deleteMessage({
		ReceiptHandle: receiptHandle,
		QueueUrl: queueUrl
	}, function(error, data){
		if(error) callback(error);	
		  else
		  	callback(null, data);
	});
}