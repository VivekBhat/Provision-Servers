var AWS = require('aws-sdk');
var fs = require("fs");
var sleep = require("sleep");
// var config = {};
// var config_token = "7fa636e3567b698a744e55bdafa35a4ae90b62afed4ff31e91e52232f6144792";

var aws_access_key = process.env.AWS_ACCESS_KEY;
var aws_secret_key = process.env.AWS_SECRET_KEY;

AWS.config.region = 'us-west-2';
AWS.config.update({accessKeyId: aws_access_key, secretAccessKey: aws_secret_key});

var ec2 = new AWS.EC2();

var params = {
	ImageId:  'ami-b7a114d7',
	InstanceType: 't2.micro',
	MinCount: 1, MaxCount: 1,
	KeyName: 'devops',
	SecurityGroups:["test1"]
}


ec2.runInstances(params, function(err, data){
	console.log("Attempting to create: "+ JSON.stringify(params) );


	
	if(err){
		console.log("Could not create instance because ", err ); return;
	}
	var instanceID = data.Instances[0].InstanceId;
	console.log("============ Creating EC2 Instance ============");
	console.log("Created Instance: ", instanceID);
	params={Resources: [instanceID], Tags: [
		{ key: 'Name', Value: 'DevOps-HW1'
		}]};

	console.log();
	console.log("Waiting for 30 sec");
	sleep.sleep(30);

	var params = {InstanceIds:[instanceID]};

	ec2.waitFor('instanceExists',params,function(err, data){
		if(err) 	console.log(err, err.stack);
		else {
			var ipAdress = data.Reservations[0].Instances[0].PublicIpAddress;
			console.log("Instance details");
			console.log();
			console.log("============ Displaying the IP Address ============");
			console.log("PublicIpAddress is :" , ipAdress);
			console.log();

		}
	});
});