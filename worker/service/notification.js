'use strict';

var response = require('./response.js');
var sqs = require('./sqs/SQS.js');
var sns = require('./sns/SNS.js');

module.exports.push = (event, context, callback) => {
    var message = JSON.parse(event.Body);

    var snsService = new sns(message);
    
    // push notification
    snsService.push().then(function(data) {
    	// delete queue
    	sqs.delete(event.ReceiptHandle, event.queueUrl, function(queueError, queueData) {
    		if(queueError) callback(null, response.get(500, queueError));
    		  else
    		  	callback(null, response.get(200, queueData));
    	});
    }).catch(function(error){
    	callback(null, response.get(500, error));
    });
};

