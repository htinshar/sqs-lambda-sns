'use strict';
var aws = require('aws-sdk');

class SNS {
	constructor(data) {
		this.sns = new aws.SNS({
		    region: process.env.region,
			accessKeyId: process.env.accessKeyId,
			secretAccessKey: process.env.secretAccessKey
		});

		this.data = data;
	}

	push() {
		return this.sns.publish(this.params()).promise();
	}

	params() {
		return {
			TopicArn: 'your-topic-arn',
			MessageStructure: 'json',
			Subject: 'Newsletter ' + this.data.title + ' is published',
			Message: JSON.stringify({
				default: 'Newsletter ' + this.data.title + ' is published with this date : ' + this.data.date
			})
		};
	}
}

module.exports = SNS;
