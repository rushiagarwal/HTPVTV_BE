const stripe = require('stripe')('sk_test_51N6v2gSGhmLI0r4AKJRgHHM3E3My2jzOEbcwHco6ixiVS6PiVz21eck8sEPIb6qMNNjWR9g0rCsMpLX3Ltmao7WL00pFWQ7ODC');
const express = require('express');
const cors = require('cors');
//const jwt = require('jsonwebtoken');
const auth0 = require('auth0');
const mysql = require('mysql2');
const bcrypt = require("bcryptjs");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
//const ManagementClient = require('auth0').ManagementClient;
const AuthenticationClient = require('auth0').AuthenticationClient;

const app = express();
 
//app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(swaggerDocs));  If  want to add in url after port

app.use(cors());

// MySQL database configuration
const dbConfig = {
  host: 'gamedata.cdrluvmrqhlh.us-east-2.rds.amazonaws.com',
  user: 'admin', /* MySQL User */
  password: 'sMOuGumaZuRENtic', /* MySQL Password */
  database: 'HTPV' /* MySQL Database */,
  port: 3306
};

//Routes
/**
 * @swagger
 * /:
 *  get:
 *    description: Use to get a string
 *    summary: To get a string
 *    operationId: get string
 *    responses:
 *      '200':
 *        description:  A successful response
 *        content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items: 
//  *                  $ref: "BE_2/src/index.js"
 * 
 */
app.get('/', function(req,res){
  res.send('Hii! It is working');
});

//Routes
/**
 * @swagger
 * /users:
 *  get:
 *    summary: To get all users
 *    responses:
 *      200:
 *        description:  A successful response
 *        content: 
 *          application/json:
 *            schema:
 *              type: array
 */
app.get('/users', function (req, res) {
  const connection = mysql.createConnection(dbConfig);
  connection.query('SELECT * FROM Users', (err, rows) => {
      if (err) {
          console.error('Error executing MySQL query:', err.stack);
          return;
      }
      console.log('Data received from MySQL database:');
      //console.log(rows);
      res.json(rows);
  });
  connection.end();
});


// Signup API endpoint
// app.post('/api/signup', async (req, res) => {
//   const { firstname, lastname, email, password, address } = req.body;
//   try {
//     const connection = mysql.createConnection(dbConfig);
//     const pass = await bcrypt.hash(password, 10);
//     const query = "INSERT INTO Users (FirstName, LastName,Email,Password,Address,CreatedDateTime,ModifiedDateTime) VALUES (?,?,?,?,?,?,?)"
//     const result = await connection.execute('INSERT INTO Users (FirstName, LastName,Email,Password,Address,CreatedDateTime,ModifiedDateTime) VALUES (?,?,?,?,?,?,?)', [firstname, lastname, email, pass, address, new Date(), new Date()]);
//     const userId = result.insertId;
//     await connection.end();
//     var data = {
//       "user": "User created successfully"
//     }
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Failed to create user');
//   }
// });

// // Login API endpoint
// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;
//   // Check user credentials in the MySQL database
//   try {
//     const connection = mysql.createConnection(dbConfig);
//     // with placeholder
//     connection.query(
//       'SELECT * FROM `Users` WHERE `email` = ?',
//       username,
//       async function (err, results) {
//         if (results.length > 0) {
//           const pass = await bcrypt.compare(password, results[0].Password);
//           if (pass) {
//             const user = results[0];
//             res.send(results[0]);
//             //return res.send(user);
//             // Generate JWT token
//             // const token = jwt.sign({ sub: user.id }, 'HTBV', { algorithm: 'HS256' }); // Secret key = HTBV
//             // res.json({ access_token: token });
//           }
//           else {
//             return res.status(401).send('Invalid credentials');
//           }
//         }
//         else {
//           return res.status(401).send('No User found for given credentials.');
//         }

//       }
//     );
//     //console.log(rows)
//     await connection.end();


//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Failed to authenticate user');
//   }
// });

const endpointSecret = "whsec_dwuK7dkli8gVDxEhygyQmleHRTOIviPT";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.body;
  console.log(event)
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      break;
    case 'checkout.session.expired':
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      break;
    case 'customer.created':
      const customerCreated = event.data.object;
      // Then define and call a function to handle the event customer.created
      break;
    case 'customer.subscription.created':
      const customerSubscriptionCreated = event.data.object;
      // Then define and call a function to handle the event customer.subscription.created
      break;
    case 'customer.subscription.deleted':
      const customerSubscriptionDeleted = event.data.object;
      // Then define and call a function to handle the event customer.subscription.deleted
      break;
    case 'customer.subscription.updated':
      const customerSubscriptionUpdated = event.data.object;
      // Then define and call a function to handle the event customer.subscription.updated
      break;
    case 'invoice.created':
      const invoiceCreated = event.data.object;
      // Then define and call a function to handle the event invoice.created
      break;
    case 'invoice.paid':
      const invoicePaid = event.data.object;
      // Then define and call a function to handle the event invoice.paid
      break;
    case 'invoice.payment_failed':
      const invoicePaymentFailed = event.data.object;
      // Then define and call a function to handle the event invoice.payment_failed
      break;
    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event invoice.payment_succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

// Start the server
app.listen(3010)
console.log('Listening on http://localhost:3010');