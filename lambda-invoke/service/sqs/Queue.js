'use strict';

var aws = require('aws-sdk');

class Queue {
	constructor() {
		this.sqs = new aws.SQS({
			region: process.env.region,
			accessKeyId: process.env.accessKeyId,
			secretAccessKey: process.env.secretAccessKey
		});

		this.param = {
		    MaxNumberOfMessages: 10,
			VisibilityTimeout: 600
		};
	}

    // get queue message
	getMessage(callback) {
		var sqs = this.sqs;
		var param = this.param;

		this.getUrl().then(function(data){
			param.QueueUrl = data.QueueUrl;
			sqs.receiveMessage(param, function(error, data) {
				if (error) callback(error);
				else  
					data.url = param.QueueUrl;
					callback(null, data);
			});
		}).catch(function(error){
			callback(error);
		});
	}

    // get queue url by queue name
	getUrl() {
		return this.sqs.getQueueUrl({
			QueueName: process.env.queueName,
		}).promise();
	}
}

module.exports = Queue;