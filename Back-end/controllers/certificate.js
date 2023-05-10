const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const nodemailer = require("nodemailer");
const themeModel = require("../models/theme_Images");
const stdModel = require('../models/student')

const homeview = (req, res, next) => {
    res.render('home');
}

const generatePdf = async (req, res, next) => {
    const {email,name,course_name,duration,theme}= req.body
    const student = await stdModel.findOne({email:req.body.email}).select({__v:0})
    
   // console.log(student)
    
    let bg_Img=''
     if(theme == "frozen"){
        ArrImg = ["frozen-1.jpg","frozen-2.png","frozen-3.jpg","frozen-4.jpg","frozen-5.jpg","frozen-6.jpg","frozen-7.jpg","frozen-8.jpg","frozen-9.jpg","frozen-10.jpg","frozen-11.png","frozen-12.jpg","frozen-13.jpg","frozen-14.jpg","frozen-15.jpg","frozen-16.jpg","frozen-17.jpg","frozen-18.jpg","frozen-19.jpg","frozen-20.jpg","frozen-21.jpg"]
        themeImg = ["frozen_theme.jpeg"]
        bg_Img= 'http://localhost:7000/images_1683677479794frozen_theme.jpeg'
       }
    else{
    ArrImg = ["spider-1.png","spider-2.jpg","spider-3.jpg","spider-4.jpg","spider-5.jpg","spider-6.jpg","spider-7.jpg","spider-8.jpg","spider-9.jpg","spider-10.jpg","spider-11.png","spider-12.jpg","spider-13.jpg","spider-14.jpg","spider-15.jpg","spider-16.png","spider-17.jpg","spider-18.jpg","spider-19.jpg","spider-20.jpg","spider-21.jpg","spider-22.jpg","spider-23.jpg","spider-24.jpg"]
    themeImg = ["spider_theme.jpeg"]
    
    bg_Img= 'http://localhost:7000/images_1683677479813spider_theme.jpeg'
    }
    let ArrLen = ArrImg.length-1
    let randomImg = Math.floor(Math.random() * (ArrLen - 0) + 0)

    //crete pdf
        const html = fs.readFileSync(path.join(__dirname, '../views/template.html'), 'utf-8');
        const filename = 'certificate_' + Math.random() +  '.pdf';
        const document = {
            html: html,
            data: {
                // products: obj
                student: {name:name,course:course_name,duration:duration,bg_Img:bg_Img}
            },
            path: './docs/' + filename
        }

        let options = {
            formate: 'A3',
            orientation: 'portrait',
            border: '2mm',
            // header: {
            //     height: '5mm',
            //     contents: '<h4 style=" color: red;font-size:20;font-weight:800;text-align:center;">CUSTOMER INVOICE</h4>'
            // },
            // footer: {
            //     height: '5mm',
            //     contents: {
            //         first: 'Cover page',
            //         2: 'Second page',
            //         default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', 
            //         last: 'Last Page'
            //     }
            // }
        }
        pdf.create(document, options)
            .then(async data => {
               // console.log(data);     
                //maillll transporter
        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                // user: "magdicode@gmail.com",
                // pass: "tguoacmtzugnzpht" 
             user: "mgicodeiti@gmail.com",
             pass: "irpwxydvjuzdocfj" // generated ethereal password
            },
              tls: {
            rejectUnauthorized: false
        },
        secure: false, // use SSL
        });

      //send email confirmation
      let info =  transporter.sendMail({
        from: '"Magicode  👻" <magdicode@gmail.com> ',
        to: req.body.email, // list of receivers
        subject: "Congratulations", // Subject line
        text: "Your Prize & Certificate", // plain text body

       attachments:[
        {
            filename:data.filename,
            path:data.filename
        },
        {
            filename:ArrImg[randomImg],
            
            path:path.join(__dirname, "../Rewards/")+theme+"/"+ArrImg[randomImg],
            // path:"../Back-end/Rewards/"+student.theme+"/"+ArrImg[randomImg],
          //  cid:'unique@gmail.com'
        },
       ]
      });

      await transporter.sendMail(info,(err) =>{
        if(err){
           // console.log('error')
          return  res.json({message:'sent email'})
        }
        else{
           // console.log('email has been sent')
            res.status(200).send({message:'email has been sent'})
        }
      })
     
    const filepath = 'http://localhost:7000/docs/' + filename;
                    
            })

            // res.render('download', {
            //     path: filepath
            // });
}

let uploadThemes =  async (req,res) =>{  
    try{
        //console.log(req.body);
            let upload_imgs=[] ;   
            if(req.files){
                req.files.forEach((file) => {
                    upload_imgs.push(`http://localhost:7000/${file.filename}`)
                });
            }
            let newthemes = new themeModel(
                 {
                    theme_Imgs:upload_imgs
                 }
             ) 
             await newthemes.save()    
             res.status(200).json({message:"Added Images Successfully"})
        }
    
    catch(err){
    for(let e in err.errors){
        console.log(err.errors[0].message);
        res.status(400).json({message:"Bad Request .. Some Fields"})
    }
    }
}

module.exports = {
    homeview,
    generatePdf,
    uploadThemes
}