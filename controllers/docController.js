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


const {uploadFile,getPublicUrl} = require('../helpers/helpers');
const libre = require('libreoffice-convert');

const {Storage} = require('@google-cloud/storage');
var path = require('path');
const gc = new Storage({
  keyFilename: path.join(__dirname, '../configer/tdt-main-66a7adf662e5.json'),
  projectId: 'tdt-main',
});

const bucket = gc.bucket('tdt_main_deep_bucket');
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


var docs_file_path;
var pdf_file_path;
exports.fileUpload = async (req, res) => {
  var form = new formidable.IncomingForm();
  let newurl = "";

  form.parse(req, async (err, fields, files) => {
  	var id = fields['id'];
  	let current = req.user.email;
  	let user = fields['user'];
  	var doc_name = fields['doc_name'];

	  
  let document_name = doc_name.split(".docx");
  console.log(document_name[0]);
	docs_file_path = path.join(__dirname, `/../template/docs_files/${doc_name}`);
	pdf_file_path = path.join(__dirname, `/../template/pdf_files/${document_name[0]}.pdf`);

  });
	
	if (fs.existsSync(docs_file_path)) {
	  	fs.unlinkSync(docs_file_path);
	}

	if (fs.existsSync(pdf_file_path)) {
	  	fs.unlinkSync(pdf_file_path);
	}

  form.on('file', function (name, file){
    fs.readFile(file.path, function (err, data) {
	  	fs.writeFile(docs_file_path, data, function (err) {
		  if (err) return console.log(err);
		});
    	libre.convert(data, '.pdf', undefined, (err, done) => {
		    if (err) {
		      console.log(`Error converting file: ${err}`);
		    }
		    
		    // Here in done you have pdf file which you can save or transfer in another stream
		    fs.writeFileSync(pdf_file_path, done);
		});


  });

  res.status(200).send('');
});
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
  let doc_name= req.body.content.doc_name;
  let document_name = doc_name.split(".docx");
  console.log(document_name[0]);
	const pdf_file_path = path.join(__dirname, `/../template/pdf_files/${document_name[0]}.pdf`);


// uploading file to google cloud bucket here
if (fs.existsSync(pdf_file_path)) {
	bucket.upload(pdf_file_path, function(err, file) {
	    if (err) throw new Error(err);
	});
}
	//now remove document from local directory
	

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

  	// await emailSender.sendEmail('spoon.jeremy@gmail.com', user, "There are new documents approved from Deeplaw", 'test', '<strong>' + docname + ' is approved. Please download it.</strong>');
		
	  if (fs.existsSync(pdf_file_path)) {
	  	fs.unlinkSync(pdf_file_path);
	  }
  }
  return res.json({ status: "success" });
};
