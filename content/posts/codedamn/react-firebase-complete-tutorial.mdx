---
title: React Firebase Complete Tutorial
publishedDate: "2022-12-02"
lastUpdatedDate: "2023-12-09"
tags: ["react", "firebase", "guide"]
status: "published"
type: Post
description: In this article, I'll tell you How to set up a Next project with Tailwind CSS
---

Firebase is a Ready to use Backend Service made available by Team Google, which ensures we write our Application Code and they'll manage every backend utility from their side, while on the other hand React is a Frontend Development framework that enables a developer to build and develop a Good User Interface with the minimal code by using the Blog architecture and Virtual DOM to levitate the Load.

Development usually takes a huge time to build, test, deploy and maintain, all these actions require huge costs to get into actual work. In this article, we'll build an actual app that'll require a Name and age of a User and save it in DataBase ( which in this article will be Firebase ), with React as a Frontend Development tool.

## Firebase

Firebase is a Backend DataBase service by Team Google that helps a Developer to use it as a Service for the Backend Solution to save and Deploy a Database in Production. Firebase can also help a Developer in many Functions like Email Authentication and New User Registration, DataBase, and Deployment.

Firebase also provides a Developer to build high-quality apps for the Web, Android, IOS, and others too. Firebase is a collection of useful functions which is required in any app by the Developers.

It aims to solve three main problems being faced by the Developers:

- Build a High-Quality Backend Service
- Deploy and Monitor the App activity
- Engage users in the App

## React.js

React is a Frontend App Development Framework that enables a Developer to build High-Quality Web App with a more Complex UI by breaking it into multiple components and reusing them as many times as required.

React is a Framework developed by Facebook _current name Meta_ with a new concept of Virtual DOM which helps the Web App to be lightweight in production.

With React, a Developer can build logics which were tough to implement or makes the UI laggy than others, while React handles everything with such a great speed that it doesn't even make the UI lag even a bit.

## React with Firebase

A Developer who uses React with the FrontEnd Framework like React Firebase can become very handy to develop complete full-stack apps without any backend Framework to manage the Data to store and retrieve the data from the database.

Let's try to learn to React with Firebase by developing a Web App using React for the Frontend and Firebase as the Backend to store and provide the Data to the End User.

### Developing the Backend on Firebase

Creating a DataBase on Firebase is a pretty much repetitive task but once it's installed and set up it'll always come in handy for a Developer. There are multiple steps to be followed when creating a Firebase Database. Do follow them a bit cautiously.

1. Go to the Firebase Dashboard
   ![Firebase Dashboard](/public/static/codedamn-assets/firebase-dashboard.png)

2. Now Create a New Project on Firebase
   ![Create a New Firebase Project](/public/static/codedamn-assets/firebase-created-new-project.png)

3. Click on the Web App to get started with Firebase of the type of Project you're developing. In this we're Developing Firebase Project with React which comes under Web Development, so click on the Code Icon _( The Third Icon )_.
   ![Add to the Web App](/public/static/codedamn-assets/firebase-create-new-app.png)

4. After the project has been successfully created move into the project and create the DataBase in the project.
   ![Project DataBase](/public/static/codedamn-assets/firebase-create-database-in-production.png)

5. After the database has been created we can now easily access the database but cannot modify its contents in it due to the rules specified.

To change the rules move to the tules tab.
![Before changing the rules](/public/static/codedamn-assets/firebase-before-rules.png)

Change the rule to `allow read, write: if false;` to `allow read, write: if true;`.

![After changing the rules](/public/static/codedamn-assets/firebase-change-rules.png)

Now hit publish the rules to get access to the database using the code.

### Coding the FrontEnd

Let's start from the very basics of creating a Bare Bone React App using the `CRA` or `create-react-app` but we'll also make sure to install Tailwind just to make the styling better.

#### Create a React Project

```bash
npx create-react-app reactFirebase
```

to install Tailwind with Create React App make sure to visit [this article]() to set up your React App with Tailwind CSS.

#### Create a New file with Firebase Config

Now it's okay if you haven't created a database on Firebase but from now on It's mandatory to create it right now.

Create a `firebase-config.js` file inside the `src` folder and paste all the code obtained by the Firebase project creation step.

```js
// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfdMNAyBga0KjMsJF_u_LH7ScRxf5H9pQ",
  authDomain: "reactfirebase-40062.firebaseapp.com",
  projectId: "reactfirebase-40062",
  storageBucket: "reactfirebase-40062.appspot.com",
  messagingSenderId: "66072772218",
  appId: "1:66072772218:web:e78f07de16234fe19445c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

#### Coding the actual Development Part

Till now all we did was set up to make everything ready for the project. Now let's move on to the `App.js` code to write on the database.

##### Writing to the DataBase

To Write to the DataBase we must first take input from the React App and successfully log it to the console.

Let's create a basic Form that takes input and saves it to the variables declared using the state method.

```js
<div className="text-white">
  <h1 className=" mt-8 w-screen text-center text-4xl font-bold">React with FireBase</h1>
  <p className="mt-5 w-screen text-center">Fillin the Details to Upload Data to the DataBase</p>
  <div className="mt-16 text-center">
    <span>Enter your Name : </span>
    <input
      className="mx-4 text-black"
      type="text"
      placeholder="Name"
      onChange={(event) => {
        setName(event.target.value);
      }}
    />
    <span>Enter your Age : </span>
    <input
      className="mx-4 text-black"
      type="text"
      placeholder="Age"
      onChange={(event) => {
        setAge(event.target.value);
      }}
    />
    <br />
    <button onClick={CreateUser} className="m-4 w-20 rounded-md bg-slate-700 p-2">
      Upload
    </button>
  </div>
</div>
```

add all these codes to the App.js 7it should look like this

![React Code to write to the database](/public/static/codedamn-assets/firebase-writing-to-db.png)

After setting up everything, it is time for us to code into firebase.

First, let's create a Collection variable that will hold and maintain all the Firebase Data for us.

```js
const UsersCollectionRef = collection(db, "users");
```

To successfully upload the data let's now create a function that can handle the onSubmit action of the Form.

```js
const CreateUser = async () => {
  await addDoc(UsersCollectionRef, { Name: name, age: age });
  window.location.reload();
};
```

AddDoc is a function provided by firebase to add a new Document to the Database using the Code. It requires a Collection Variable and an Object with Data.

##### Reading from the DataBase

Now as we've already written some data to the DataBase we now can easily read the contents from the database.

Now first let's get all the Data from the DataBase whenever the user loads the website our App must read the Data from the FireBase database and display the data to the Page/DOM.

In React.js, whenever we want to render or make a fetch request whenever the page gets loaded we always use `useEffect` to make the request and render the data to the Document.

Now as we've already created the `users` on the Firebase we can now easily access the data from it.

```js
useEffect(() => {
  const getUsersData = async () => {
    const data = await getDocs(UsersCollectionRef);
    setUsers(data.docs.map((elem) => ({ ...elem.data(), id: elem.id })));
  };

  getUsersData();
}, []);
```

with the above code, we'll now fetch the Data from the FireBase and store it in the `users` variable whenever the user loads the webpage.

Now we've successfully fetched the Data from the FireBase, now we can map over the `users` variable and can render the data.

```js
<div className="mx-6 mt-20 text-white">
  <h3 className="text-xl">Users:</h3>
  <div className="grid grid-cols-2">
    {users.map((user) => {
      return (
        <div className="m-4 w-1/4 rounded-md bg-gray-600 p-2 hover:animate-pulse">
          <p className="w-auto text-center">{user.Name}</p>
          <p className="w-auto text-center">{user.age}</p>
          <button
            onClick={() => {
              increaseAge(user.id, user.age);
            }}
          >
            Increase Age
          </button>
          <button
            onClick={() => {
              deleteUser(user.id);
            }}
          >
            Delete User
          </button>
        </div>
      );
    })}
  </div>
</div>
```

After all the code, the project might look like this if everything is working properly.

![Firebase Read Data](/public/static/codedamn-assets/firebase-read-from-firebase.png)

and the Result of the WebPage might look like this

![Firebase Read Data Result](/public/static/codedamn-assets/firebase-react-with-firebase-into.png)

##### Updating Data onto FireBase

To Update Data onto the Firebase we must have to get the `Id` of the element we want to delete, we can pass the ID to the function that handles the Updation of the data to get it Updated.

```js
const increaseAge = async (id, age) => {
  const userDoc = doc(db, "users", id);
  const NewAge = { age: Number(age) + 1 };
  await updateDoc(userDoc, NewAge);
  window.location.reload();
};
```

We will get the document ID using the `doc` method available in the `firebase` package and then update the data. To Update the Age we must first get the `User Object`, then convert the Age to Integer because the Integer is in String type and Age Updation can be only done in Integer Data type.

So we'll pass the age with the Id of the element, and then we'll convert and update the age of the User.

```html
<button onClick="{()" ="">{ increaseAge(user.id, user.age) }}>Increase Age</button>
```

This will provide the function of all the data which is required to Updated the age of the User by converting the Age to a Number and then Increasing by 1 and Updating it to the FireBase.

##### Deleting a User from the Firebase

Till Now we all have successfully performed `Create`, `Read`, and `Update` actions on Firebase. What about if we want to `Delete` a user from the Firebase??

We can easily perform the same using the steps similar to the ones we already performed in `Update`.

To Delete an Object from the Firebase all we will need is the `Id` of the User, then we'll pass the Id of the Object to the function responsible to delete the Object, and then we'll call the deleteDoc method.

```js
const deleteUser = async (id) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
  window.location.reload();
};
```

This function will receive the ID of the Object and find the Document name of the Object and finally Delete the Data from the Firebase.

##### Add a bit of your Touch to your Project

After all this, we now successfully Developed a React Project whose Data is stored on FireBase. Now try adding your Styling and Custom Features to make it unique in your way.

I added a little info to the user if there is no Data available in the DataBase then it'll show like

![No Data on Firebase](/public/static/codedamn-assets/firebase-no-data.png)

## Code for the Project Developed

All the code of the Project we developed is available on a Playground which is developed for users of [Codedamn](https://codedamn.com) to use Technologies without even installing it in your system and learning the skill.

The code can be found by accessing the [`link here`](https://codedamn.com/playground/_ca5HqTRh_6hZVxYL_PPt)

## Conclusion

In this article, we learned about how can we create our App with FireBase, also with this article we also learned about how we can Use firebase with React to host our Serverless App with a DataBase which can scale with the increasing number of requests.

Thanks for reading
Happy Hacking
