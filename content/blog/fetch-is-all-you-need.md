---
title: Fetch() is All you Need
published: true
description: Axios is great, but maybe fetch is what you really need
tags: react, typescript, frontend
date: '2020-10-27'
cover_image: https://i2.wp.com/blog.alexdevero.com/wp-content/uploads/2019/12/02-12-19-getting-started-with-react-and-typescript-pt1.jpg?resize=768%2C476&ssl=1
cannonical_url: 'https://dev.to/ruheni/fetch-is-all-you-need-e8f'
---

It's a little overkill to always reach out for a third-party library to handle data fetching for simple use cases when you have a `fetch`. [`axios`](https://github.com/axios/axios) and [`apollo-client`](https://www.apollographql.com/docs/react) are terrific libraries for handling requests. I've used them and I love them too. The purpose of this article is to show you how you an alternative way you can make the requests using `fetch`. I was mind-blown by some of the concepts I learnt in the process of writing this article. Some of the shortcomings of `fetch` are: it doesn't support network interceptors and won't work well if your web application is server side rendered without [`isomorphic-unfetch`](https://www.npmjs.com/package/isomorphic-unfetch).

Before you install a package to help you make requests, let me show you some of the nifty features `fetch` has to offer.

## A quick history lesson - XMLHttpRequest

Before `fetch` became a standard, we had [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest). No, it had nothing to do with fetching only XML from the server. It works with any type of data being sent to or from a server. It works both asynchronously or synchronously. This is because JavaScript is single-threaded and you don't want to block the main thread. Your web application will be unusable and whoever will review your code will get a little riled up and probably hunt you down. Please don't do that.

I should clarify that `XMLHttpRequest` is still supported in all browsers. Caveat, I've used this `XMLHttpRequest` twice. First time when I was learning how to make network requests in Js and at the time this article was being written🙈 .

I found a cave painting of how a request is made using `XMLHttpRequest`. It looks something like this: 

```jsx
let request = new XMLHttpRequest()

request.open('GET', 'http://random-url-on-the-internet.lol', true)

request.onload = () => {
	let data = JSON.parse(this.response)
	console.log(data)
}

request.onerror = () => {
	// handle non-HTTP errors e.g. losing connection
	console.log(`Error occured: ${request.status}`)
}

request.send()
```

This makes my head hurt every time I look at it. It's probably what inspired [Matt Zabriskie](https://twitter.com/mzabriskie) to author `axios`.  It can be a little tedious creating a new instance of `XMLHttpRequest` every time you wish to make a request. Keep in mind that, we haven't set headers or tried out other types of requests.

There are a couple more methods provided by `XMLHttpRequest` such as `abort()`, and `setRequestHeader()`. You can explore them in the [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)  

## So, fetch eh?

Since I've shown you what a network request using `XMLHttpRequest` looks like, here's how it looks like using `Fetch()` 

```jsx
const request = async () =>
    await fetch('http://random-url-on-the-internet.lol')
        .then(res => res.json())
        .then(console.log)
        .catch(console.error)

request()
```

Looks fairly easy, right? 😉 

We have created an arrow function `request()` that is `async`. `request()` returns a Promise and we have to `await` it as well, just to make sure we don't block the main thread running on the browser.

The first argument is the URL to your API. By default, all requests made are 'GET'. More on how to make a 'POST' in the next section.  The second argument, which is optional is an object containing the details of the request, such as the method, headers, cors policy and content-type. 

`.then()` method is chained to the request because it is a Promise. This means once the request is complete, we execute something. In our case, we convert the response to JSON. The second `.then()` logs the data to the console. If there is an error exception `.catch()` will capture it.

`Fetch` is supported in all major browsers, except IE. *Why won't you just accept your fate IE?*

## Request metadata

`Fetch` accepts a second parameter, the request options that is an object. It allows you to control a number of settings such as request headers, body, cors and cache. Let's look at an example where we make a 'POST' request, attach a token to the Authorization header and set the content type to `application/json`:

```jsx
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xxxxx-token-here'
    }
}

const request = async () =>
    await fetch('http://random-url-on-the-internet.lol', options)
        .then(res => res.json())
        .then(console.log)
        .catch(console.error)

request()
```

If you would like to look into more options, [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) takes a deep dive into using `Fetch`.

## Fetch from REST APIs

This is probably the simplest of the bunch and it will seem intuitive. I used [jsonplaceholder.typicode.com](http://jsonplaceholder.typicode.com) API to demonstrate how to make network requests. Some APIs may require you attach an API key or a token to the request. The examples provided should give you a solid background on how to use `fetch` effectively.

### GET requests

'GET' are pretty straightforward since 

```jsx
const requestSomeData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => response.json())
        .then((json) => console.log(json))
}

requestSomeData()
```

### POST requests

Create an options object in which you will specify the method is 'POST' and set the request body. Depending on the API you are using, you will probably need to send the body in JSON format. 

```jsx
const options = {
    method: 'POST',
    body: JSON.stringify({
        title: 'A Fresh Start',
        body: 'Maybe it is time you should consider of switching careers',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}

const postSomeData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', options)
        .then((response) => response.json())
        .then((json) => console.log(json))
}
```

*If you would like to make PUT, PATCH or DELETE requests, all you will need to do is specify the method in the request options*

## Fetch from GraphQL APIs

GraphQL requests are HTTP requests. Requests made to a GraphQL API are `POST` requests. Set the content type to `application/json`.

For the examples below, I created a sample GraphQL API hosted on Codesandbox. The data is stored in memory.

If you would like to fork it and play around with it, you can find it [here](https://codesandbox.io/s/github/MicrosoftStudentAmbassadors-Kenya/GraphQL-Intro/tree/main/). The API will allow you to request for books, create and books.

### Queries

Queries define the information a client sends to a server, describing what they need. 

Define the query and include it in the request body in JSON.

```jsx
const url = 'https://3l097.sse.codesandbox.io/'

const GET_BOOKS = `
	query {
    books {
      id
      title
      author
      published
    }
}`

const querySomeData = () => {
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ GET_BOOKS })
    })
        .then(res => res.json())
        .then(({ data }) => console.log(data))
        .catch(error => {
            console.log('Something happened.!💔', error)

        })
}

querySomeData()
```

### Mutations

Mutations are responsible for modifying data in a GraphQL API. Similar to what `POST`, `PUT` and `DELETE` do in a REST API. 

Define your mutation and add variables that would represent data captured from a form, for example. A mutation allows you define the data you would like to be returned once its execution is complete. 

```jsx
const url = 'https://3l097.sse.codesandbox.io/'

const CREATE_BOOK = `
    mutation($title: String!, $author: String!, $description: String!) {
        createBook(
        title: $title,
        author: $author
        description: $description
    ){
        id
        title
        author
        description
    }
}`

const mutateSomeData = () => {
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: CREATE_BOOK,
            variables: {
                title: "I'm already tired of Fetch",
                author: "Ruheni Alex",
                description: "You should read this one"
            }
        })
    })
        .then(res => res.json())
        .then(console.log)
        .catch(console.error)
}

mutateSomedata()
```

I highly encourage you to inspect the requests in the network tab using the browser devtools to understand what is going on under the hood. 

## Fetch on Window Focus

I never knew one could request data by focusing on a tab or window. Turns out it has nothing to do with fetch. But it's a pretty neat feature to include in your application.

This is especially helpful when a user leaves your application and data gets stale. When the user gets back to your application, data will be fetched and existing 

```jsx
const fetchSomeData = () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json))
}

window.addEventListener('focus', fetchSomeData)
```

## Fetch Retries

Let's face it. Requests are bound to fail at some point. You can improve the user experience in your web application by making the request a couple more times before informing the user what went wrong. It's going to be a recursive function that will call itself until it runs out of retries.

```jsx
const retryFetch = async (url, options = {}, retries = 5) => {
    const response = await fetch(url, options)
        .then(res => {
            if (res.ok) return res.json()

            if (retries > 0) {
                return retryFetch(url, options, retries - 1)
            } else {
                throw new Error(res)
            }
        })
        .catch(console.error)

    return response
}
```

## Fetch Wrapper

You can make a custom `fetch` function that would work for all types of requests. This is a concept I learnt from Kent C. Dodds. Now, my example isn't be polished, but I'm sure you can customize and add whatever would tickle your fancy.

```jsx
const customFetch = (url, { body, ...customConfig }) => {
    const headers = {
        'Content-Type': 'application/json'
    }

    if (body) {
        return config.body = JSON.stringify(body)
    }

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers
        }
    }

    return window.fetch(url, config)
        .then(async res => {
            const data = await res.json()

            if (res.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}

export { customFetch }
```

## Cancelling requests

Turns out, you can cancel a request. Yeah, I didn't know about it too.  I came across this feature as I was reading the react-query docs. At first, I thought it was a library specific feature, but after some research, it's natively supported in the browsers. It's fairly new to me and I may make a lot of mistakes but feel free to explain it further to me.

 Why do you need this? You don't. `Fetch` returns a promise which has 3 states:  `fulfilled`, `rejected` and `pending`. There is no way you can cancel an ongoing `fetch`. It comes in handy when a user decides an action isn't needed anymore.

First, create a controller instance from `AbortController()`. `controller` has a single method, `abort()` and one property `signal` that allows you to set an event listener to it. `signal` is then added to the request options. In the example below, I created a timer to invoke `abort()` method after 100ms. This will throw an error to the console.

*Note this is still an experimental technology.*

```jsx
const controller = new AbortController();
const signal = controller.signal;

let url = 'https://jsonplaceholder.typicode.com/todos/1'

setTimeout(() => controller.abort(), 100);

const fetchSomeData = () => {
    fetch(url, { signal })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => {
            if (error.name = 'AbortError') {
                console.log('You just aborted a fetch!💔')
            }
        })
}

fetchSomeData()
```

## Learn more

[Replace axios with a custom fetch wrapper](https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper) by Kent C. Dodds. In this article

[Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 

[Add Retries to your API calls](https://blog.bearer.sh/add-retry-to-api-calls-javascript-node/)

<span>Cover Photo by <a href="https://unsplash.com/@robfuller?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Rob Fuller</a> on <a href="https://unsplash.com/s/photos/fetch?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
