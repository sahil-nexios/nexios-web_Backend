
const handlebars = require('handlebars');
const fs = require('file-system')
const nodemailer = require('nodemailer')


const schedule = (sendData) => {
    return new Promise((resolve, reject) => {
        try {
            var file_template = sendData.file_template;
            var subject = sendData.subject;

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.Your_EMAIL,
                    pass: process.env.Your_App_Password
                }
            });

            fs.readFile(file_template, { encoding: 'utf-8' }, function (err, html) {
                if (err) {
                    console.error("Error reading file:", err);
                    reject({ status: false, data: [], message: 'Could not read email template file!' });
                }

                var template = handlebars.compile(html);
                var htmlToSend = template(sendData);

                var mailOptions = {
                    from: process.env.Your_EMAIL,
                    to: process.env.To_EMAIL, // Assuming 'to' is the recipient's email address
                    subject: subject,
                    html: htmlToSend
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                        return { status: false, data: [], message: 'Could not send mail!' };
                    }

                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    return { status: true, data: [], message: 'Mail sent successfully!' };
                });
            });
        } catch (error) {
            console.error("Error in sending email:", error);
            return { status: false, data: [], message: 'Unable to send email!' }
        }
    });
};

const apply_nowEmail = async (mailData) => {
    return new Promise((resolve, reject) => {
        try {
            var subject = mailData.subject;
            let resumeFile = fs.readFileSync(mailData.pdfpath);
            var file_template = mailData.file_template;

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.Your_EMAIL,
                    pass: process.env.Your_App_Password
                }
            });



            fs.readFile(file_template, { encoding: 'utf-8' }, function (err, html) {
                if (err) {
                    console.error("Error reading file:", err);
                    reject({ status: false, data: [], message: 'Could not read email template file!' });
                }

                var template = handlebars.compile(html);
                var htmlToSend = template(mailData);

                var mailOptions = {
                    from: process.env.Your_EMAIL,
                    to: process.env.To_EMAIL, // Assuming 'to' is the recipient's email address
                    subject: "Job Application",
                    html: htmlToSend,
                    attachments: [
                        {
                            filename: 'resume.pdf',
                            content: resumeFile
                        }
                    ]
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                        return { status: false, data: [], message: 'Could not send mail!' };
                    }

                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    return { status: true, data: [], message: 'Mail sent successfully!' };
                });
            });


            // let additionalData = `
            //     firstName: ${mailData.firstName}
            //     lastName: ${mailData.lastName}
            //     email: ${mailData.email}
            //     Phone: ${mailData.phone}
            //     subject: ${mailData.subject}`;

            // let mailOptions = {
            //     from: process.env.Your_EMAIL,
            //     to: process.env.To_EMAIL,
            //     subject: 'Job Application',
            //     text: 'Please find my resume attached.\n\n' + additionalData,
            //     attachments: [
            //         {
            //             filename: 'resume.pdf',
            //             content: resumeFile
            //         }
            //     ]

            // };
            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //         console.error("Error sending email:", error);
            //         return { status: false, data: [], message: 'Could not send mail!' };
            //     }

            //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            //     return { status: true, data: [], message: 'Mail sent successfully!' };
            // });
            // fs.readFile(file_template, { encoding: 'utf-8' }, function (err, html) {
            //     if (err) {
            //         console.error("Error reading file:", err);
            //         reject({ status: false, data: [], message: 'Could not read email template file!' });
            //     }

            //     var template = handlebars.compile(html);
            //     var htmlToSend = template(sendData);

            //     var mailOptions = {
            //         from: process.env.Your_EMAIL,
            //         to: process.env.To_EMAIL, // Assuming 'to' is the recipient's email address
            //         subject: subject,
            //         html: htmlToSend
            //     };

            //     transporter.sendMail(mailOptions, (error, info) => {
            //         if (error) {
            //             console.error("Error sending email:", error);
            //             return { status: false, data: [], message: 'Could not send mail!' };
            //         }

            //         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            //         return { status: true, data: [], message: 'Mail sent successfully!' };
            //     });
            // });
        } catch (error) {
            console.error("Error in sending email:", error);
            return { status: false, data: [], message: 'Unable to send email!' }
        }
    });
}


const contact_usemail = async (sendData) => {
    try {
        return new Promise((resolve, reject) => {
            try {
                var file_template = sendData.file_template;
                var subject = sendData.subject;

                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.Your_EMAIL,
                        pass: process.env.Your_App_Password
                    }
                });

                fs.readFile(file_template, { encoding: 'utf-8' }, function (err, html) {
                    if (err) {
                        console.error("Error reading file:", err);
                        reject({ status: false, data: [], message: 'Could not read email template file!' });
                    }

                    var template = handlebars.compile(html);
                    var htmlToSend = template(sendData);

                    var mailOptions = {
                        from: process.env.Your_EMAIL,
                        to: process.env.To_EMAIL, // Assuming 'to' is the recipient's email address
                        subject: subject,
                        html: htmlToSend
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error("Error sending email:", error);
                            return { status: false, data: [], message: 'Could not send mail!' };
                        }

                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                        return { status: true, data: [], message: 'Mail sent successfully!' };
                    });
                });
            } catch (error) {
                console.error("Error in contact_us email:", error);
                return { status: false, data: [], message: 'Unable to send email!' }
            }
        });
    } catch (error) {
        console.error("Error in contact_us email:", error);
        return { status: false, data: [], message: 'Unable to send email!' }
    }
}




module.exports = {
    schedule,
    apply_nowEmail,
    contact_usemail
}