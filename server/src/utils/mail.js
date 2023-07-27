//  const nodemailer = require('nodemailer')


exports.genereateOPT=(opt_length=6)=>{
    let OPT="";
    for(let i=1; i<=opt_length; i++){
        const randomVal = Math.round(Math.random() * 9);
        OTP += randomVal;
    }

    return OPT
}

// exports.generateMailTransporter = () =>
//     nodemailer.createTransport({
//         host: "smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//             user: process.env.MAIL_TRAP_USER,
//             pass: process.env.MAIL_TRAP_PASS
//         }
//     });




// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'octacoderfyi@gmail.com',
//         pass: 'obdqaqoqhywjekgm'
//     }
// });

// let mailOptions = {
//     from: 'octacoderfyi@gmail.com',
//     to: ['octacoderfyi@gmail.com','pitar.petroli@gmail.com'],
//     cc: 'octacoderfyi@gmail.com',
//     subject: 'Email With Attachments Testing',
//     html: `<h1 style="color: Aqua">Welcome To OctaCoder</h1> <p>Please Subscribe OctaCoder Youtube Channel</p>
//     <h4 style="color: red">"Learn The Way, Create Your Own Way"</h4>
//     <a href="https://www.youtube.com/@octacoder">SubScribe OctaCoder</a>`,
//     attachments:[
//         {
//             filename: 'image.png',
//             path: './Files/thumbnail.png'
//         },
//         {
//             filename: 'Document.doc',
//             path: './Files/htmlDoc.docx'
//         },
//         {
//             filename: 'HtmlPDF.pdf',
//             path: './Files/htmlAllTag.pdf'
//         },
//         {
//             filename: 'nodejs.png',
//             path: './Files/nodejs.png'
//         }
//     ]
// };

// transporter.sendMail(mailOptions, (error, info) => {
//     if(error){
//         console.log('Erroe Occured ' + error);
//     }else {
//         console.log("Email Sent Successfully to " + mailOptions.to);
//     }
// });