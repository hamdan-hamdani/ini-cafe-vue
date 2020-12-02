// import Store from '../store/index'
// var nodemailer = require('nodemailer')
// var fs = require('fs')

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'mychat709@gmail.com',
//     pass: 'Konsisten1!'
//   }
// })

// var template = fs.readFileSync('index.html', 'utf-8')

// var mailOptions = {
//   from: 'mychat709',
//   to: Store.getters.getUser,
//   subject: 'Selamat Datang di MyChat',
//   html: template
//   // text: 'That was easy!'
//   // html: '<h1>Selamat Menggunakan MyChat App</h1><p>bagikan kemudahan menggunakan MyChat App dengan sosmedmu</p><br><br><br><br><br><p><b>Hormat kami tim MyChat App</b></p>'
//   // html: fs.readFile('index.html', (err, data) => {
//   //     if (err) throw err;
//   //     return data.toString('utf8');
//   // })
// }
// // fs.readFile('index.html', (err, data) => {
// //     if (err) throw err;
// //     // console.log(data)
// //     mailOptions.html = data.toString('utf8');
// //     // console.log(mailOptions.html)
// // })
// console.log(mailOptions.html)
// const sendEmail = {
//   kirimEmail: () => {
//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) throw err
//       console.log('Email sent: ' + info.response)
//     })
//   }
// }
// module.exports = sendEmail
