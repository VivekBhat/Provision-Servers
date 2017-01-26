var needle = require("needle");
var os   = require("os");
var exec = require('child_process').exec;
var sys = require('sys');

// var config = {};
var config_token = process.env.DO;

console.log(config_token);
var headers =
{
	'Content-Type':'application/json',
	Authorization: 'Bearer ' + config_token
};

// Documentation for needle:
// https://github.com/tomas/needle

var client =
{
	listRegions: function( onResponse )
	{
		needle.get("https://api.digitalocean.com/v2/regions", {headers:headers}, onResponse)
	},
	listImages: function( onResponse )
	{
		needle.get("https://api.digitalocean.com/v2/images", {headers:headers}, onResponse)
	},
	
	listIp: function( onResponse )
	{
		needle.get("https://api.digitalocean.com/v2/droplets/38162969", {headers:headers}, onResponse)
	},
	destroyIP: function (onResponse){
	var data = 
	{
	
	"ssh_keys":["KEY HERE"],

	};
	
		needle.delete("https://api.digitalocean.com/v2/droplets/38162969",data, {headers:headers,json:true}, onResponse)
	},
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

// #############################################
// #1 Print out a list of available regions
// Comment out when completed.
// https://developers.digitalocean.com/documentation/v2/#list-all-regions
// use 'slug' property
client.listRegions(function(error, response)
{
	var data = response.body;
	//console.log( JSON.stringify(response.body) );

	if( response.headers )
	{
		console.log( "Calls remaining", response.headers["ratelimit-remaining"] );
	}
// regions
	if( data.regions )
	{
		for(var i=0; i<data.regions.length; i++)
		{
			// console.log(data.regions[i].name);
		}
	}
});

client.listImages(function(error, response)
{
	var data = response.body;
	//console.log( JSON.stringify(response.body) );
	console.log();
	if( response.headers )
	{
		console.log( "Calls remaining", response.headers["ratelimit-remaining"] );
	}
// regions
	if( data.images )
	{
		for(var i=0; i<data.images.length; i++)
		{
		// console.log(data.images);
		}
	}
});


// #############################################
// #2 Extend the client object to have a listImages method
// Comment out when completed.
// https://developers.digitalocean.com/documentation/v2/#images
// - Print out a list of available system images, that are AVAILABLE in a specified region.
// - use 'slug' property

// #############################################
// #3 Create an droplet with the specified name, region, and image
// Comment out when completed. ONLY RUN ONCE!!!!!
// Write down/copy droplet id.
// var name = "UnityId"+os.hostname();
// var region = ""; // Fill one in from #1
// var image = ""; // Fill one in from #2
var dropletId = "6085003";


client.createDroplet('Testing1', 'nyc2', 'ubuntu-14-04-x64', function(err, resp)
{
	// console.log(body);
	console.log("###################");
	console.log("Is there any error ?");

	console.log(JSON.stringify(err));
	console.log("###################");
	console.log( JSON.stringify( resp.body ) );
	console.log("###################");	

	// var dropletId = resp.body.droplet.id;
	console.log("dropletId inside is: ");
	console.log(dropletId);


});

	// client.listIp(function(error, response){
	
	// //console.log(response);
	// var data = response.body;
	// console.log( JSON.stringify(response.body) );
	// ip = response.body.droplet.networks.v4[0].ip_address;
	// console.log();
	// console.log("########--DISPLAYING IP---##########");
	// console.log(response.body.droplet.networks.v4[0].ip_address);
	// console.log();
	// console.log("Pinging IP");
	// function puts(error, stdout, stderr) { sys.puts(stdout) }
	// exec("ping -c 4 "+response.body.droplet.networks.v4[0].ip_address, puts);
	// console.log();
	// });

// #############################################
// #4 Extend the client to retrieve information about a specified droplet.
// Comment out when done.
// https://developers.digitalocean.com/documentation/v2/#retrieve-an-existing-droplet-by-id
// REMEMBER POST != GET
// Most importantly, print out IP address!
console.log("dropletId outside is: ");
console.log(dropletId);


// #############################################
// #5 In the command line, ping your server, make sure it is alive!
// ping xx.xx.xx.xx

// #############################################
// #6 Extend the client to DESTROY the specified droplet.
// Comment out when done.
// https://developers.digitalocean.com/documentation/v2/#delete-a-droplet
// HINT, use the DELETE verb.
// HINT #2, needle.delete(url, data, options, callback), data needs passed as null.
// No response body will be sent back, but the response code will indicate success.
// Specifically, the response code will be a 204, which means that the action was successful with no returned body data.


// client.destroyIP(function (err,resp) {
// console.log("Deleting!");
// if(!err && resp.statusCode == 204)
// 	{
// 			console.log("Deleted!");
// 	}

// 	exec("ping -c 4 "+resp.body.droplet.networks.v4[0].ip_address, puts);

// });
	

// #############################################
// #7 In the command line, ping your server, make sure it is dead!
// ping xx.xx.xx.xx
// It could be possible that digitalocean reallocated your IP address to another server, so don't fret it is still pinging.

