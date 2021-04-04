---
title: Dear Junior Web Developer...
published: true
description: Note to any aspiring and junior front-end developers
tags: #frontend, #javascript, #angular, #beginners
cover_image: https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
date: '2020-04-20'
---

Hello, everyone, 👋. 

It's been a while since my last post on dev.to 😪. I have been procrastinating a lot the last few weeks but I'm now doing it 😋.

Update: I landed an internship as a front-end developer 🥳.

![celebrate](/assets/celebrate.gif)

The last 3 months have been packed with deadlines, Angular and learning (both domain knowledge and my technical skills. I recently learnt I suck at coding (tee-hee), but I am confident that will change with time). It was actually my first time interacting with Angular and I can confirm that the learning curve has been **really really** steep (despite the frustration of understanding of how it works under the hood, it has pushed me out of my comfort zone and explore a new perspective building web applications).

I have gained a couple of skills and knowledge/experience I would love to share with the rest of the community. I am in no way an expert I therefore recommend you take my advice with a grain of salt read on the topic, but I hope it will be of help. The list I produced is not exhaustive and in no order. Feel free sharing in the comments the important skills one must learn as a junior front-end developer.

\*\* before the story telling begins, I'm in a small team of about six engineers, and I was assigned the task of working on the web platform for our product. Yes, I am responsible for all the bad choices on the UI. 😂😂

#### 1. Reactive Streams

RxJs is a library that allows you to work with asynchronous data streams and event-based programs by using observable sequences. It has a relatively steep learning curve but once you get used to it, you will get to love it. With great power comes great responsibility... therefore, beware of memory leaks which can easily mess up your application (the subscriptions that you forget to unsubscribe to once you destroy the component).

#### 2. State Management

State is described as having a central source of truth for your application. Not all applications require state management. You may need state management if you are working on a large application that may have "many moving parts" and you would like to keep this in sync with the data in the backend. It's more of a nice to have than a must have feature. Explore the different state management patterns and libraries available such as NgRx, NGXS and Akita in Angular, Redux in React and Vuex in Vue.

#### 3. Layouts and Styling

Sometimes, it seems like the designer is always out to get you with some crazy wireframes or prototypes. You might find yourself building out the UI and get stuck occasionally. I mean, it's HTML, it can't be that hard. Working with design systems/UI libraries such as Material and bootstrap help get the job done fast and have a working product. Not all frontend developers, me included, are fans of CSS but you'll have to learn it to customize the existing styles and accomplish whatever has been stated in the design. If you are a hardcore CSS fan, go ahead and knock yourself out writing them styles🙃😁

![CSS](/assets/css-snippet.jpg)

_Photo by Pankaj Patel on Unsplash_

#### 4. Working with APIs

If you are building a data driven application, there is a high likelihood you have interacted with APIs. Simply put, an API provides a way for different web services to communicate with each other. HTTP is the protocol that allows a client (i.e. web, mobile, IoT device) to communicate with the server (service provider). Learn how make requests, modifying requests using interceptors (mostly when attaching headers for authorization) among other tasks. Explore different API implementations such as REST and GraphQL as well and learn how they work.

#### 5. Empower yourself

This is a concept I learnt a senior engineer working on a different product. It is simple and powerful as well. Spend some time every day, to learn a new concept that would improve your workflow/ productivity. I took the initiative to learn at least one new thing before I work on anything every day. With time, this creates a snowball effect and quality of your output is guaranteed to improve with time.

![ant-workout](/assets/ant-workout.gif)
#### 6. Asking the right questions

When you are new, you are expected to get stuck. It is okay to get stuck often, domain knowledge and technical skills. It's happened more than once I've tried explaining my problem to another developer and the response I got was, "I don't understand your issue here". It's at that point that you realize you need to first try break down the problem into tiny bits and walk yourself through your logic first and try find gaps if there. I mostly write pseudocode on paper, find my challenge, google for a couple of minutes as I try what stack overflow gurus recommend before getting a senior developer unblock me.

#### 7. Version Control

I thought I knew git, honestly, I did, but after a week and a half, I found myself struggling with git. Most of my mornings have been spent rebasing because of issues here and there, merge conflicts... accidentally reverting to an older commit without having committed my work... conflicting credentials (mostly with Gerrit) ... forgetting to add the ticket number to the commit. I have occasionally deleted the local repository and started all over again 😂. It's okay to make mistakes since it shows that you are learning. Take time to learn the git commands, they are a true-life savers.

![what the heck](/assets/wtf-git.gif)

#### 9. Keep an open mind

There are plenty of ways to solve any given problem with code. Sadly, I have had a tunnel vision when it comes to solving problems and I am learning from my mistakes. When the going gets tough, then you need to take a break from the screen, take a walk, if you can, and clear your mind. Be open to learning modern technologies and concepts. Challenge yourself to solve harder problems since it's one of the ways to grow in your career.

Advice I got from a more experienced engineer. 😂😂

> "If it works, don't touch it."

**Happy Hacking**🥳🎉🍾

_Cover image by Andrew Neel on Unsplash_
