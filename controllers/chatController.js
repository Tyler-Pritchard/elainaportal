require("dotenv").config();
var config = require("../config");
var Chat = require('../models/chat');
var path = require('path');
var User = require('../models/user');
var DocApprove = require('../models/docapprove');
const _ = require("lodash");

const dialogflow = require('dialogflow');
const uuid = require('uuid');

const structjson = require('./structJson.js');

var emailSender = require('./emailSender.js');

var htmlDocxJs = require("html-docx-js");
var pdf = require('html-pdf');



var request = require('request')
var url = 'https://us-central1-elaina-public--woamtk.cloudfunctions.net/webApi/api/df_text_query'
// Functions to export

    // Function for Retriving Tweets
  const getResultAgent =  async function(data) {
      // Return result of query
      return new Promise( ( resolve, reject ) => {
        request.post(url,  {json : data}, function (error, res, body) {
          if (error) {
            console.error(error)
            resolve(false)
          }
          var req_data = body
          // console.log(req_data);
          resolve(req_data)
        })
    })
  }

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */

class DeepDialogFlow {
  constructor() {
    let privateKey = (process.env.NODE_ENV == "production") ? process.env.DIALOGFLOW_PRIVATE_KEY : process.env.DIALOGFLOW_PRIVATE_KEY
    privateKey = _.replace(privateKey, new RegExp("\\\\n", "\g"), "\n")
    let clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL
    let config = {
      credentials: {
        private_key: privateKey,
        client_email: clientEmail
      }
    }
    // A unique identifier for the given session
    this.sessionClient = new dialogflow.SessionsClient(config);
    // const sessionId = uuid.v4();
    // this.sessionPath = this.sessionClient.sessionPath('abbi-cvflsy', sessionId);
  }

  getSessionPath() {
    const sessionId = uuid.v4();
    var sessionPath = this.sessionClient.sessionPath('abbi-cvflsy', sessionId);
    return sessionPath;
  }

  async chat(text, sessionPath) {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text.replace('\n', ''),
          // The language used by the client (en-US)
          languageCode: 'en-US',
        }
      }
    };
    const responses = await this.sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    
    return result.fulfillmentText;
  }
}

myDialogflow = new DeepDialogFlow();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function logMapElements(value, key, map) {
  console.log(`m[${key}] = ${value}`);
}

exports.publicChat = async function (req, res) {
  let content = req.body.content;
  result = getResultAgent({text : content});
  console.log('DialogFlow API response: ',result);
  return result
}

// Adds a new message to the chat log
// checked if document was completed and needs to be approved
// sends to approvers
exports.addChat = async function (req, res) {
try {
  let content = req.body.content;
  let sessionPath = null;
  if (req.session['sessionPath']) {
    sessionPath = req.session.sessionPath;
  }
  else {
    req.session['sessionPath'] = myDialogflow.getSessionPath();
    sessionPath = req.session['sessionPath'];
  }
  let resultText = await myDialogflow.chat(content, sessionPath);
console.log('resultText = '+resultText);
  // this is the que to wrap up document
  if (resultText.includes('we’re done')) {
    const fs = require('fs');

    // Select Approver
    var approver;
    var admins = await User.find({role: "admin"});
    if (!admins) {
      // handle errors
      console.log("there is no admin");
    } else {
      approver = admins[getRandomInt(0, admins.length - 1)];
    }
    console.log('approver = '+approver);
    var currentUser = await User.findOne({email: req.user.email});

    //var formArray = [ "Background Check Policy", "Family and Medical Leave Policy" ];
    //var formDocmArray = [ "Background_Check_Policy", "Family_and_Medical_Leave_Policy" ];

    let intents = new Map();
    intents.set("Family Medical Leave Policy", "Family_Medical_Leave_Policy")
    intents.set("Background Check Policy", "Background_Check_Policy")
    intents.set("operating agreement", "Operating_Agreement")
    intents.set("Employee Non-Compete Agreement", "Employee_NonCompete_Agreement")
    intents.set("Dress Code Policy", "Dress_Code_Policy")
    intents.set("Independent Contractor Agreement", "Independent_Contractor_Agreement")
    intents.set("Buy-Sell Agreement", "Buy_Sell_Agreement")
    intents.set("Equal Opportunity Employment Policy", "Equal_Opportunity_Employment_Policy")
    intents.set("Operating Agreement Multi-Member", "Operating_Agreement_Multi_Member")
    intents.set("Mutual Non-Disclosure Agreement", "Mutual_Non_Disclosure_Agreement")
    intents.set("Corporate Bylaws", "Corporate_Bylaws")
    intents.set("Trademark Application", "Trademark_Application")
    intents.set("Application for Employment", "Application_for_Employment")
    intents.set("Confidentiality and Proprietary Rights Agreement", "Confidentiality_and_Proprietary_Rights_Agreement")

    var intentKey = "Background Check Policy";
    var intentValue = "Background_Check_Policy";
    intents.forEach(logMapElements);
    intents.forEach(function(value,key,map) {
      console.log(key.toLowerCase()+value);
      if (resultText.toLowerCase().includes(key.toLowerCase())) {
        intentKey = key;
        intentValue = value;
      }
    });

    console.log('=========intentKey======================');
    console.log(intentKey);
    console.log('=========intentValue======================');
    console.log(intentValue);

    var info = currentUser[intentValue]; //:s[Object.keys(intents)[1]]]; //'Background_Check_Policy'];

    console.log("currentUser:");
    console.log(currentUser);
    console.log("info:");
    console.log(info);
    console.log("--------End of info-------------")
    //console.log(info.keys().length);

    await emailSender.sendEmail('spoon.jeremy@gmail.com', approver['email'], 'Please approve the documents from Deeplaw', 'test', '<strong>There are documents from ' + req.user.username + '</strong>');
    // console.log('<strong>There are documents from ' + req + '</strong>');

    // var emailResult = await emailSender.sendEmail('spoon.jeremy@gmail.com', 'zamanbajwa22@gmail.com', 'Please approve the documents from Deeplaw', 'test', '<strong>There are documents from : + req.user.username + </strong>');

    // var emailResult = await emailSender.sendEmail('chukhman@uic.edu', 'morrisc@gmail.com', 'Please approve the documents from Deeplaw', 'test', '<strong>There are documents from : + req.user.username + </strong>');
    // let data = fs.readFileSync(__dirname + '/../template/test.htm', 'utf8');

    let myfiles = fs.readdirSync(__dirname + '/../template');  //,  ((err, files) => {


    for(let i = 0;i<myfiles.length;i++) {
      var  happystr = myfiles[i].toString();
      console.log( happystr ); //+= myfiles[i].toString();
    }

    // let data = fs.readFileSync(__dirname + '/../template/' + intentKey.replace(/ /g, "")  + 'IL.htm', 'utf8');
    let data = fs.readFileSync(__dirname + '/../template/' + intentKey + ' IL.html', 'utf8');
    console.log("__dirname:");
    console.log(__dirname);
    console.log('data.length');
    console.log(data.length);

    String.prototype.replaceAll = function (search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };

    // Replace Template Fields with values in database
    var keys = Object.keys(info);
    for (k in keys.slice(0,keys.length)){
      console.log(keys[k]+":"+info[keys[k]]);
      data = data.replaceAll('d.'+keys[k], info[keys[k]]);
      console.log(data);
    }
    if(intentValue == 'Background_Check_Policy' ){
      data = data.replaceAll('d.employeeName', info['employeeName']);
      data = data.replaceAll('d.requireMayRequire', info['requireMayRequire']);
      data = data.replaceAll('d.humanResourcesDepartmentName', info['humanResourcesDepartmentName']);
      data = data.replaceAll('d.position', info['position']);
    }
    if(intentValue == 'Dress_Code_Policy' ){
      data = data.replaceAll('d.employeeName', info['employeeName']);
    }
    if(intentValue == 'Equal_Opportunity_Employment_Policy' ){
      data = data.replaceAll('d.employeeName', info['employername']);
      data = data.replaceAll('d.departmentName', info['accommadation']);
      // data = data.replaceAll('d.employeeName', info['complaints']);
      data = data.replaceAll('d.positionDepartmentName', info['complainttwo']);
    }

    if(intentValue == 'Family_Medical_Leave_Policy' ){
      data = data.replaceAll('d.employeName', info['employername']);
      data = data.replaceAll('d.thehumanResourcesDepartmentName', info['conatct']);
      data = data.replaceAll('d.humanResourcesDepartmentName', info['formsdepartment']);
      data = data.replaceAll('d.mayWillBeRequired', info['permitrequired']);
      data = data.replaceAll('d.position', info['changeposition']);
      data = data.replaceAll('d.requiredFrequency', info['statuscontact']);
      data = data.replaceAll('d.paymentMethod', info['paymentmethod']);
    }

    if(intentValue == 'Trademark_Application' ){

      data = data.replaceAll('d.creatorname', info['creatorname']);
      data = data.replaceAll('d.usematerials', info['usematerials']);
      data = data.replaceAll('d.creatoraffill', info['creatoraffill']);
      data = data.replaceAll('d.goodservices', info['goodservices']);
      data = data.replaceAll('d.usegeography', info['usegeography']);
      data = data.replaceAll('d.acronym', info['acronym']);
      data = data.replaceAll('d.targetcustomer', info['targetcustomer']);
      data = data.replaceAll('d.marksimiliar', info['marksimiliar']);
      data = data.replaceAll('d.subjectmatter', info['subjectmatter']);
      data = data.replaceAll('d.markcreatedspell', info['markcreatedspell']);
      data = data.replaceAll('d.tradechannels', info['tradechannels']);
      data = data.replaceAll('d.mark', info['mark']);
      data = data.replaceAll('d.markchanges', info['markchanges']);
      data = data.replaceAll('d.markmeaning', info['markmeaning']);  
      data = data.replaceAll('d.markforeign', info['markforeign']);
      data = data.replaceAll('d.markabbr', info['markabbr']);
      data = data.replaceAll('d.ususe', info['ususe']);
      data = data.replaceAll('d.usbusiness', info['usbusiness']);
      data = data.replaceAll('d.firstuse', info['firstuse']);

    }

    if(intentValue == 'Mutual_Non_Disclosure_Agreement' ){
      // current timestamp in milliseconds
      let ts = Date.now();
      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();

      // prints date & time in YYYY-MM-DD format
      date_today = year + "-" + month + "-" + date;

      data = data.replaceAll('d.date', date_today);
      data = data.replaceAll('d.partyone', info['partyone']);
      data = data.replaceAll('d.partyoneaddress', info['partyoneaddress']);
      data = data.replaceAll('d.partyonestate', info['partyonestate']);
      data = data.replaceAll('d.partyonecity', info['partyonecity']);
      data = data.replaceAll('d.partyonecounty', info['partyonecounty']);
      data = data.replaceAll('d.partyoneentity', info['partyoneentity']);
      data = data.replaceAll('d.partytwo', info['partytwo']);
      data = data.replaceAll('d.partytwoaddress', info['partytwoaddress']);
      data = data.replaceAll('d.partytwostate', info['partytwostate']);
      data = data.replaceAll('d.partytwoentity', info['partytwoentity']);
      data = data.replaceAll('d.purpose', info['purpose']);
      data = data.replaceAll('d.timeperiod', info['timeperiod']);

    }

    if(intentValue == 'Buy_Sell_Agreement' ){
      let ts = Date.now();
      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();
      date_today = year + "-" + month + "-" + date;

// scorp 
// divorce 
// spouseinstallments  
// spouseinterest  

      data = data.replaceAll('d.companyName', info['companyname']);
      data = data.replaceAll('d.date', date_today);
      data = data.replaceAll('d.number', info['companyshares']);
      data = data.replaceAll('d.dollerAmount', info['parvalue']);
      data = data.replaceAll('d.precentageIntr', info['interest']);
      data = data.replaceAll('d.nameInsurenceCompany', info['insurancecomp']);
      data = data.replaceAll('d.addressInsurenceCompany', info['insuranceaddress']);
      data = data.replaceAll('d.numberOfMonth', info['installment']);

    }

    if(intentValue == 'Application_for_Employment' ){
      data = data.replaceAll('d.number', info['number']);
      data = data.replaceAll('d.employeeName', info['employeename']);
      // data = data.replaceAll('d.', info['numberdays']);
      // data = data.replaceAll('d.', info['history']);
      // data = data.replaceAll('d.', info['personalprofessional']);
      // data = data.replaceAll('d.', info['relatives']);
      // data = data.replaceAll('d.', info['noncompete']);

    }


    if(intentValue == 'Employee_Confidentiality_and_Proprietary_Rights_Agreement' ){
      data = data.replaceAll('d.employername', info['employername']);
      data = data.replaceAll('d.employerstate', info['employerstate']);
      data = data.replaceAll('d.employerentity', info['employerentity']);
      data = data.replaceAll('d.employersubsidiaries', info['employersubsidiaries']);
      data = data.replaceAll('d.employeeName', info['employeeName']);
      data = data.replaceAll('d.consideration', info['consideration']);
      data = data.replaceAll('d.shareconfidential', info['shareconfidential']);
      data = data.replaceAll('d.officerName', info['officerName']);
      data = data.replaceAll('d.officerTitle', info['officerTitle']);
    }

    if(intentValue == 'Application_for_Employment' ){
      data = data.replaceAll('d.number', info['number']);
      data = data.replaceAll('d.employeeName', info['employeename']);
      // data = data.replaceAll('d.', info['numberdays']);
      // data = data.replaceAll('d.', info['history']);
      // data = data.replaceAll('d.', info['personalprofessional']);
      // data = data.replaceAll('d.', info['relatives']);
      // data = data.replaceAll('d.', info['noncompete']);

    }

    // if(intentValue == 'Confidentiality_and_Proprietary_Rights_Agreement' ){
    //   let ts = Date.now();
    //   let date_ob = new Date(ts);
    //   let date = date_ob.getDate();
    //   let month = date_ob.getMonth() + 1;
    //   let year = date_ob.getFullYear();
    //   date_today = year + "-" + month + "-" + date;

    //   data = data.replaceAll('d.date', date_today);


    //   employerentity: titlecase(employerentity),
    //   officertitle: titlecase(officertitle),
    //                 officer: titlecase(officer),
    //                 employername: titlecase(employername),                
    //                 employeename: titlecase(employeename),           
    //                 employerstate: titlecase(employerstate),           
    //                 thirdparties: titlecase(thirdparties),           
    //                 employersubsidiaries: titlecase(employersubsidiaries),

    //   data = data.replaceAll('d.nameOfParty1', info['employerentity']);
    //   data = data.replaceAll('d.party1StateOfOrganization', info['employerentity']);
    //   data = data.replaceAll('d.party1EntityType', info['employerentity']);
    //   data = data.replaceAll('d.party1BusinessAddress', info['employerentity']);
    //   data = data.replaceAll('d.nameOfParty2', info['employerentity']);
    //   data = data.replaceAll('d.party2StateOfOrganization', info['employerentity']);
    //   data = data.replaceAll('d.party2EntityType', info['employerentity']);
    //   data = data.replaceAll('d.party2BusinessAddress', info['employerentity']);
    //   data = data.replaceAll('d.descriptionOfPurpose', info['employerentity']);
    //   data = data.replaceAll('d.expireNumber', info['employerentity']);
    //   data = data.replaceAll('d.relaventCity', info['employerentity']);
    //   data = data.replaceAll('d.relaventCountry', info['employerentity']);

    // }

    if(intentValue == 'Independent_Contractor_Agreement' ){
      let ts = Date.now();
      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();
      date_today = year + "-" + month + "-" + date;

      data = data.replaceAll('d.todaysdate', date_today);


//       otherconfinfo 
// companyname 
// contractorname  
// contractordeliverables  
// enddate 
// entitytype  
// agreementdate 
// startdate 
// feeamount 
// contractoraddress 

      data = data.replaceAll('d.serviceprovider', info['employerentity']);
      data = data.replaceAll('d.stateofprovider', info['employerentity']);
      data = data.replaceAll('d.entityprovider', info['employerentity']);
      data = data.replaceAll('d.addressprovider', info['employerentity']);
      data = data.replaceAll('d.customer', info['employerentity']);
      data = data.replaceAll('d.stateofcustomer', info['employerentity']);
      data = data.replaceAll('d.entitycustomer', info['employerentity']);
      data = data.replaceAll('d.addresscustomer', info['employerentity']);
      data = data.replaceAll('d.categoryofservices', info['employerentity']);
      data = data.replaceAll('d.orcontractors', info['employerentity']);
      data = data.replaceAll('d.replacementprovider', info['employerentity']);
      data = data.replaceAll('d.recordkeeping', info['employerentity']);
      data = data.replaceAll('d.feesamount', info['employerentity']);
      data = data.replaceAll('d.paymentschedule', info['employerentity']);
      data = data.replaceAll('d.preapprovalexpenses', info['employerentity']);
      data = data.replaceAll('d.interest', info['employerentity']);
      data = data.replaceAll('d.latereimburse', info['employerentity']);
      data = data.replaceAll('d.suspensionofservices', info['employerentity']);
      data = data.replaceAll('d.term', info['employerentity']);
      data = data.replaceAll('d.breach', info['employerentity']);
      data = data.replaceAll('d.failure', info['employerentity']);
      data = data.replaceAll('d.insurance', info['employerentity']);
      data = data.replaceAll('d.customerofficer', info['employerentity']);
      data = data.replaceAll('d.serviceaddress', info['employerentity']);
      data = data.replaceAll('d.serviceofficer', info['employerentity']);
      data = data.replaceAll('d.statementofwork', info['statementofwork']);
    }

const date = Date.now();
    //pdf conversion here
    var options = { format: 'Letter' };
    pdf_fileName = 'template/pdf_files/'+date+'-'+req.user.accessCode + '-' + intentKey + ' IL.pdf';
pdf.create(data, options).toFile(pdf_fileName, function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});


    //docx conversion here
    console.log(data);
    var converted = htmlDocxJs.asBlob(data);

    fileName = date+'-'+req.user.accessCode + '-' + intentKey + ' IL.docx';
    const documentPath = `${__dirname}/../template/docs_files/${fileName}`;
  await new Promise((resolve, reject) => {
    fs.writeFile(documentPath, converted, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });

  var docapprove = await DocApprove.findOne({user: req.user.email})
    if (!docapprove) {
      docapprove = new DocApprove({
        user: req.user.email,
        approver: approver['email'],
        link: [{
          url: fileName,
          status: "Not approved",
          date: Date.now()
        }]
      });
      docapprove.save();
    }
    else {
      docapprove['link'].push({
        url: fileName,
        status: "Not approved",
        date: Date.now()
      });
      docapprove.save();
    }
    // saveAs(converted, 'zmztets.docx');
    // const fileUrl = await uploadFile(converted);

    // console.log(fileUrl);

    // fs.writeFile("template/zaman_result.docs", converted, function(err) {
    // if(err) {
    //   return console.log(err);
    // }
    //   console.log("The file was saved!");
    // });


  }


  // if (s3bucket) {
  //   //var s3bucket = new AWS.S3({params: {Bucket: 'herokustorage711'}});
  //   s3bucket.createBucket(function () {
  //     var params = {
  //         Key: req.user.accessCode + '-' + intentKey + ' IL.docx', //file.name doesn't exist as a property
  //         Body: converted
  //     };
  //     s3bucket.upload(params, function (err, data) {
  //       if (err) {
  //         console.log('ERROR MSG: ', err);
  //         res.status(500).send(err);
  //       } else {
  //         console.log('Successfully uploaded data');
  //         res.status(200).end();
  //       }
  //     });
  //   });

    

  // }

  Chat.findOne({username: req.user.username}).then(result => {

    if (!result) {
      var chat = new Chat({
        username: req.user.username, content: [{
          sender: req.user.username,
          text: content,
          date: Date.now()
        }, {
          sender: "ELaiNA",
          text: resultText,
          date: Date.now()
        }]
      })
      chat.save()
    }
    else {
      // var chatContent = result.content;
      result.content.push({ sender: req.user.username, text: content, date: Date.now() });
      result.content.push({ sender: "ELaiNA", text: resultText, date: Date.now() });
      result.save();
      // Chat.update({username: req.user.username}, {content: chatContent}, upsert = true);
    }
    // res.json({ status: "success", data: resultText });
  }).catch(err => {
    res.json({ status: "error" });
  })
  return res.json({ status: "success", data: resultText });
}catch (error) {
  console.log(error)
}
  
};

// Display list of all books.
exports.getChats = async function (req, res) {
  let user = req.user;
  let chatcontent = [];
  Chat.findOne({ username: user.username }).then((result) => {
    if (!result) {
      req.session['sessionPath'] = myDialogflow.getSessionPath();
      sessionPath = req.session['sessionPath'];
      var firstHello = 'Hi';
      myDialogflow.chat(firstHello, sessionPath).then(resultText => {
        var chat = new Chat({
          username: user.username,
          content: [{
            sender: "ELaiNA",
            text: resultText,
            date: Date.now()
          }]
        })
        chat.save()
        content = [{
          sender: "ELaiNA",
          text: resultText,
          date: Date.now()
        }]
        res.json({ status: "success", data: content});
      });
    }
    else {
      chatcontent = []
      result.content.map(content => {
        chatcontent.push({
          sender: content.sender,
          text: content.text,
          date: content.date
        })
      });
      res.json({ status: "success", data: chatcontent });
    }
  });
};

// Remove chat history to start conversation over
exports.getFreshChat = async function (req, res) {
  let user = req.user;
  let chatcontent = [];
  console.log("Getting Fresh Chat for user",user.username);
  //This would actually delete the user.... we'll implement that function later
  /* Chat.findOneAndDelete({ username: user.username }).then((result)
      if(result) {
        console.log("Found and Deleted a convo");
      } else {
        console.log("Didnt find any convos");
      }
  ) */


  Chat.findOne({ username: user.username }).then((result) => {
    if (!result) {
      req.session['sessionPath'] = myDialogflow.getSessionPath();
      sessionPath = req.session['sessionPath'];
      var firstHello = 'Hi';
      myDialogflow.chat(firstHello, sessionPath).then(resultText => {
        var chat = new Chat({
          username: user.username,
          content: [{
            sender: "ELaiNA",
            text: resultText,
            date: Date.now()
          }]
        })
        chat.save()
        content = [{
          sender: "ELaiNA",
          text: resultText,
          date: Date.now()
        }]
        res.json({ status: "success", data: content});
      });
    }
    else {
      chatcontent = []
      result.content.map(content => {
        chatcontent = [{
          sender: "ELaiNA",
          text: "Welcome to ELaiNA Chat.",
          date: Date.now()
        }]
      });
      console.log("chatcontent:",chatcontent);
      res.json({ status: "success", data: chatcontent });
    }
  });
};

// Display detail page for a specific book.
exports.book_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};