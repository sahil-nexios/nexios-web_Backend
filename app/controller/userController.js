const { request } = require("express")
const HTTP = require("../../constants/resCode")
const connection = require("../../config/connection")
const { schedule, apply_nowEmail, contact_usemail } = require("../middleware/sendmail")

const addSchedule = async (req, res) => {
    try {
        const { name, email, phone, brief } = req.body
        if (!name || !email || !phone) return res.status(HTTP.SUCCESS).send({ status: false, code: HTTP.BAD_REQUEST, message: "All Fields Are Required !" })
        if (!email.includes("@")) return res.status(HTTP.SUCCESS).send({ status: false, code: HTTP.BAD_REQUEST, message: "Please Enter Valid Email !" })
        const query = 'INSERT INTO schedule SET ?';
        connection.query(query, { ...req.body, phone: Number(phone) })
        const senddata = {
            name: name,
            email: email,
            phone: phone,
            brief: brief,
            subject: "Schedule call",
            file_template: "./public/emailTempletes/schedule.html"
        }
        schedule(senddata)
        return res.status(HTTP.SUCCESS).send({ status: true, code: HTTP.SUCCESS, message: "Your Request Sent Succesfully !" })

    } catch (error) {
        console.log("🚀 ~ addSchedule ~ error:", error)
        return res.status(HTTP.SUCCESS).send({ code: HTTP.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
    }
}


const apply_now = async (req, res) => {
    try {
        console.log(req.file)
        const { firstName, lastName, email, subject, phone } = req.body
        if (!firstName || !lastName || !email) return res.status(HTTP.SUCCESS).send({ status: false, code: HTTP.BAD_REQUEST, message: "All Fields Are Required !" })
        if (!req.file) return res.status(HTTP.SUCCESS).send({ status: false, code: HTTP.BAD_REQUEST, message: "Resume Fields Are Required !" })
        const pdfpath = `upload/resume/${req.file.filename}`
        const query = 'INSERT INTO apply SET ?';
        connection.query(query, { ...req.body, phone: Number(phone), file: pdfpath })
        const mailData = {
            firstName,
            lastName,
            email,
            phone,
            subject,
            pdfpath: pdfpath,
            file_template: "./public/emailTempletes/applynow.html"
        }
        apply_nowEmail(mailData)
        return res.status(HTTP.SUCCESS).send({ status: true, code: HTTP.SUCCESS, message: "Your Request Sent Succesfully !" })

    } catch (error) {
        console.log("🚀 ~ constapply_now= ~ error:", error)
        return res.status(HTTP.SUCCESS).send({ code: HTTP.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
    }
}

const contact_us = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message } = req.body
        if (!firstName || !lastName || !email) return res.status(HTTP.SUCCESS).send({ status: false, code: HTTP.BAD_REQUEST, message: "All Fields Are Required !" })
        const query = 'INSERT INTO contact SET ?';
        connection.query(query, { ...req.body, phone: Number(phone) })
        const mailData = {
            firstName,
            lastName,
            email,
            phone,
            message,
            file_template: "./public/emailTempletes/contactus.html",
            subject: "Contact Us"
        }
        contact_usemail(mailData)
        return res.status(HTTP.SUCCESS).send({ status: true, code: HTTP.SUCCESS, message: "Your Request Sent Succesfully !" })

    } catch (error) {
        console.log("🚀 ~ constcontact_us= ~ error:", error)
        return res.status(HTTP.SUCCESS).send({ code: HTTP.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
    }
}

const our_client = async (req, res) => {
    try {
        const query = 'SELECT * FROM client';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                return res.status(HTTP.SUCCESS).send({ status: false, code: HTTP.BAD_REQUEST, message: "Something Else in Fetch Data !" });
            }
            return res.status(HTTP.SUCCESS).send({ status: true, code: HTTP.SUCCESS, message: "Our Cliets !", data: results })
        });
    } catch (error) {
        console.log("🚀 ~ constour_client= ~ error:", error)
        return res.status(HTTP.SUCCESS).send({ code: HTTP.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
    }
}


const our_team = async (req, res) => {
    try {
        const query = 'SELECT * FROM team';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                return res.status(HTTP.SUCCESS).send({ status: false, code: HTTP.BAD_REQUEST, message: "Something Else in Fetch Data !" });
            }
            return res.status(HTTP.SUCCESS).send({ status: true, code: HTTP.SUCCESS, message: "Our Teams !", data: results })
        });
    } catch (error) {
        console.log("🚀 ~ constour_client= ~ error:", error)
        return res.status(HTTP.SUCCESS).send({ code: HTTP.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
    }
}


const portfolio = async (req, res) => {
    try {
        const query = 'SELECT * FROM portfolio_service';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                return res.status(HTTP.SUCCESS).send({ status: false, code: HTTP.BAD_REQUEST, message: "Something Else in Fetch Data !" });
            }
            return res.status(HTTP.SUCCESS).send({ status: true, code: HTTP.SUCCESS, message: "Our Portfolio !", data: results })
        });
        
    } catch (error) {
        console.log("🚀 ~ constour_client= ~ error:", error)
        return res.status(HTTP.SUCCESS).send({ code: HTTP.INTERNAL_SERVER_ERROR, status: false, message: "Something Went Wrong !", });
    }
}



module.exports = {
    addSchedule,
    apply_now,
    contact_us,
    our_client,
    our_team,
    portfolio
}