const functions = require("firebase-functions"); // Import the firebase-functions library
const admin = require('firebase-admin'); // Import the firebase-admin library

admin.initializeApp(functions.config().firebase); // initialize admin

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions



// *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-* Example #1 *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-*
/**
 *  This is a http based trigger. Its by default created with the init command to give you an overview of hoe cloud functions work
 * the function has 2 parameters request and response
 * request -- contains the details of the request made
 * response --  is used to send a response back the client who made the request like in line 14
 * */ 
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true}); // Logged to console
//   response.send("Hello from Firebase!");
// });



// *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-* Example #2 *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-*
/**
 * Since this exmple is not connected to any app, This example will use http trigger to take a string via url get parameter
 * and inserts it into the the fireabse real time db
 */

 exports.insertIntoDB = functions.https.onRequest((req, res) => {
     let num = req.query.num; // Get the string passed via the url
     if ( typeof num != 'number') { // check if the value is submitted is a number
        res.send("Provide value is not a number"); // tell user that its not a number
        return // stop eecution here
     }
     num = parseInt() 

     // Below bloack of code will push a new entry into the "fb-test" node in real time database
     // Also notice the function "push". Its a promise that we need to wait for the callback function  "snapshot" to be called to
     // indicate that it has finished
     admin.database().ref('/fb-test').push({num: num}).then(snapshot => {
         res.send("Number inserted"); // Send the client a message back
     })
 });


 // *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-* Example #3 *-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-**-*-*
/**
 * In this example we are creating a listener on fb-test node such that if the is anything inserted into it, its suppoed to 
 * set it increament that value by 1
 */
 exports.incrementNum = functions.database.ref('/fb-test/{pushId}/num').onWrite(event => {
    const num = event.data.val(); // get the inserted value
    num +=1 // increment the value
    return event.data.ref.parent.child('incremented').set(num); // adds incremented property to the node
});