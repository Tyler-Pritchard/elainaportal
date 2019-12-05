require("dotenv").config();
//var config = require("../config");
var User = require('../models/user');
var Chat = require('../models/chat');
var Doc = require('../models/docapprove');
var formidable = require('formidable');
var fs = require('fs');
var emailSender = require('./emailSender.js');
const AWS = require('aws-sdk');
var config = new AWS.Config({accessKeyId: 'GOOGE6CBR72CH3RLTADJ55CY',
	secretAccessKey: 'S3kLDS9lIve9mYzYkKC1a/SQy0/d1OjBUkMY4wck',
	s3BucketEndpoint: 'https://storage.googleapis.com'
});

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
exports.getDocsToApprove = async (req, res) => {
  let current = req.user.email;

  console.log("Docs2Approve");

  var docs = await Doc.find({approver: current});

  var doclist = [];
  if (docs) {
  	for (var i = docs.length - 1; i >= 0; i--) {
  		var doclinks = [];
  		for (var j = 0; j < docs[i].link.length; j++) {
  			var link = docs[i].link[j];
  			if (link['status'] == "Not approved") {
					var temp = {...link};
					temp['user'] = docs[i].user;
					var user = await User.findOne({email: docs[i].user});
					temp['username'] = user['username'];
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
      var s3bucket = new AWS.S3({params: {Bucket: 'herokustorage711'  }});
      //console.log(data);
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

	console.log('ApprovedDocs');
	console.log("Access Key:", AWS.config.credentials.accessKeyId);

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

exports.getUnfinishedDocs = async (req, res) => {
  let current = req.user.email;

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
