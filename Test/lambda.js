let AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = function (event, context, callback) {

    let receiver = event['receiver'];
    let sender = event['sender'];
    let message = event['message'];

    sns.publish({
        Message: message,
        PhoneNumber: receiver,
        MessageAttributes: {
            'AWS.SNS.SMS.SMSType': {
                DataType: "String",
                StringValue: "Promotional"
            },
            'AWS.SNS.SMS.SenderID': {
                DataType: "String",
                StringValue: sender
            }
        }
    }).promise()
        .then(data => {
			console.log("Sent message to", receiver);
			callback(null, data);
		})
       .catch(err => {
			console.log("Sending failed", err);
			callback(err);
		});
    console.log("Sending message", message, "to receiver", receiver);

    callback(null, 'Successfully executed');
}