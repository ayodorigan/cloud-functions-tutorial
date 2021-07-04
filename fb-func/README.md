## Introduction
Traditionally, web or even mobile applications required back-end codes to run some processes for the users such as sending them notificastions when something occurrs i.e commeting on  post on social media app, seuch backend also were or are used for image/file processing before they get stored such as compressing or scaling its sizes and such.
All these happens on the server hosted somewhere.

With the advancement in technology, google bring us cliud functions in firebase which allows developers to write code running in the cloud. These comprises of functions that are excecuted in the cloud or simply called cloud functions.

Cloud functions have various advanteges to developers such as:
1. **Scalability** - This means you you can easily scale them to meet your current needs i.t when you have a steep user growth.

2. **Deployment** - You get to deploy clpud functions with a single command.

3. **Maintanability** - With Cloud functions you do not need to maintain a server hence reducing maintenance cost.

4. **Cost** - Compared to pre-provisional virtual cloud machines, its very cost efective as you only pay when the code runs.

Clound functions also have some drabacks or disadvantages that you have to be aware of:
1. **Debugging** -  Cloud functions can be so difficult to debug even as there are already tools like cloud monitoring and emulators.
2. **Control** - They can be difficult to control as you may need to sync monitoring, analytics and deployment scripts with an existing system.
3. **Complexity** -  They can add some level of complexity to your architecture making it somewhat difficult to understand.


### Properties of cloud functions
1. Scalable - They automatically scale
3. Stateless -  DO not have memory state
4. Short life-span - Limited execution time
5. Event-Driven - Triggered by events

### Functions of Cloud Function
Tirggered by an action, cloud function can perform the following:
1. Data Processing i.e Recording logs for analysis
2. Image processing and Analysis - Can extract some information from an image for analysis
3. Sending push notifications to users
4. Cloud functions can also be used by IoT --Internet of Things to peocess incoming data for analysis.


## Cloud function Triggers
As I have mentioned ealier, cloud functions are event driven, meaning they are triggered by an event.
Lets see some of the commonly used triggers to run cloud functions.

### 1. Realtime Database Triggers
These are triggers that happen from the firebase real time database.
You register events on nodes or db paths i.e
`function.database.ref(/followers)`
In the above example *function.database.ref* registers a listener to the node called *followers*
We can also use a wildcard to define dynamic part of the path i.e
`functions.database.ref('/followers/{userid}')`
where the value of *userid* changes dynamically

Above you see we are using *ref* function that will register all the floowing events
1. *onCreate()* -  Triggered when a new data is added into the node
2. *onWrite()* -  Triggered when a new data is created or changed or destroyed
3. *onUpdate()* - Triggered when data is upadated
4. *onDelete()* - Triggered when the data is deleted.

If you want to listen to a particular function among the ones listed above then you need to call it from the *ref* function as follows.
`functions.database.ref('/followers/{userid}').onCreate( event => {})`
 Above event will be triggered when you get a new follower

 ## 2. Cloud Storage Triggers
 This triggers comes from Cloud storage. They have same event listeners like in Realtime db.
 To register a cloud storage function you do the following:
 `functions.storage.object().onChange(event => {})`
 where *object()* is the default storage bucket.

 To specify a bucket you do the following:
 `functions.storage.bucket('bucketName').onChange(event => {})`

The following are the event handlers you can use:
*event.data.name*: This is the file path of the file in the bucket
*event.data.contentType*: This is the  content type of the file
*event.data.resourceState*: Has 2 values i.e ‘exists’ or ‘not_exists’. The ‘not_exists’ value is set if the file / folder has been deleted.
*event.data*: This is the storage object
event.data.metageneration: This is the number of times the metadata of the file has been generated. For new objects the initial value is always 1.
*event.data.bucket*: This is the file storage bucket

## 3. HTTP Triggers
These are trigeers from firebase Api i.e
`functions.https.onRequest((request, response) => {})`
We will use this a we do not have to app to pushfor us data to db

## Diving into the code
### Requirements
1. nodejs runtime environment
2. npm --nodejs package manager
3. firebase-tools

### Getting started
First create a project on firebase and enable functions then enable rela time database

#### 1. Installing Nodejs
Go to !(Download Nodejs)[https://nodejs.org/en/download/] or !(Install Nodejs)[https://nodejs.dev/learn/how-to-install-nodejs] and check how to install nodejs on the OS you are using
This will also install npm packege manager for nodejs

#### 2. Installing firebase-tools
This is what you will use to create and deploy your cloud function.
`npm install -g firebase-tools`

### 3. Initializing your project
Follow the steps to initialize your cloud function project
1. Login to firebase - you will be redirected to the browser to login
`firabase login`

2. Create a working directory
`mkdir fb-test-function`

3. Enter into the created dir
`cd fb-test-function`

2. Run the following to init your firestore and accepts all the default values for this project
`firebase init functions`
You will be asked to select the firebase project to use. 
You can also select the option *[create a new project]* to add a new project to you logged in account
To intall all the required dependecies, select *Yes* for the question *“Do you want to install dependencies with npm now?”
You can slso selecy *Yes* for Question *Do you want to use ESLint to catch probable bugs and enforce style*

At this point the firebase cloud function is set up and we are ready to start writing code but before that lets discuss abit about the project structure
Lookin into the folder we have the following files
*node_modules:* is a directory where your dependencies (declared in package.json) are installed
*firebase.json:* Describes properties for your project
*functions/package.json:* Contains a list of NPM package dependencies of this project
*functions/index.js:* Used for implementing Cloud Functions
*functions/node_modules:* Directory in which the NPM packages are installed which are listed in package.json
*.firebaserc:* The settings for deploy targets are stored here
*.eslintrc.js:* is a configuration file for a tool named ESLINT which is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.


## Coding
### Javascript Basics
Declaring/Initializing a variable
```js
var fname = "singledeveloper" // globally/funcion scoped varibale
let sname = "singledeveloper" // block scoped varibale
const lname = "singledeveloper" // block scoped varibale and is a constant
```

Datatypes
```js
var name = "singledeveloper" // String
var num = 1 // integer/number
var arr = [3,5.6, 9, 0] // Array
var date = Date.now()
var bool = true // boolean
var obj = { // Object
    id : "94898",
    name: "singledeveloper"
}

```
Displaying values
```js
var fname = "singledeveloper" 
console.log(fname) // Logs the singledeveloper in the console
console.error(error) // Logs errors
```

Loops
```js
var numbers = [1, 2, 4, 5, 6,3, 9, 0]

for (let number of numbers) {
    console.lg(number)
}

for (let number in numbers) {
    console.lg(number)
}

for (let x = 0; x < numbers.length; x++) {
    console.lg(numbers[x])
}

let x = 0
while(x < numbers.length) {
    console.lg(numbers[x])
    x++
}

let x = 0
do {
    console.lg(numbers[x])
    x++
} while(x < numbers.length)
```

Functions
```js
function printName() {
    console.log("singledeveloper")
}

function printName(name) {
    console.log(name)
}

```

Error Handling
```js
try {
    // your code
}catch (e) {
    // handel error here
} finally {
    // finish here. 
    // block is executed regardless
}
```

More of javascript find here !()[https://www.tutorialsteacher.com/nodejs/nodejs-basics]


## Implementing the function
Check the code in the *index.js* file


## Deploying the function to firebase
When everytthing is ok, you deploy the fuction/code to firebase using the following example
`firebase deploy --only functions`