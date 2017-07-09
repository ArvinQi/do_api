'use strict';

const Fs = require('fs');
const NodeMailer = require('nodemailer');
const Parameters = require('../../../config/parameters').mail;
const Ejs = require('ejs');

const gmailTransport = NodeMailer.createTransport({
  host: 'smtpdm.aliyun.com',
  port: 465,
  auth: {
    user: Parameters.userName,
    pass: Parameters.password

    // "userName": "arvinqi_test_73KQnF",
    // "password": "17QDAuWO6uR3Bn9y"
  }
});

exports.getMailTemplate = (path) => {
  return Fs.readFileSync(path, 'utf8');
};

exports.sendHtmlEmail = (subject, templateFile, email, datas) => {
  let template = Ejs.compile(templateFile.toString());
  let mailOptions = {
    from: Parameters.email,
    to: email,
    subject: subject,
    html: template(datas)
  };

  gmailTransport.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
    gmailTransport.close();
  });
};