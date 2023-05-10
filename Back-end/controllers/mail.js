
const utils = require('util')

//const hb = require('handlebars')

const stdModel = require('../models/student')
const nodemailer = require("nodemailer");
const path = require("path")

async function htmlToImage(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const screenshot = await page.screenshot({ type: 'jpeg' });
  await browser.close();
  return screenshot;
}

let transporter = nodemailer.createTransport({
    service:"gmail",
    port: "587",
    // tls: {
    //   rejectUnauthorized: false
    // },
    // secure: false, // use SSL
    auth: {
      user: "mgicodeiti@gmail.com",
      pass: "irpwxydvjuzdocfj" // generated ethereal password
    },
  });
  let ArrImg=[]

//send Mail
let sendMail = async (req, res) => {
   
  const student = await stdModel.findOne({email:req.body.email}).select({__v:0})
 console.log(student)
 if(student.theme == "frozen"){
    ArrImg = ["frozen-1.jpg","frozen-2.png","frozen-3.jpg","frozen-4.jpg","frozen-5.jpg","frozen-6.jpg","frozen-7.jpg","frozen-8.jpg","frozen-9.jpg","frozen-10.jpg","frozen-11.png","frozen-12.jpg","frozen-13.jpg","frozen-14.jpg","frozen-15.jpg","frozen-16.jpg","frozen-17.jpg","frozen-18.jpg","frozen-19.jpg","frozen-20.jpg","frozen-21.jpg"]
    themeImg = ["frozen_theme.jpeg"]
    }
  else{
   ArrImg = ["spider-1.jpg","spider-2.png","spider-3.jpg","spider-4.jpg","spider-5.jpg","spider-6.jpg","spider-7.jpg","spider-8.jpg","spider-9.jpg","spider-10.jpg","spider-11.png","spider-12.jpg","spider-13.jpg","spider-14.jpg","spider-15.jpg","spider-16.jpg","spider-17.jpg","spider-18.jpg","spider-19.jpg","spider-20.jpg","spider-21.jpg","spider-22.jpg","spider-23.jpg","spider-24.jpg"]
   themeImg = ["spider_theme.jpeg"]
  }
  let ArrLen = ArrImg.length-1
  let randomImg = Math.floor(Math.random() * (ArrLen - 0) + 0)


const html_certificate =  `
<div style="background:url(cid:unique1@gmail.com) no-repeat center;background-size: cover;height: 500px;margin: auto; width: 500px; color: #fff;text-align: center;position: relative;">
<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-style:italic">
  <h1 style="padding-top:220px" >Menna </h1>
  <h2 style="" >Course : Angular</h2>
  <h2 style="" >Duration : 5 h</h2>
</div>
</div>
`
const imageBuffer = await htmlToImage(html_certificate);
console.log(imageBuffer)
    let info = await transporter.sendMail({
      from: '"Magicode  👻" <mgicodeiti@gmail.com> ',
      to: "mena01096757508@gmail.com", // list of receivers
      subject: "Congratulations", // Subject line
      text: "How are you?", // plain text body
    //  html:html_certificate ,
      attachments:[{
          filename:ArrImg[randomImg],   
          path:path.join(__dirname, "../Rewards/frozen")+"/"+ArrImg[randomImg],
          // path:"../Back-end/Rewards/"+student.theme+"/"+ArrImg[randomImg],
        //  cid:'unique@gmail.com'
      },
      {
        filename:themeImg,
        path:path.join(__dirname, "../background_Imgs")+"/"+themeImg,
        // path:"../Back-end/Rewards/"+student.theme+"/"+ArrImg[randomImg],
        cid:'unique1@gmail.com'
    },
    ]
    });
  
    await transporter.sendMail(info,(err) =>{
      if(err){
         // console.log('error')
          res.status(400).json({message:'error'})
      }
      else{
         // console.log('email has been sent')
          res.status(200).json({message:'email has been sent'})
      }

    })
}

module.exports = {
    sendMail 

}

