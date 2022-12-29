const invoice= require('../models/invoice');
const course= require('../models/course');
const user= require('../models/user');
const currencyConverter = require("../helper/currencyconverter");
const payment=require('../helper/payment');

//payment gateway

exports.issueInvoice = async (req, res) => {
    const courseId = req.params.id;
    const  userId  = req.user.id;
    const countryCode = req.query.CC || "US";
    let countryDetails = await currencyConverter.convertCurrency(
      "US",
      countryCode
    );
  
    let exchangeRate = countryDetails.rate;
    let currency = countryDetails.toCountryCurrency;
    try {
      const userData = await user.findById(userId);
      if (!userData) {
        res.status(404).send({
          message: `Cannot find user`,
        });
      } else {
        const courseData = await course.findById(courseId);
  
        if (!courseData) {
          res.status(404).send({
            message: `Course was not found!`,
          });
        } else {
          for (var i = 0; i < userData.courseDetails.length; i++) {
            if (userData.courseDetails[i].course == courseId) {
              res.status(400).send({
                message: `You have already registered for this course!`,
              });
              return;
            }
          }

        let amount = courseData.discountedPrice * exchangeRate;
            amount = amount.toFixed(2);
        
  
          const info = {
            currency: currency,
            name: courseData.courseTitle,
            price: amount,
          };

          const newInvoice = new invoice({
            user: userId,
            course: courseId,
            courseName: courseData.courseTitle,
            instructor: courseData.instructor,
            totalAmount: amount,
          });

          await newInvoice.save().catch((err) => {
           return  res.status(500).send({
                message: "Error in issuing invoice",
                });
            });

          
          await payment.createPaymentIntent(info).then((data) => {
            if (!data) {
              res.status(500).send({
                message: "Error in payment",
               
              });
              return;
            }
  
            res.send({
              message: "user undergoing payment, invoice will be issued",
              link: data,
              invoiceId: newInvoice._id
            });
          });
        }
      }
    } catch (err) {
      res.status(500).send({
        message: "Error in issuing invoice",
      });
    }
  };

  exports.getInvoice = async (req, res) => {
    const id=req.params.id;
    
    try {
        const invoiceData = await invoice
        .findById(id);
        if (!invoiceData) {
            res.status(404).send({
              message: `Cannot find invoice with id=${id}. Maybe invoice was not found!`,
            });
          }
            else{
                res.send(invoiceData);
            }
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving invoice with id=" + id,
          });
    }
    };

    exports.getAllUserInvoices = async (req, res) => {
        const userId = req.user.id;
        try {
            const invoiceData = await invoice
            .find({user:userId})
            .sort({invoiceDate:-1});
            if (!invoiceData) {
                res.status(404).send({
                  message: `Cannot find invoice with id=${userId}. Maybe invoice was not found!`,
                });
              }
                else{
                    res.send(invoiceData);
                }
        } catch (err) {
            res.status(500).send({
                message: "Error retrieving invoice with id=" + userId,
              });
        }
        }
        
        exports.deleteInvoice = async (req, res) => {
            const id = req.params.id;
          
            try {
              const invoiceData = await invoice.findByIdAndRemove(id);
              if (!invoiceData) {
                res.status(404).send({
                  message: `Cannot delete invoice with id=${id}. Maybe invoice was not found!`,
                });
              } else {
                res.send({
                  message: "invoice was deleted successfully!",
                });
              }
            } catch (err) {
              res.status(500).send({
                message: "Could not delete invoice with id=" + id,
              });
            }
          };

          exports.getAllInvoices = async (req, res) => {
            try {
                const invoiceData = await invoice
                .find()
                .sort({invoiceDate:-1});     
                  res.send(invoiceData);
                    
            } catch (err) {
                res.status(500).send({
                    message: "Error retrieving invoices",
                  });
            }
            }
        
    

  