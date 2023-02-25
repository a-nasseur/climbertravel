import { NextApiRequest, NextApiResponse } from "next";

const nodemailer = require("nodemailer");

type Data = {
  
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method == 'POST'){
        const { fullName, email, phoneNumber, message } = req.body;

        // Transporter init
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true, 
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD
            }
          });

          
        // Email content
        let info = await transporter.sendMail({
          from: `${email}`, // sender address
          to: "contact@climbertravel.com", // list of receivers
          subject: "Demande D'information | Formulaire en ligne Climber Travel",
          html: 
          `   
                <div style="padding: 30px; ">
                <h3 style="text-align: center; margin-bottom: 50px;">Demande de badge</h3>
                <p style="color: #5B113C; font-weight: bold;">Nom et prenom: <span style="color: black;">${fullName}</span></p>
                <p style="color: #5B113C; font-weight: bold;">Email: <span style="color: black;">${email}</span></p>
                <p style="color: #5B113C; font-weight: bold;">Numero de telephone: <span style="color: black;">${phoneNumber}</span></p>
                <p style="color: #5B113C; font-weight: bold;">Message : <span style="color: black;">${message}</span></p>
                </div>

          `, // html body

        }, (err: any, info: any) => {
          if(err){
            return res.status(500).json({
              success: false,
              data: {
                message: "Erreur lors de l'envoie de votre email",
                error: err.message
              }
            })
          }
          // loggin the email sent object
          return res.status(200).json({
            success: true,
            data: {
              message: 'Email envoyé avec succès',
              messageId: info.messageId,
              envlope: info.envelope,
              acceptance: info.accepted,
              rejected: info.rejected,
              pending: info.pending,
              response: info.response
            }
          })
        });
    } else {
      return res.status(400).send({
        message: req.method + ' request not allowed'
      })
    }

  }