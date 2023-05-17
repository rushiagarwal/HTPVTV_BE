const express = require('express');
const cors = require('cors');
//const jwt = require('jsonwebtoken');
const auth0 = require('auth0');
const mysql = require('mysql2');
const app = express();
const bcrypt = require("bcryptjs");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
//const ManagementClient = require('auth0').ManagementClient;
const AuthenticationClient = require('auth0').AuthenticationClient;

const swaggeroptions ={
  swaggerDefinition:{
    openapi: "3.0.0",
    info: {
      title :"HTPVTV Api",
      "version": "1.0.1",
      summary: "A pet store manager.",
      description : "HTPVTV Api information",
      // "termsOfService": "https://google.com",
      contact : {
        // name: "Amaxing developer",
        // "url": "https://www.google.com/",
        // "email": "lordgmeryoyo@gmail.com"
      },
      // "license": {
      //   "name": "Apache 2.0",
      //   "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
      // },
    },
    // servers : [{
      //     "url": "http://localhost:3010",
      //     "description": "Development server"
      //   }],
    "servers": [
      {
        "url": "http://localhost:3010",
        "description": "The production API server",
        // "variables": {
        //     "username": {
        //       "default": "demo",
        //       "description": "this value is assigned by the service provider, in this example `gigantic-server.com`"
        //     },
        //     "port": {
        //       "enum": [
        //         "8443",
        //         "443"
        //       ],
        //       "default": "8443"
        //     },
        //     "basePath": {
        //       "default": "v2"
        //     }
        // }
      }
    ],
    "components": {
        //To add schemas at the end.
        // "schemas": {
        //   "GeneralError": {
        //     "type": "object",
        //     "properties": {
        //       "code": {
        //         "type": "integer",
        //         "format": "int32"
        //       },
        //       "message": {
        //         "type": "string"
        //       }
        //     }
        //   },
        //   "Category": {
        //     "type": "object",
        //     "properties": {
        //       "id": {
        //         "type": "integer",
        //         "format": "int64"
        //       },
        //       "name": {
        //         "type": "string"
        //       }
        //     }
        //   },
        //   "Tag": {
        //     "type": "object",
        //     "properties": {
        //       "id": {
        //         "type": "integer",
        //         "format": "int64"
        //       },
        //       "name": {
        //         "type": "string"
        //       }
        //     }
        //   }
        // },
        "parameters": {
          "skipParam": {
            "name": "skip",
            "in": "query",
            "description": "number of items to skip",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          "limitParam": {
            "name": "limit",
            "in": "query",
            "description": "max records to return",
            "required": true,
            "schema" : {
              "type": "integer",
              "format": "int32"
            }
          }
        },
        "responses": {
          "NotFound": {
            "description": "Entity not found."
          },
          "IllegalInput": {
            "description": "Illegal input for operation."
          },
          "GeneralError": {
            "description": "General Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GeneralError"
                }
              }
            }
          }
        },
        "securitySchemes": {
          "api_key": {
            "type": "apiKey",
            "name": "api_key",
            "in": "header"
          },
          "petstore_auth": {
            "type": "oauth2",
            "flows": {
              "implicit": {
                "authorizationUrl": "https://example.org/api/oauth/dialog",
                "scopes": {
                  "write:pets": "modify pets in your account",
                  "read:pets": "read your pets"
                }
              }
            }
          }
        }
    },
  },
  apis: ["./index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggeroptions);
app.use("/", swaggerUI.serve,swaggerUI.setup(swaggerDocs));
//app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(swaggerDocs));  If  want to add in url after port

app.use(cors());
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
// Initialize Auth0 management API client
const auth0Client = new auth0.AuthenticationClient({
  domain: 'dev-j4r00zlzu5nbx3mk.us.auth0.com',
  clientId: 's0LpBdVDArwX0RNGAfZ8uyMesPP6p3eZ',
  clientSecret: 'IRt_gbR84PL2-AKDngw0P2mlzb2QEo-yjqwng-to_2fEAID383H98KUlp9QRBXsu',
  scope: 'read:users create:users'
});

// MySQL database configuration
const dbConfig = {
  host: 'gamedata.cdrluvmrqhlh.us-east-2.rds.amazonaws.com',
  user: 'admin', /* MySQL User */
  password: 'sMOuGumaZuRENtic', /* MySQL Password */
  database: 'HTPV' /* MySQL Database */,
  port: 3306
};

app.use(express.json())

// const checkJwt =  auth({
//   issuer: 'https://dev-j4r00zlzu5nbx3mk.us.auth0.com',
//   audience: 'https://localhost:3010',
//   secret: 'HTBV',
//   tokenSigningAlg: 'HS256',
// })



//Routes
/**
 * @swagger
 * /:
 *  get:
 *    description: Use to get a string
 *    summary: To get a string
 *    operationId: get string
 *    tags: [String]
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
 *    description: Use to get all users
 *    summary: To get all users
 *    operationId: getallusers
 *    tags: [Users]
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

//Routes
/**
 * @swagger
 * /users/{id}:
 *  get:
 *    description: Use to get user by id
 *    summary: To get user by id
 *    operationId: getuserbyid
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: The User id
 *    responses:
 *      '200':
 *        description:  A successful response
 *        content: 
 *            application/json:
 *              schema:
 *                type: array
//*                items: 
//  *                  $ref: "BE_2/src/index.js"
 */
app.get("/user/:id",function(req,res){
  // console.log(id);
  // const{ id } = req.body;
  // const connection = mysql.createConnection(dbConfig);
  // connection.query(
  //   'select * from Users where UserID = ?',
  //   id,
  //   async function (err, results){
  //     if(results.length > 0) {
  //       res.send(results[0])
  //     }
  //     else{
  //       res.send("No user found.")
  //     }
  //   }
  // )
});

//Routes
/**
 * @swagger
 * /user/add:
 *  post:
 *    description: Use to add user
 *    summary: To add user
 *    operationId: adduser
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *    responses:
 *      '200':
 *        description:  A successful response
 *      '500':
 *        description : Error
//  *        content: 
//  *            application/json:
//  *              schema:
//  *                type: array
//  *                items: 
//  *                  $ref: "BE_2/src/index.js"
 */
app.post('/user/add', function(req,res){
  res.send("Added");
});

app.get('/api/private', function (req, res) {
  checkJwt(req, res)
});
// Signup API endpoint
app.post('/api/signup', async (req, res) => {
  const { firstname, lastname, email, password, address } = req.body;
  try {
    const connection = mysql.createConnection(dbConfig);
    const pass = await bcrypt.hash(password, 10);
    const query = "INSERT INTO Users (FirstName, LastName,Email,Password,Address,CreatedDateTime,ModifiedDateTime) VALUES (?,?,?,?,?,?,?)"
    const result = await connection.execute('INSERT INTO Users (FirstName, LastName,Email,Password,Address,CreatedDateTime,ModifiedDateTime) VALUES (?,?,?,?,?,?,?)', [firstname, lastname, email, pass, address, new Date(), new Date()]);
    const userId = result.insertId;
    await connection.end();
    var data = {
      "user": "User created successfully"
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to create user');
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { firstname, lastname, email, password, address } = req.body;
    const user = await auth0.authorization({
      firstname, 
      lastname,
       email,
        password,
         address,
      connection: 'Username-Password-Authentication'
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

// Login API endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  // Check user credentials in the MySQL database
  try {
    const connection = mysql.createConnection(dbConfig);
    // with placeholder
    connection.query(
      'SELECT * FROM `Users` WHERE `email` = ?',
      username,
      async function (err, results) {
        if (results.length > 0) {
          const pass = await bcrypt.compare(password, results[0].Password);
          if (pass) {
            const user = results[0];
            res.send(results[0]);
            //return res.send(user);
            // Generate JWT token
            // const token = jwt.sign({ sub: user.id }, 'HTBV', { algorithm: 'HS256' }); // Secret key = HTBV
            // res.json({ access_token: token });
          }
          else {
            return res.status(401).send('Invalid credentials');
          }
        }
        else {
          return res.status(401).send('No User found for given credentials.');
        }

      }
    );
    //console.log(rows)
    await connection.end();


  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to authenticate user');
  }
});

// Login API endpoint
app.get('/auth/:id', async (req, res) => {
  checkJwt(req, res);
  const { id } = req.params;
  try {
    const connection = mysql.createConnection(dbConfig);
    // with placeholder
    connection.query(
      'SELECT * FROM `Users` WHERE `UserID` = ?',
      [id],
      function (err, results) {//fields as paramter in function
        const user = results[0];
        console.log(user)
        if (!user) {
          return res.status(401).send('User not found');
        }
        res.send(user);
      }
    );
    //console.log(rows)
    await connection.end();


  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});




// Define the protected endpoint
app.get('/protected', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    // Verify the JWT token with the secret key
    const decodedToken = jwt.verify(token, 'HTBV');

    res.status(200).json({ message: 'Authenticated user', user: decodedToken });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

function checkJwt(req, res) {
  const token = req.headers.authorization.split(' ')[1];

  try {
    // Verify the JWT token with the secret key
    const decodedToken = jwt.verify(token, 'HTBV');
    return true;
    //res.status(200).json({ message: 'Authenticated user', user: decodedToken });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex')
  };
}
function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');

  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}
// Start the server
app.listen(3010)
console.log('Listening on http://localhost:3010');

// const express = require('express');
// const app = express();
// const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
// const cors = require('cors');
// require('dotenv').config();

// if (!process.env.ISSUER_BASE_URL || !process.env.AUDIENCE) {
//   throw 'Make sure you have ISSUER_BASE_URL, and AUDIENCE in your .env file';
// }

// const corsOptions =  {
//   origin: 'http://localhost:3010'
// };

// app.use(cors(corsOptions));

// const checkJwt = auth({
//     audience: process.env.AUDIENCE,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
// });

// app.get('/api/public', function(req, res) {
//   res.json({
//     message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
//   });
// });

// app.get('/api/private', checkJwt, function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated to see this.'
//   });
// });

// app.get('/api/private-scoped', checkJwt, requiredScopes('read:messages'), function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
//   });
// });

// app.use(function(err, req, res, next){
//   console.error(err.stack);
//   return res.set(err.headers).status(err.status).json({ message: err.message });
// });

// app.listen(3010);
// console.log('Listening on http://localhost:3010');
