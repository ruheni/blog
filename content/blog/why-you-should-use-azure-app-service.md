---
title: Why you should probably switch to Azure App Service
published: true
description: Perhaps I can give you a reason to switch to Azure from your current deployment platform
tags: #azure #web #cloud #APIs
cover_image: https://aspblogs.blob.core.windows.net/media/scottgu/WindowsLiveWriter/AnnouncingthenewAzureAppService_122D1/image_4.png
date: '2019-11-24'
---

I am a hippie when it comes to technology and I have accepted who I am 😔. I have a bad habit of switching very easily from one technology to another and maybe a few commitment issues when it comes to JavaScript frameworks of choice (story for another day). Another thing about me is that I am a big fan of abstraction, not having to deal with the low level stuff - it gets boring at times having to deal with numerous configurations especially infrastructure...maybe I using it is just an excuse for my laziness 🙊.

For the last year, I have tried out numerous platforms, trying out which one works better for me and I have come to love Netlify, Now, a little bit of GitHub pages and Azure App Service. I got the chance to try out Digital Ocean, Azure VMs, Heroku, the platforms mentioned above and a few others. I cannot say that one is better than the other because everyone is entitled to their opinion. The platforms have different use cases and also differ in pricing and services offered.

The platforms I have mentioned are there because the abstraction taken away, for beginners seeking to share their work with the rest of the world and lazy bums like me 😂. These platforms offer continuous deployment, like most platforms out there, and with little knowledge of any necessary configurations such as web servers like NGINX, domains, load balancers and all those topics that are scary when you take a first look at them and wonder when you will actually deploy your API or site.

Now, Netlify and Azure App service offer one-click deploys, and the fact that you can deploy your site with only a `git push` is pure genius!! Yes, I know what you're thinking, there are platforms offering the same services too but these ones work just fine for me... we can talk about the other platforms in the comments section and I will be more than glad to try them out.

![pikachu-happy](/assets/pikachu-happy.gif)

A few features I liked about Azure App service is the Deployment slots, the intuitive UI and the fact that you can link it with various services such as Azure Repos if you prefer a little more privacy, or any (most) 3rd party service you wish. The service works for both fullstack apps in your language of choice as well as APIs (REST and GraphQL). You can connect it to Azure CosmosDb (a database services on Azure) or Azure cognitive services and set up web tasks (e.g cron jobs for your newsletters) pretty easily.

Another reason of choice of this platform is the time to productivity the moment you start working on the project. For those who love using VS Code deployment is also made very easy... with just the click of a button and a couple of fields, your site/service is on the internet, using the Azure App Service extension, in just a few minutes.

The last three features I will talk about provided by the platform include the deployment slots, application insights and scaling feature.
In a nutshell, deployment slots allow you to easily switch between different versions of your application, for example from the development version to the staging/testing or production app with the click of a button. Isn't that just a neat feature??😉

When you deploy your application, you would definitely want to know how it is performing, and this is where app insights come in. You will get access to details such as how many requests your app has, the responsiveness and perhaps when there is a lot of traffic so that you can easily scale up/out you app. Scaling your application works like magic...and it can be automated to scale down too.... and the docs are relatively straight forward and easy to understand.

I hope I have given you enough reasons to switch, or just try App service for your next hobby project and get the all-powerful feeling whenever I use such a service 🙃

![powerful](/assets/powerful-hero.gif)

I am planning to try out Surge soon. If there are any platforms you would love you would like me to try out too, suggest them in the comments and I will be glad to try them out for my next project
