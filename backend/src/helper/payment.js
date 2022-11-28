const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

exports.createPaymentIntent = async(info) => {
    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: [
            { price_data: {
                currency: info.currency,
                product_data: {
                  name: info.name,
                },
                unit_amount: info.price*100,
              },
              quantity: 1}]
            ,
            success_url: `http://localhost:3000/success`,//to be changed
            cancel_url: `http://localhost:3000/cancel`, 


        });
        return session.url;   
    }

      catch (e) {
        console.log(e);
        return null;
      }
    }
