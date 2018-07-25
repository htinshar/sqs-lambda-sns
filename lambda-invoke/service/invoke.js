'use strict';

var sqs = require('./sqs/Queue.js');
var response = require('./response.js');
var aws = require('aws-sdk');
var worker = new aws.Lambda({
	region: process.env.region,
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});
var queue = new sqs();

module.exports.worker = (event, context, callback) => {
	//get Message from Queue
	queue.getMessage(function(queueError, queueData){
		if(queueError) callback(null, response.get(500, queueError));
		  else
		    //invoke worker
		  	if(queueData.Messages) {
		  		var message = queueData.Messages[0];
		  		message.queueUrl = queueData.url;

		  		worker.invoke(param(message), function(error, data) {
		  			if(error) callback(null, response.get(500, 'Cannot Invoke lambda function'));
		  			  else
		  			  	callback(null, response.get(200, 'Successfully invoke to lambda'));
		  		});
		  	} else {
		  		callback(null, response.get(200, 'There is no message in desire queue'));
		  	}
	})
}

function param(data) {
	return {
		FunctionName: process.env.workerLambdaName,
		InvocationType: 'Event',
		Payload: JSON.stringify(data)
	};
}