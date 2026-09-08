import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options)=>{
    const mailGenerator = new Mailgen({
        theme: "default",
        product:{
            name:"Taskmint",
            link:"https://taskmint.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        }
    })

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml,
    }
    try{
        await transporter.sendMail(mail)
    } catch (error){
        console.error("Email server failed, Make sure you've provided right credentials")
        console.error("Error:",error)
    }
}



const emailVerificationMailgen = (username, verificationUrl)=>{
    return{
        body:{
            name: username,
            intro: "Welcome to Project Management Platform!",
            action:{
                instructions: "To Verify your email please click on the following button",
                button:{
                    color: "#22BC66",
                    text: "Confirm your account",
                    link: verificationUrl
                },
            },
            outro: "Need Help or have any questions? Reply to this mail.",
        },
    };
};

const forgotPasswordMailgen = (username, passwordResetUrl)=>{
    return{
        body:{
            name: username,
            intro: "Request to reset the password of your account",
            action:{
                instructions: "To reset your password please click on the following button",
                button:{
                    color: "#22BC66",
                    text: "Reset Password",
                    link: passwordResetUrl
                },
            },
            outro: "Need Help or have any questions? Reply to this mail.",
        },
    };
};

export{
    emailVerificationMailgen,
    forgotPasswordMailgen,
    sendEmail,
};