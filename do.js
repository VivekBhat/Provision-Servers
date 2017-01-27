var needle = require("needle");
var os   = require("os");
var exec = require('child_process').exec;
var sys = require('sys');
var sleep = require("sleep");

// var config = {};
var config_token = process.env.DO;
console.log();
console.log("============ DigitalOcean Droplet ============");

var headers =
{
	'Content-Type':'application/json',
	Authorization: 'Bearer ' + config_token
};

var client =
{

	listIp: function(dropletId, onResponse )
	{
		needle.get("https://api.digitalocean.com/v2/droplets/" + dropletId, {headers:headers, json:true}, onResponse);
	},
// 38321153

	createDroplet: function (dropletName, region, imageName, onResponse)
	{
		var data = 
		{
			"name": dropletName,
			"region":region,
			"size":"512mb",
			"image":imageName,
			// Id to ssh_key already associated with account.
			"ssh_keys":[6085003],
			//"ssh_keys":null,
			"backups":false,
			"ipv6":false,
			"user_data":null,
			"private_networking":null
		};

		console.log("Attempting to create: "+ JSON.stringify(data) );

		needle.post("https://api.digitalocean.com/v2/droplets", data, {headers:headers,json:true}, onResponse );

	}
	// getIP: function()
};
var dropletId = 0;
var name = "HW1";
var region = "nyc2";
var image = "ubuntu-14-04-x64";
client.createDroplet(name, region, image , function(err, resp, body)
{
	console.log("============ Creating DigitalOcean Droplet ============");	
	if(!err &&resp.statusCode==202){
	console.log("Droplet created");
	dropletId = body.droplet.id;
	console.log("Droplet ID is: ", dropletId);
	console.log("Wait for 30 seconds to retrieve IP");
	console.log();

	console.log("###### Getting the IP Address ######");
	sleep.sleep(30);
	
	client.listIp(dropletId, function(err,resp,body){
		console.log("IP Address is: ",body.droplet.networks.v4[0].ip_address);
		});	
	}
});

