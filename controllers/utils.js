// const moment = require('moment');

// const isEmpty = (val) => {
//     let typeOfVal = typeof val;
//     switch(typeOfVal){
//         case 'object':
//             return (val.length == 0) || !Object.keys(val).length;
//             break;
//         case 'string':
//             let str = val.trim();
//             return str == '' || str == undefined;
//             break;
//         case 'number':
//             return val == '';
//             break;
//         default:
//             return val == '' || val == undefined;
//     }
// }

// const decodeToken = (authHeader) => {

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.decode(token);

//         if(!decoded) {
//             return null;
//         }

//         delete decoded.iat;
//         delete decoded.exp;
//         delete decoded.iss;

//         return decoded;
        
//     } catch (err) {
//         console.log('Error while token decode', err);
//         return {
//             id: null,
//             name: null,
//             email: null,
//             phone: null,
//             emailValidated: 0
//         };
//     }

// }

// const validateToken = (req, res, next) => {
    
//     let _result = {
//         status: 403,
//         data: {},
//         message: 'Authentication token is required.'
//     }
    
//     const authorizationHeaader = req.headers.authorization;

//     if(!authorizationHeaader || isEmpty(authorizationHeaader)) {
//         return res.status(_result.status).send(_result);
//     }

//     const token = req.headers.authorization.split(' ')[1];
//     const options = {
//         expiresIn: '2d',
//         issuer: 'skilramp'
//     };
//     try {
//         req.decoded = jwt.verify(token, process.env.JWT_SECRET, options);
//         if(!req.decoded) {
//             const __result = {
//                 ..._result,
//                 message: 'Authentication error'
//             }
//             return res.status(__result.status).send(__result);    
//         }
//         next();
//     } catch (err) {
//         console.log('Error while token verification', err);
//         const __result = {
//             ..._result,
//             status: 401,
//             message: 'Your session is expired. Please login again.'
//         }
//         return res.status(__result.status).send(__result);
//     }
// }

// const uuid = () => {
//     return 'xyyxxxxyxyxxxxx'.replace(/[xy]/g, function(c) {
//         var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     });
// }

// const generateOtp = () => {
//     return 'xxxx'.replace(/[x]/g, function(c) {
//         return Math.floor(Math.random()*10);
//     });
// }

// const nowPlus30Mins = () => moment.utc().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
// const now = () => moment.utc().format('YYYY-MM-DD HH:mm:ss');

// const generateOtpAndHashAndStore = email => new Promise((resolve, reject) => {
    
//     let _otp = generateOtp();

//         Otp.upsert({
//             email: email,
//             otp_hash: _otpHash,
//             expires_at: nowPlus30Mins() 
//         })
//         .then(status => {
//             console.log(_otp);
//             sendEmail(
//                 email,
//                 `Skilramp - OTP - ${_otp}`,
//                 `Your OTP for authentication is ${_otp}. Please note that it is valid for 30 min.`
//             )
//             .then(() => {
//                 resolve();
//             })
//             .catch(err => {
//                 reject();
//             });
//         })
//         .catch(err => {
//             console.log('Auth.js > otpRequest', 'error in saving the otp', req.body, err);
//             reject();
//         });

//     });
// });

// const getPresignedUrl = (uploadDir, fileName, fileFormat, fileContentType) => new Promise((resolve, reject) => {

//     const s3 = new AWS.S3({

//     s3.getSignedUrl('putObject', params, function (err, url) {
//         if(err) {
//             reject(err);
//         } else {
// });

// const uploadFileToS3 = (uploadDir, fileName, fileFormat) => new Promise((resolve, reject) => {
//     const s3 = new AWS.S3({
//         signatureVersion: 'v4',

//         const params = {
//             Key: (uploadDir+"/"+fileName+"."+fileFormat),
//             Body: data
//         };

//         s3.upload(params, (s3Err, data) => {

//             if (s3Err) reject(err);

//             resolve(data.Location);
//         });

//     });

// });

// const sendEmail = (email, subject, content) => new Promise((resolve, reject) => {

//     const sender = "Skilramp <reachus@skilramp.com>";

//     const recipient = email;
//     // const recipient = 'reachus@skilramp.com';

//     const body_html = `
//         <html>
//             <head></head>
//             <body>
//                 <p>Hi ${email}</p>
//                 <br />
//                 ${content}
//                 <br /><br />
//                 Warm Reagrds,
//                 <br />
//                 Team Skilramp
//             </body>
//         </html>
//     `;

//     const charset = "UTF-8";

//     var ses = new AWS.SES();

//     var params = { 
//         Source: sender, 
//         Destination: { 
//             ToAddresses: [
//                 recipient 
//             ],
//         },
//         Message: {
//             Subject: {
//                 Data: subject,
//                 Charset: charset
//             },
//             Body: {
//                 // Text: {
//                 //     Data: body_text,
//                 //     Charset: charset 
//                 // },
//                 Html: {
//                     Data: body_html,
//                     Charset: charset
//                 }
//             }
//         }
//     };

//     ses.sendEmail(params, function(err, data) {
//         if(err) {
//             console.log('Error in sending message', err.message);
//             reject();
//         } else {
//             resolve();
//         }
//     });
// });

// const sendEmailForRegistration = (email, subject, content) => new Promise((resolve, reject) => {

//     const sender = "Skilramp <reachus@skilramp.com>";

//     const recipient = email;
//     // const recipient = 'reachus@skilramp.com';

//     const body_html = `
//         <html>
//             <head></head>
//             <body>
//                 <p>${content}</p>
//                 <br />
//                 Congratulations for taking a step ahead in upgrading your skills. You are successfully registered on SkilRamp.com.
//                 <br/>
//                 Now visit <a href="www.skilramp.com">skilramp.com</a> to explore upcoming insightful webinars/sessions in your area of interest.
//                 <br/>
//                 With this registration, you are also entitled to recurring newsletters and updates to be delivered straight to your mailbox on upcoming webinars.
//                 <br /><br />
//                 Happy skill building to you :)
//                 <br /><br />
//                 For any query/concern/feedback, kindly contact us at <a href="reachus@skilramp.com">reachus@skilramp.com</a>
//                 <br /><br />
//                 Warm Regards,
//                 <br />
//                 Team Skilramp
//             </body>
//         </html>
//     `;

//     const charset = "UTF-8";

//     var ses = new AWS.SES();

//     var params = { 
//         Source: sender, 
//         Destination: { 
//             ToAddresses: [
//                 recipient 
//             ],
//         },
//         Message: {
//             Subject: {
//                 Data: subject,
//                 Charset: charset
//             },
//             Body: {
//                 // Text: {
//                 //     Data: body_text,
//                 //     Charset: charset 
//                 // },
//                 Html: {
//                     Data: body_html,
//                     Charset: charset
//                 }
//             }
//         }
//     };

//     ses.sendEmail(params, function(err, data) {
//         if(err) {
//             console.log('Error in sending message', err.message);
//             reject();
//         } else {
//             resolve();
//         } 
//     });
// });

// const sendEmailWebinarRegister = (details) => new Promise((resolve, reject) => {
//     const sender = "Skilramp <reachus@skilramp.com>";
    
//     const recipient = details[0].email;
//     // const recipient = 'reachus@skilramp.com';

//     let localDateTime = utcToLocalExplicit(new Date(details[0].start_time));

//     let _date = formatDate(localDateTime, 'DD MMMM YYYY');
//     let _startTime = formatTime(localDateTime);

//     const subject = `SkilRamp Calendar - ${details[0].title}`;
 
//     const body_html = `
//         <html>
//             <head></head>
//             <body>
//                 <p>Dear ${details[0].name},</p>
//                 <br />
//                 Thank you for exploring webinars/sessions on <a href="www.skilramp.com">skilramp.com</a>
//                 <br/>
//                 For your quick reference, please find below details on the same.
//                 <br />
//                 Webinar Title: ${details[0].title}
//                 <br />
//                 Date: ${_date}
//                 <br />
//                 Time: ${_startTime}
//                 <br />
//                 Registration Link: ${details[0].registration_link}
//                 <br/><br/>
//                 Please complete the registration process on the above mentioned link.
//                 <br /><br />
//                 With this registration, you are also entitled to recurring newsletters and updates to be delivered straight to your mailbox on upcoming webinars.
//                 <br /><br />
//                 For your future reference we have added your selected webinar(s) in SkilRamp calendar. Please visit <a href="https://skilramp.com/my-calendar">my-calendar</a> for tracking all your upcoming webinar sessions.
//                 <br /><br />
//                 Happy skill building to you :)
//                 <br /><br />
//                 For any query/concern/feedback, kindly contact us at <a href="reachus@skilramp.com">reachus@skilramp.com</a>
//                 <br /><br />
//                 Warm Regards,
//                 <br />
//                 Team Skilramp
//             </body>
//         </html>
//     `;

//     const charset = "UTF-8";

//     var ses = new AWS.SES();

//     var params = { 
//         Source: sender, 
//         Destination: { 
//             ToAddresses: [
//                 recipient 
//             ],
//         },
//         Message: {
//             Subject: {
//                 Data: subject,
//                 Charset: charset
//             },
//             Body: {
//                 // Text: {
//                 //     Data: body_text,
//                 //     Charset: charset 
//                 // },
//                 Html: {
//                     Data: body_html,
//                     Charset: charset
//                 }
//             }
//         }
//     };

//     ses.sendEmail(params, function(err, data) {
//         if(err) {
//             console.log('Error in sending message', err.message);
//             reject();
//         } else {
//             resolve();
//         }
//     });
// });

// const slugify = (text) => {
    
//     text = text.trim();
//     text = text.replace(/[^a-zA-Z0-9 -]/g, '');
//     text = text.replace(/ /g, '-');
//     text = text.trim();
    
//     text = text.toLowerCase();

//     if (text === "") {
//         return false;
//     }
    
//     return text;

// };

// const isDateAfter180Days = (today, webinarDate) => {
//     let diffTime = Math.abs(new Date(webinarDate) - new Date(today));
//     let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     console.log(diffDays + " days");
//     if (diffDays > 180) {
//         return true;
//     }
//     return false
// }

// const convertUTCDateToLocalDate = (date) => {
//    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

//     var offset = date.getTimezoneOffset() / 60;
//     var hours = date.getHours();

//     newDate.setHours(hours - offset);

//     return newDate;  
// }

// const utcToLocalExplicit = (UtcDateTime) => {
//     return moment(UtcDateTime).add(330, 'minutes').toDate();
// }

// const formatDate = (dateObj, f = 'YYYY-MM-DD') => {
//     return moment(dateObj).format(f);
// }

// const formatTime = (dateObj, f = 'h:mm A') => {
//     return moment(dateObj).format(f);
// }

// module.exports = {
//     empty: isEmpty,
//     validateToken: validateToken,
//     decodeToken: decodeToken,
//     uuid: uuid,
//     generateOtp: generateOtp,
//     nowPlus30Mins: nowPlus30Mins,
//     generateOtpAndHashAndStore: generateOtpAndHashAndStore,
//     now: now,
//     sendEmail: sendEmail,
//     sendEmailForRegistration: sendEmailForRegistration,
//     sendEmailWebinarRegister: sendEmailWebinarRegister,
//     getPresignedUrl: getPresignedUrl,
//     uploadFileToS3: uploadFileToS3,
//     slugify: slugify,
//     isDateAfter180Days: isDateAfter180Days,
//     randomIntFromInterval: function (min, max) {
//         return Math.floor(Math.random() * (max - min + 1) + min);
//     }
// }