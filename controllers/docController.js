require("dotenv").config();
//var config = require("../config");
var User = require('../models/user');
var Chat = require('../models/chat');
var Doc = require('../models/docapprove');
var formidable = require('formidable');
var fs = require('fs');
var emailSender = require('./emailSender.js');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');  //{accessKeyId: 'GOOGE6CBR72CH3RLTADJ55CY',

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
exports.getDocsToApprove = async (req, res) => {
  let current = req.user.email;

  console.log("Docs2Approve");

	var docs = await Doc.find({approver: current});
	//var docs = await Doc.find({user: current});
	console.log("docs:");
	console.log(docs);
	console.log("docs.length:");
	console.log(docs.length);


	var doclist = [];
  if (docs) {
  	for (var i = docs.length - 1; i >= 0; i--) {
		console.log("i");
		console.log(i);
		console.log(docs[i]);
		var doclinks = [];
  		for (var j = 0; j < docs[i].link.length; j++) {
  			var link = docs[i].link[j];
  			if (link['status'] == "Not approved") {
					var temp = {...link};
					temp['user'] = docs[i].user;
					var user = await User.findOne({email: docs[i].user});
					// temp['username'] = user['username'];
					temp['approver'] = docs[i].approver;
					doclinks.push(temp);
				}
  		}
	  	doclist.push(...doclinks);
  	}
  }

  return res.json({ status: "success", data: doclist });
};

exports.fileUpload = async (req, res) => {
  var form = new formidable.IncomingForm();
  let newurl = "";


  form.parse(req, async (err, fields, files) => {
  	var id = fields['id'];
  	let current = req.user.email;
  	let user = fields['user'];

	  var docs = await Doc.findOne({approver: current, user: user});

	  let docname = "";

	  if (docs) {
	  	var links = docs.link;
	  	for (var i = links.length - 1; i >= 0; i--) {
	  		if (String(links[i]['_id']) == id) {
					links[i]['url'] = newurl;
				}
	  	}
	  	docs.link = links;
			
	  	docs.save();
	  }

  });

  form.on('file', function (name, file){
    //console.log(file)
      // file.path = __dirname + '/../public/docs/' + file.name;
    fs.readFile(file.path, function (err, data) {
		var ep = new AWS.Endpoint('https://storage.googleapis.com');
		//var s3bucket = new AWS.S3({params: {Bucket: 'herokustorage247appout'  },endpoint: ep});
		var s3bucket = new AWS.S3({params: {Bucket: 'herokustorage712'  },endpoint: ep});
      console.log(s3bucket.endpoint.hostname);

      s3bucket.createBucket(function () {
        var params = {
            Key: file.name, //file.name doesn't exist as a property
            Body: data
        };
        s3bucket.upload(params, function (err, data) {
            if (err) {
                console.log('ERROR MSG: ', err);
                // res.status(500).send(err);
            } else {
                console.log('Successfully uploaded data');
                // res.status(200).end();
            }
        });
      });
    });
    newurl = file.name;
  });

  res.status(200).send('');
};

exports.getApprovedDocs = async (req, res) => {
	let current = req.user.email;
	console.log("AWS.Endpoint.toString()");
	//AWS.config.loadFromPath('/app/config.json');  //{accessKeyId: 'GOOGE6CBR72CH3RLTADJ55CY',
	//secretAccessKey: 'S3kLDS9lIve9mYzYkKC1a/SQy0/d1OjBUkMY4wck',
	//s3BucketEndpoint: 'https://storage.googleapis.com'
	//});

//	console.log(AWS.Endpoint.toString());
	AWS.config.getCredentials(function(err) {
		if (err) console.log(err.stack); // credentials not loaded
		else {
			console.log('ApprovedDocs');

			console.log("Access Key:", AWS.config.credentials.accessKeyId);
			console.log("Secret Access Key:", AWS.config.credentials.secretAccessKey);
			console.log("s3BuscketEndpoint:", AWS.config.s3BucketEndpoint);
		}
	});



	console.log('ApprovedDocs');
	console.log("Access Key:", AWS.config.credentials.accessKeyId);
	console.log("Secret Access Key:", AWS.config.credentials.secretAccessKey);
	console.log("s3BuscketEndpoint:", AWS.config.s3BucketEndpoint);

	var ep = new AWS.Endpoint('https://storage.googleapis.com');
	console.log("ep.hostname");
	console.log(ep.hostname);
	//var s3bucket = new AWS.S3({params: {Bucket: 'herokustorage247appout'  },endpoint: ep});
	var s3bucket = new AWS.S3({params: {Bucket: 'herokustorage712' },endpoint: ep});
	console.log("s3bucket.endpoint.hostname");
	console.log(s3bucket.endpoint.hostname);

	var docs = await Doc.find({user: current});
	console.log("docs:");
	console.log(docs);
	console.log("docs.length:");
	console.log(docs.length);

	var doclist = [];
	if (docs) {
		for (var i = docs.length - 1; i >= 0; i--) {
	//		console.log("i");
	//		console.log(i);
	//		console.log(docs[i]);
			var doclinks = [];
			for (var j = 0; j < docs[i].link.length; j++) {
				var link = docs[i].link[j];
				if (link['status'] == "Approved") {
					var temp = {...link};
					temp['user'] = docs[i].user;
					temp['approver'] = docs[i].approver;
					doclinks.push(temp);
				}
			}
			doclist.push(...doclinks);
		}
	}
	console.log("doclist.toString()");
	console.log(doclist.toString());
	console.log("doclist.length");
	console.log(doclist.length);
	return res.json({ status: "success", data: doclist });
};

exports.getDocsNotApproved = async (req, res) => {
	let current = req.user.email;
	console.log("AWS.Endpoint.toString()");
	//AWS.config.loadFromPath('/app/config.json');  //{accessKeyId: 'GOOGE6CBR72CH3RLTADJ55CY',
	//secretAccessKey: 'S3kLDS9lIve9mYzYkKC1a/SQy0/d1OjBUkMY4wck',
	//s3BucketEndpoint: 'https://storage.googleapis.com'
	//});

//	console.log(AWS.Endpoint.toString());
	AWS.config.getCredentials(function(err) {
		if (err) console.log(err.stack); // credentials not loaded
		else {
			console.log('ApprovedDocs');

			console.log("Access Key:", AWS.config.credentials.accessKeyId);
			console.log("Secret Access Key:", AWS.config.credentials.secretAccessKey);
			console.log("s3BuscketEndpoint:", AWS.config.s3BucketEndpoint);
		}
	});



	console.log('NOT ApprovedDocs');
	console.log("Access Key:", AWS.config.credentials.accessKeyId);
	console.log("Secret Access Key:", AWS.config.credentials.secretAccessKey);
	console.log("s3BuscketEndpoint:", AWS.config.s3BucketEndpoint);

	var ep = new AWS.Endpoint('https://storage.googleapis.com');
	console.log("ep.hostname");
	console.log(ep.hostname);
	//var s3bucket = new AWS.S3({params: {Bucket: 'herokustorage247appout'  },endpoint: ep});
	var s3bucket = new AWS.S3({params: {Bucket: 'herokustorage712' },endpoint: ep});
	console.log("s3bucket.endpoint.hostname");
	console.log(s3bucket.endpoint.hostname);

	var docs = await Doc.find({user: current});
	console.log("docs:");
	console.log(docs);
	console.log("docs.length:");
	console.log(docs.length);

	var doclist = [];
	if (docs) {
		for (var i = docs.length - 1; i >= 0; i--) {
			//console.log("i");
			//console.log(i);
			//console.log(docs[i]);
			var doclinks = [];
			for (var j = 0; j < docs[i].link.length; j++) {
				var link = docs[i].link[j];
				if (link['status'] == "Not approved") {
					var temp = {...link};
					temp['user'] = docs[i].user;
					temp['approver'] = docs[i].approver;
					doclinks.push(temp);
				}
			}
			doclist.push(...doclinks);
		}
	}
	console.log("doclist.toString()");
	console.log(doclist.toString());
	console.log("doclist.length");
	console.log(doclist.length);
	return res.json({ status: "success", data: doclist });
};


exports.getUnfinishedDocs = async (req, res) => {
  let current = req.user.email;
	var config = new AWS.Config({accessKeyId: 'GOOGE6CBR72CH3RLTADJ55CY',
		secretAccessKey: 'S3kLDS9lIve9mYzYkKC1a/SQy0/d1OjBUkMY4wck',
		s3BucketEndpoint: 'https://storage.googleapis.com'
	});
	var config = new AWS.Config({accessKeyId: 'GOOGE6CBR72CH3RLTADJ55CY',
		secretAccessKey: 'S3kLDS9lIve9mYzYkKC1a/SQy0/d1OjBUkMY4wck',
		s3BucketEndpoint: 'https://storage.googleapis.com'
	});
	AWS.config.getCredentials(function(err) {
		if (err) console.log(err.stack); // credentials not loaded
		else {
			console.log('ApprovedDocs');

			console.log("Access Key:", AWS.config.credentials.accessKeyId);
			console.log("Secret Access Key:", AWS.config.credentials.secretAccessKey);
			console.log("s3BuscketEndpoint:", AWS.config.s3BucketEndpoint);
		}
	});

	var docs = await Doc.find({user: current});

  var doclist = [];
  if (docs) {
  	for (var i = docs.length - 1; i >= 0; i--) {
  		var doclinks = [];
  		for (var j = 0; j < docs[i].link.length; j++) {
  			var link = docs[i].link[j];
  			if (link['status'] == "Approved") {
					var temp = {...link};
					temp['user'] = docs[i].user;
					temp['approver'] = docs[i].approver;
					doclinks.push(temp);
				}
  		}
	  	doclist.push(...doclinks);
  	}
  }

  return res.json({ status: "success", data: doclist });
};

exports.approveDoc = async (req, res) => {
  let current = req.user.email;
  let user = req.body.content.user;
  let docid= req.body.content.docid;
	var config = new AWS.Config({accessKeyId: 'GOOGE6CBR72CH3RLTADJ55CY',
		secretAccessKey: 'S3kLDS9lIve9mYzYkKC1a/SQy0/d1OjBUkMY4wck',
		s3BucketEndpoint: 'https://storage.googleapis.com'
	});
	AWS.config.getCredentials(function(err) {
		if (err) console.log(err.stack); // credentials not loaded
		else console.log("Access Key:", AWS.config.credentials.accessKeyId);
	console.log('ApprovedDocs');
	console.log("Access Key:", AWS.config.credentials.accessKeyId);
	console.log("Secret Access Key:", AWS.config.credentials.secretAccessKey);
	console.log("s3BuscketEndpoint:", AWS.config.s3BucketEndpoint);
	});



	var docs = await Doc.findOne({approver: current, user: user});

  let docname = "";

  if (docs) {
  	var links = docs.link;
  	for (var i = links.length - 1; i >= 0; i--) {
  		if (String(links[i]['_id']) == docid) {
				links[i]['status'] = "Approved";
				docname = links[i]['url'].slice(16);
			}
  	}
  	docs.link = links;
		
		console.log(docname);
  	docs.save();

  	await emailSender.sendEmail('spoon.jeremy@gmail.com', user, "There are new documents approved from Deeplaw", 'test', '<strong>' + docname + ' is approved. Please download it.</strong>');
		
  }

  return res.json({ status: "success" });
};
