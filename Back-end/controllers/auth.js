const stdModel = require("../models/student");
const adminModel = require("../models/admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

dotenv.config();

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, email, adminRole) => {
  return jwt.sign(
    { user_id: id, user_email: email, adminRole: adminRole },
    "token_key_secret",
    {
      expiresIn: maxAge,
    }
  );
};
//transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  // tls: {
  //   rejectUnauthorized: false
  // },
  // secure: false, // use SSL
  auth: {
    // user: "magdicode@gmail.com",
    // pass: "tguoacmtzugnzpht"
    user: "mgicodeiti@gmail.com",
    pass: "irpwxydvjuzdocfj", // generated ethereal password
  },
  port: "587",
});

//signup
let signup = async (req, res) => {
  var foundEmail = await stdModel.findOne({ email: req.body.email });
  if (foundEmail) {
    return res.status(400).json({ message: "this email Already Exist" });
  }
  try {
    let profile_img;
    if (req.file == undefined) {
      profile_img = "http://localhost:7000/image_1683239051966person-icon.png";
    } else {
      profile_img = `http://localhost:7000/${req.file.filename}`;
    }

    let std = new stdModel({
      ...req.body,
      profile_Img: profile_img,
    });

    await std.save();
    // let std = new adminModel(req.body);
    // await std.save();

    //create token
    const token = createToken(std._id, std.email, std.adminRole);
    res.header({ "x-auth-token": token });

    //send email confirmation
    let info = await transporter.sendMail({
      from: '"Magicode  👻" <mgicodeiti@gmail.com> ',
      to: req.body.email, // list of receivers
      subject: "confirmed email", // Subject line
      text: "login", // plain text body
      html: `
        <div style="background-color:#bbf;color:green;text-align:center">
        <h1><a href="http://localhost:4200/activateEmail">Click here to confirmed</a></h1>
        </div>
      `, // html body
    });

    await transporter.sendMail(info, (err) => {
      if (err) {
        // console.log('error')
        res.status(400).json({ message: "error" });
      } else {
        // console.log('email has been sent')
        res.status(200).json({ message: "email has been sent" });
      }
    });
    res
      .status(200)
      .json({
        message: "signup successfully",
        "x-auth-token": token,
        confirm: std.confirm,
      });
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[0].message);
      res.status(400).json({ message: "Bad Request .. Some Fields" });
    }
  }
};
/////////////Login//////////////////
let login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check email in admin
    const admin = await adminModel.findOne({ email: req.body.email });
    //  console.log(admin)

    //check email in student
    const student = await stdModel.findOne({ email: req.body.email });

    if (!student && !admin)
      return res.status(400).json({ message: "Invalid email or password" });

    // if user is student
    if (student != null) {
      //console.log(student)
      //check confirm
      //  if(!student.confirm){
      //   return res.status(400).json({ message: "you should activate your email first"});
      //  }
      //  else{
      const auth = await bcrypt.compare(password, student.password);
      // console.log(auth)
      if (!auth) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      //  create token
      const token = createToken(student._id, student.email, student.adminRole);
      res.header({ "x-auth-token": token });

      return res
        .status(201)
        .json({
          message: "Login successfully",
          confirm: student.confirm,
          "x-auth-token": token,
        });

      //}
      // res.status(201).json({ message: "Login successfully" , "x-auth-token": token  });
      //res.json(token)
    }
    //if user is admin
    else if (admin != null) {
      //let admin = await adminModel.login(email, password);
      const auth = await bcrypt.compare(password, admin.password);
      console.log(auth);
      if (!auth) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = createToken(admin._id, admin.email, admin.adminRole);
      res.header({ "x-auth-token": token });
      res
        .status(201)
        .json({ message: "Login successfully", "x-auth-token": token });
    }
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[0].message);
      res.status(400).json({ message: "Bad Request .. Some Fields" });
    }
  }
};
//confirm email
let confirmEmail = async (req, res) => {
  //  let newStd = await stdModel.findByIdAndUpdate(decode.user_id,updataStudent)
  let token = req.body.token;
  //  console.log(token)
  jwt.verify(token, "token_key_secret", async function (err, decode) {
    let updateStd = await stdModel.findByIdAndUpdate(decode.user_id, {
      confirm: true,
    });
    //console.log(decode)
    res.json({
      message: "confirmed",
      token: token,
      confrim: updateStd.confirm,
    });
  });
};
//forget Password
let forgetPassword = async (req, res) => {
  //create token
  const student = await stdModel.findOne({ email: req.body.email });
  console.log(student);
  if (!student) {
    return res.status(400).json({ message: "email not exist" });
  }

  const token = createToken(student._id, student.email, student.adminRole);
  res.header({ "x-auth-token": token });

  let info = await transporter.sendMail({
    from: '"Magicode  👻" <magdicode@gmail.com> ',
    to: req.body.email, // list of receivers
    subject: "change password", // Subject line
    text: "login", // plain text body
    html: `
      <div style="background-color:#bbf;color:green;text-align:center">
      <h1><a href="http://localhost:4200/chagePassword">Click here to change Password</a></h1>
      </div>
    `, // html body
  });

  await transporter.sendMail(info, (err) => {
    if (err) {
      // console.log('error')
      res.status(400).json({ message: "error" });
    } else {
      // console.log('email has been sent')
      res.status(200).json({ message: "email has been sent" });
    }
  });
  res.status(200).json({ message: "change password ", data: token });
};

let updatePassword = async (req, res) => {
  let { password, token } = req.body;
  //let token = req.params.token
  //  console.log(token)
  jwt.verify(token, "token_key_secret", async function (err, decode) {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    let updateStd = await stdModel.findByIdAndUpdate(decode.user_id, {
      password: password,
    });

    //console.log(updateStd)
    //res.json({message:"changed Succeesfully",updateStd})
  });
  res
    .status(200)
    .json({ message: "change password successfully", "x-auth-token": token });
};
module.exports = {
  signup,
  login,
  confirmEmail,
  forgetPassword,
  updatePassword,
};
