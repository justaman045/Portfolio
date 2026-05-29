---
title: How to read CSV with JavaScript?
publishedDate: "2022-10-25"
lastUpdatedDate: "2023-11-18"
tags: ["CSV", "JavaScript", "python"]
status: "published"
type: Post
description: In this article, I'll tell you How to read CSV with JavaScript?
---

In today's modern JavaScript possibly anything that you can think of can be done with JavaScript, either is it making a connection with a Database or is it rendering HTML on the Client-side, Developing Mobile Apps with JavaScriptor or even let it be web scraping. JavaScript can do possibly anything you'd want. Today in this article we'll see how to read `CSV` files in JavaScript.

## Reading CSV files with JavaScript

In today's modern World, there are two ways we can read `CSV` files using JavaScript

- From a Node.js Environment
- From the Browser

### From the Node.js Environment

Node.js is a Software that allows the developer to run and execute regular JavaScript outside of the browser making it completely independent from the browser and environment.

#### Using a library to read CSV files

Node.js also has its package management called `npm`. `npm` is also called Node Package Manager.

Node developers have built a program called `csv-parse` which helps the developers to read and write CSV files using Node.js only.

`csv-parse` requires a native Node module named `fs` also known as the file system.

#### Code for reading CSV files using Node.js

```js
const fs = require("fs");
const { parse } = require("csv-parse");

const data = [];

fs.createReadStream("./example.csv")
  .pipe(
    parse({
      delimiter: ",",
      columns: true,
      ltrim: true,
    })
  )
  .on("data", function (row) {
    data.push(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    console.log("parsed csv data:");
    console.log(data);
  });
```

From the above code, we'll easily convert the CSV file and the data inside the file to a JSON object which we can easily read in JavaScript and perform our operation.

```bash
$ node index.js
parsed csv data:
[
  { Name: 'Jack', Age: '22', Country: 'Australia' },
  { Name: 'Jane', Age: '27', Country: 'United Kingdom' },
  { Name: 'Andrew', Age: '29 ', Country: 'United States' },
  { Name: 'Mary', Age: '19 ', Country: 'France' }
]
```

#### Using the native Node.js modules to read CSV files

Using a Library is always easy as it does the bare-bone job of us of writing code from scratch, but it comes with its own set of actions. By using a library we have to look for the updates of it and update it timely.

What if we could do all the reading of the CSV data by using the native Node.js modules, in that case, we just have to update the Node.js itself and everything's done.

```js
const fs = require("fs");
const readline = require("readline");

const stream = fs.createReadStream("./example.csv");
const reader = readline.createInterface({ input: stream });

let data = [];

reader.on("line", (row) => {
  data.push(row.split(","));
});

reader.on("close", () => {
  console.log(data);
});
```

from the above code, we can read the data from a CSV file just by using native Node.js modules and without a third-party library like `csv-parse`.

### Reading CSV files in a Browser

What if we don't even have a Node.js environment, like what if we are developing our project in pure HTML, CSS and Vanilla JavaScript? Luckily JavaScript still has the support of `D3.js` which can help us to parse the CSV data.

Let's look at the code to use `D3.js`

```html
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script>
  const res = d3.csvParse("Name,Age\nJane,29\nJoe,33");
  console.log(res);
</script>
```

In the above code, we're importing the `D3.js` using its CDN and calling the `csvParse` function to convert the CSV data to JSON Object.

Let's take a look at the Code for JS and HTML separately.

```html
<form id="myForm">
  <input type="file" id="csvFile" accept=".csv" />
  <br />
  <input type="submit" value="Submit" />
</form>
```

In the above HTML code, we can see that there's an `input` tag that only accepts CSV files with the id _csvFile_.

Now the JavaScript code

```js
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();

  // 👇 executed when a file is loaded
  reader.onload = function (e) {
    // 👇 get the text from CSV file
    const text = e.target.result;

    // 👇 parse it using D3.js
    const data = d3.csvParse(text);

    // 👇 write the output to the browser
    document.write(JSON.stringify(data));
  };

  // 👇 load the input file to the reader
  reader.readAsText(input);
});
```

In the above JavaScript code, we can see that the element with the id _csvFile_ is loaded and stored in `csvfile` variable then it's read by the `FileReader`.

```html
<body>
  <form id="myForm">
    <input type="file" id="csvFile" accept=".csv" />
    <br />
    <input type="submit" value="Submit" />
  </form>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script>
    const myForm = document.getElementById("myForm");
    const csvFile = document.getElementById("csvFile");

    myForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = csvFile.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const text = e.target.result;
        const data = d3.csvParse(text);
        document.write(JSON.stringify(data));
      };

      reader.readAsText(input);
    });
  </script>
</body>
```

In the above code, we are using D3.js based on the CDN of it and also with pure HTML, CSS and Vanilla JavaScript, without the use of modules like `csv-parse` or the Node.js Environment.

## Conclusion

In this article, we saw how to read the content of CSV files using JavaScript by using both

- with Node.js environment
- without the use of Node.js environment

JavaScript is a very powerful language and its demand is increasing day by day, if you still don't know how to perform difficult operations in JavaScript you should consider taking up the [Learn JavaScript Basics](https://codedamn.com/learn/javascript-basics).

### Promotion

Currently, I am also focused on building the Community mentioned below:

1. Anime Community:- [Instagram/otakuanime69](https://instagram.com/otakuanime69)
2. Motivational Theme Page:- [Instagram/glorymotivation7](https://instagram.com/glorymotivation7)

also, I'm currently focused on building my Brand named Otaku Outfits currently it's in the approval stage on Etsy but once it is live I'll be sharing it with you all by making sure to subscribe to my Newsletter from the Newsletter tab.

Also, it'll be helpful if you can just follow this [link to Medium](https://justaman045.medium.com/4f8c92cfbb8f?source=friends_link&sk=cd115cbec34f873f98454a9faaf8fab7) and give me a like and follow there too.

### Contact

To contact you can join my Discord Server where I intend to keep the community in one place and also serve the community  
Discord Link:- [https://discord.gg/ZfAKPZvT](https://discord.gg/ZfAKPZvT) ( It's brand new and I'm okay if you help me out on setting up this ).

Thanks for Reading  
Happy Hacking
