---
title: Top 10 React.js projects for Beginner
publishedDate: "2022-09-09"
lastUpdatedDate: "2023-12-09"
tags: ["reactjs", "project", "developer", "tips"]
status: "published"
type: Post
description: In this article, I'll tell you about the top 10 reactjs projects to build as a react developer.
---

React.js is the most popular Web Development framework for Frontend, It is a JavaScript Library used to develop single-page web apps using JavaScript which executes on the client-side Javascript engine also known as a Browser. But What makes React so much popular that most companies are hiring React Developers?? It's the reusability part, React helps us to easily break down multiple parts of the web app into different components and reuse them as well, which is the best and unique feature of react.js.

It has been used to create some best Front-end projects, and in this article, we'll talk about the top 10 Projects that you can build to skill up your React.js knowledge.

## 1. Calculator

To get familiar with React.js itself we'll start with Calculator App.

In this, a user should be able to enter `n` number of numbers to perform arithmetic operations. You can also use Bootstrap or Tailwind CSS for styling options but it'll be best if you can write your custom CSS.

### Things to learn from this project

- Getting familiar with React.js
- Usage of State Management in React
- Integrating React with CSS / Styling Framework

![Image of Calculator](https://images.weserv.nl/?url=https%3A%2F%2Fcodedamn-blog.s3.amazonaws.com%2Fwp-content%2Fuploads%2F2022%2F09%2F19113914%2Fcal.png&w=554&q=75&output=webp)

```js
import React, { Component } from "react";

import actions from "../actions/calculatorActions";
import Clear from "../components/Clear";
import Equals from "../components/Equals";

const CONSTANTS = require("../constants.js");

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 0,
      current: false,
      storage: false,
      operator: false,
    };
    this.clearState = this.clearState.bind(this);
    this.displayNumber = this.displayNumber.bind(this);
    this.doMath = this.doMath.bind(this);
    this.equals = this.equals.bind(this);
    this.determineEquation = this.determineEquation.bind(this);
  }

  clearState() {
    this.setState({
      display: 0,
      current: false,
      storage: false,
      operator: false,
    });
  }

  equals(e) {
    if (this.state.operator && this.state.operator !== "equals") {
      this.doMath(e);
    }
  }

  displayNumber(e) {
    if (e.target.id === "decimal" && this.state.current.toString().includes(".")) {
      return;
    }

    let numberPressed = CONSTANTS.numbers[e.target.id];

    if (!this.state.current) {
      this.setState({
        current: numberPressed,
        display: numberPressed,
      });
    } else {
      let updatedValue = "" + this.state.current + numberPressed;
      this.setState({
        current: updatedValue,
        display: updatedValue,
      });
    }
  }

  determineEquation(e) {
    let solve;
    if (this.state.operator === "equals") {
      this.setState({
        operator: e.target.id,
      });
      solve = CONSTANTS.equations[e.target.id];
    } else {
      solve = CONSTANTS.equations[this.state.operator];
    }
    return solve;
  }

  doMath(e) {
    if (!this.state.operator) {
      this.setState({
        operator: e.target.id,
        storage: this.state.current,
        current: false,
      });
    } else {
      if (!this.state.current) {
        this.setState({
          operator: e.target.id,
        });
        return;
      }

      let solve = this.determineEquation(e);
      let updatedStorage = solve(this.state.storage, this.state.current);

      this.setState({
        storage: updatedStorage,
        current: false,
        display: updatedStorage,
        operator: e.target.id,
      });
    }
  }

  render() {
    return (
      <div id="calculator">
        <div id="display">{this.state.display}</div>

        <div id="buttons">
          {actions.buildOperatorButtons(this.doMath)}
          <Equals eventHandler={this.equals} />
          {actions.buildNumberButtons(this.displayNumber)}
          <Clear eventHandler={this.clearState} />
        </div>
      </div>
    );
  }
}
```

## 2. Forms App

Forms in a Website play an important role in getting data from users, React.js handles forms differently unlike the way HTML handles them.

The next project Idea for a beginner is to create a forms App in which a user can enter his/her details, and the data is displayed at the moment of entering Details ( without the use of LocalStorage ).

### Things to learn from this project

- Event Handling in React.js
- React Hooks
- States

![Image for Forms App](https://images.weserv.nl/?url=https%3A%2F%2Fcodedamn-blog.s3.amazonaws.com%2Fwp-content%2Fuploads%2F2022%2F09%2F19114350%2Fforms-1536x864.png&w=1536&q=75&output=webp)

```js
import React, { Component } from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    alert("You have submitted the input successfully: " + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Controlled Form Example</h1>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default App;
```

## 3. Search Auto Complete

React is just javascript that helps us to generate HTML and CSS dynamically, The next project Idea is about how you can auto-complete a form with some data provided and search it with the available data.

Develop a Web App in which the user can enter some details ( for example let's take INDIA ) and when the user shall type initial data the form shall search from the database ( or local file ) and show the matching data in the dropdown.

### Things to learn from this project

- Searching and filtering
- use of data storage in real-time user interaction
- Use of Data Fetching ( If Database is connected )

![Image for Search Auto Complete](https://images.weserv.nl/?url=https%3A%2F%2Fcodedamn-blog.s3.amazonaws.com%2Fwp-content%2Fuploads%2F2022%2F09%2F19115024%2Fsearch-auto-complete-1536x864.png&w=1536&q=75&output=webp)

```js
import React from "react";

import "./App.css";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

function App() {
  const items = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ];

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>id: {item.id}</span>
        <span style={{ display: "block", textAlign: "left" }}>name: {item.name}</span>
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
```

Code from npmjs.org, check that by [clicking here](https://www.npmjs.com/package/react-search-autocomplete)

## 4. Weather App

There are dozens of free Weather APIs to use and get the current weather, Our next project is related to the Weather API. Develop a Project in which a user can enter a particular location and get the weather of that location.

### Things to learn from this project

- Connecting and retrieving data from an API

```js
import React, { useEffect, useState } from "react";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Loader from "react-loader-spinner";

function Weather() {
  const [query, setQuery] = useState();
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Nocvember",
      "December",
    ];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setQuery("");
      setWeather({ ...weather, loading: true });
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const appid = "your APP ID";

      await axios
        .get(url, {
          params: {
            q: query,
            units: "metric",
            appid: appid,
          },
        })
        .then((res) => {
          console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setQuery("");
          console.log("error", error);
        });
    }
  };

  return (
    <div>
      <h1 className="app-name">
        Weather App<span>?</span>
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Search City.."
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyPress={search}
        />
      </div>

      {weather.loading && (
        <>
          <br />
          <br />
          <Loader type="Oval" color="black" height={100} width={100} />
        </>
      )}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ "font-size": "20px" }}> Sorry, City not found</span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.main && (
        <div>
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDate()}</span>
          </div>
          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg">&deg;C</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
```

## 5. State Management ( frameworks like Redux, MobX, FluX )

State Management is storage where all the data is being stored and can be easily accessed by any of the components, but in react.js in-built stage management, the Data storage objects follow a top-down approach which means that data fetched in a child component can not be used by the parent component.

Develop a Project in which the use of Redux can be displayed.

### Things to learn from this project

- State Management

## 6. Pokemon Web App

These days there are tons of free APIs to get started with the most suitable one for a beginner is to use Pokemon API and display complete data obtained from the API.

Develop a React.js App in which a user can get all the info about a pokemon just by opening the dedicated Page on that project.

### Things to learn from this project

- State management using Redux
- React Router
- Less number of API calls

To have a look at the Pokemon Web App, head over to [this repository](https://github.com/gagrison/pokeapi-react-app)

## 7. GitHub Profile

The next project is a very Dynamic, GitHub Profile page, Many users contribute to GitHub and create data over that, GitHub Provides a free-to-use API to get JSON data of any user's Publicly Available Data.

Develop a React App in which a user can generate his/her GitHub profile page without any login or logout to the website ( apart from GitHub ).

### Things to learn from this project

- State management using Redux
- Less number of API calls

![Image](https://codedamn-blog.s3.amazonaws.com/wp-content/uploads/2022/09/19131808/gh-profile.png)

src/components/App/index.jsx

```js
import React, { Component } from "react";

import Footer from "../Footer";
import Profile from "../Profile";
import SearchProfile from "../SearchProfile";
import styles from "./app.css";

const URL = `https://api.github.com/users`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: "MarioTerron",
      name: "",
      avatar: "",
      location: "",
      repos: "",
      followers: "",
      following: "",
      homeUrl: "",
      notFound: "",
    };
  }

  fetchProfile(username) {
    fetch(`${URL}/${username}`)
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        this.setState({
          username: user.login,
          name: user.name,
          avatar: user.avatar_url,
          location: user.location,
          repos: user.public_repos,
          followers: user.followers,
          following: user.following,
          homeUrl: user.html_url,
          notFound: user.message,
        });
      })
      .catch((err) => console.log("Oops! An error ocurred."));
  }

  componentWillMount() {
    this.fetchProfile(this.state.username);
  }

  render() {
    return (
      <div>
        <section id={styles.card}>
          <SearchProfile fetchProfile={this.fetchProfile.bind(this)} />
          <Profile user={this.state} />
        </section>
        <Footer />
      </div>
    );
  }
}
export default App;
```

src/components/profile.jsx

```js
import React, { Component } from "react";

import styles from "./profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user.notFound === "Not Found")
      return (
        <div className={styles.root}>
          <div className={styles.info}>
            <div className={styles.notFound}>
              <h2>Oops!</h2>
              <p>Can't find this user. Try again.</p>
            </div>
          </div>
        </div>
      );
    else {
      return (
        <div className={styles.root}>
          <div className={styles.info}>
            <a href="#">
              <img src={this.props.user.avatar} alt="Profile image" />
            </a>
            <h2>
              <a href={this.props.user.homeUrl}>{this.props.user.name}</a>
            </h2>
            <h3>{this.props.user.location}</h3>
          </div>
          <div className={styles.state}>
            <ul>
              <li>
                <a href="#" target="_blank">
                  <i>{this.props.user.followers}</i>
                  <span>Followers</span>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <i>{this.props.user.repos}</i>
                  <span>Repositories</span>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <i>{this.props.user.following}</i>
                  <span>Following</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
```

src/components/Search-Profile/index.jsx

```js
import React, { Component } from "react";

class SearchProfile extends Component {
  constructor(props) {
    super(props);
  }

  handleForm(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    this.props.fetchProfile(username);
    this.refs.username.value = "";
  }

  render() {
    return (
      <div className={styles.root}>
        <form onSubmit={this.handleForm.bind(this)}>
          <label>
            <input type="search" ref="username" placeholder="Type Username + Enter" />
          </label>
        </form>
      </div>
    );
  }
}

export default SearchProfile;
```

## 8. Reddit Clone

A Clone of a Website that is completely functional just brings a charm to the resume, it makes a developer stand above other beginner developers.

Develop a React App which is an almost exact duplicate of already developed websites, for example, Reddit, Twitter, Spotify, Hulu, and Airbnb just to name a few.

### Things to learn from this project

- How to make a Web App Responsive and Dynamic.

![Image of Reddit Clone](https://codedamn-blog.s3.amazonaws.com/wp-content/uploads/2022/09/19132628/reddit-clone-1536x864.png)

To get the source code of the project head over to [this repo](https://github.com/tacticaltofu/reddit-clone/tree/main/frontend).

## 9. Resume Builder

In today's world, a good Resume for any Job Aspiring student / Working Professional is a must, the next project solves this issue for everyone.

Develop a React App in which a User can Signup into the Web App and can fill in details of his to display the details in a good layout of a resume for users.

### Things to learn from this project

- Connecting with Backend
- Maintaining Data

![Image of Resume Builder](https://codedamn-blog.s3.amazonaws.com/wp-content/uploads/2022/09/19133127/resume-builder-1536x864.png)

To get the source code of the project head over to [this repo](https://github.com/girishgr8/Resume-Builder).

## 10. E-Commerce App

The toughest Project for a Beginner could be an E-Commerce App, It has various concepts which should be taken care of like Authentication, Multiple Page, and Payment Gateway just to name a few.

Develop a completely working E-commerce App with React js with features of login, logout, and Real-time Data from the Backend.

### Things to learn from this project

- React Router
- Displaying Real-time Data
- Authentication
- Multiple users' different views

## Conclusion

Finally, now you know what are some good and interesting projects that should add up to your resume if you're a complete beginner React Developer, Projects help us in increasing our knowledge by pushing our level hard.

React is a very popular and emerging library, it'll keep on evolving you'll find many good things to minimize your time in the development of the projects mentioned above and use those to become an efficient developer.

Thanks for reading
