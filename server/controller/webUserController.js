const { WebUser } = require("../model/WebUser")
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
const moment = require("moment")

let privateKey = "ironmaiden"

const webUserController = {
    register: (req, res) => {

        let email = req.body?.email.toLowerCase();
        WebUser.findOne({ email: email })
            .then(data => {
                //Öncelikle bu kullanıcı var mı check ediyorum
                if (data) {
                    res.status(500).json({ 'msg': 'Böyle bir kullanıcı mevcut' })
                }
                else {
                    //bir adet confirm code generate ediyorum

                    let confirmCode = Math.floor(Math.random() * 10000) // code review yapılacak. confirm code 35 de olabilir :D

                    let codeExpire = moment().add("59", "s")
                    const webUser = new WebUser({
                        email: email,
                        password: req.body.password,// danger area. !!! password asla gözükmemeli. code review olacak!
                        code: confirmCode,
                        codeExpire: codeExpire
                    });

                    webUser.save();

                    sendConfirmEMail(email, confirmCode)


                    res.json({ email })


                }
            })
            .catch(err => {
                res.status(500).json(err)
            })

    },
    confirm: (req, res) => {
        let code = req.body.code;
        let email = req.body.email;
           console.log(email);
           console.log(code);
        WebUser.findOne({ email })
            .then(user => {
       
                if (user.codeCounter == 0) {
                    res.status(500).json({ "message": "BLOCK!!" })
                }
                else {
                    if (user.code == code) {
                        if (user.codeExpire > moment()) {
                            let token = jwt.sign(email, privateKey);
                            user.isActive = true;
                            user.codeCounter = 3;
                            user.save();
                            res.json({ token })
                        }
                        else {
                            res.status(500).json({ "message": "Expire Date Error!" })
                        }

                    }
                    else {
                        user.codeCounter = user.codeCounter - 1;
                        user.save();
                        res.status(404).json({ "confirm code error:!": "Kalan hakkınız " + user.codeCounter })
                    }
                }


            })
    },
    login: (req, res) => {
        WebUser.findOne({ email: req.body.email, password: req.body.password, isActive: true })
            .then(user => {
                if (user) {

                    let confirmCode = Math.floor(Math.random() * 10000) // code review yapılacak. confirm code 35 de olabilir :D

                    let codeExpire = moment().add("30", "s")

                    user.code = confirmCode;
                    user.codeExpire = codeExpire
                    user.save();

                    sendConfirmEMail(req.body.email, confirmCode)
                    res.json({ "email": req.body.email })

                }
                else {
                    res.status(404).json({ "message": "email or password wrong!" })
                }
            })
            .catch(err => {
                res.status(500).json(err);
            })

    },
    token: (req, res) => {

        let token = req.body.token;

        try {
            jwt.verify(token, privateKey);
            res.json({ "message": "Success" })
        } catch (error) {
            res.status(500).json({ "message": "Token error!" })
        }

    }
}





const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: 'login',
        user: "c8657545@gmail.com",
        pass: "bcozssymjajpqicg",
    },
});


function sendConfirmEMail(to, code) {
    transporter.sendMail({
        from: 'c8657545@gmail.com', // sender address
        to: to, // list of receivers
        subject: "Confirm Code: ", // Subject line
        text: "Your confirm code: " + code, // plain text body
    });
}



module.exports = {
    webUserController
}