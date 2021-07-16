---
title: Reliable, Scalable, and Maintainable Applications
published: true
description: My summary of Chapter One - Designing Data-Intensive Applications
# cover: https://dataintensive.net/images/book-cover.png
date: '2021-04-08'
# series: Designing Data-Intensive Applications Notes
---

Hello friends 👋🏾

These are my notes on [Designing Data-Intensive Applications](https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable-ebook/dp/B06XPJML5D) by [Martin Kleppmann](https://twitter.com/martinkl). The book is an incredible read and would recommend you pick up your copy.

The purpose of sharing this is to keep myself accountable - making sure I read -, share what I learn, make sure what I learn sticks, and serve as a reference to future me.

I don't have a lot of experience building applications at scale and therefore my notes may contain a lot of content. I hope this summary will be of value to you too. 🙂

## Reliability 

Software is deemed reliable depending on its ability to tolerate faults, function as expected, ensure the right level of authorization access, and have reasonable performance for its tasks.

Not all faults and failures can be captured. 


### Types of faults

* __Hardware faults__ - e.g., hard drive corruption.
* __Software errors__ - e.g., unhandled exceptions for error handling.
* __Systematic errors__: these are errors within a system - correlated with areas across nodes in a system, e.g., the [leap second glitch](https://www.wired.com/2012/07/leap-second-glitch-explained/) that caused an outage of popular web services.
* __Human error__ - e.g., having faulty configuration during deployment.

Inducing faults helps in capturing faults, improving the reliability of an application.

### Making systems more reliable

* __System design__ - this reduces opportunity and can include patterns such as having well-designed abstractions, APIs, and admin interfaces make it easy doing the right thing.
* __Sandbox environments__ - these are environments for battle testing applications before moving to production.
* __Testing__ - using unit, integration, and end-to-end tests taking software to the extreme to capture "edge cases" users may encounter.
* __Telemetry__ - using monitoring software to track usage, exceptions, and application performance.

## Scalability

This is a software's ability to cope with an increased load within a given set of parameters.

> TIL: __Tail latency amplification__: An instance where a request gets slower because it is dependent on other calls (e.g., to other services or APIs).

Monitoring the performance of an application can be done in two ways:
* __Option A__: Keeping a log of requests/ responses every 10 minutes, detailing the response times.
* __Option B__: Collecting all requests/responses and sorting through them every 10 minutes. This may be a naïve approach, and you can sort through them every 10 minutes using the following algorithms: 
  * [T-Digest](https://github.com/tdunning/t-digest)
  * [Forward Decay](http://dimacs.rutgers.edu/~graham/pubs/papers/fwddecay.pdf)
  * [HDR Histogram](http://hdrhistogram.org/)

### Maintaining performance

* __Rethinking system architecture__ - taking a different approach on how systems can be scaled. There are two scaling "models": scaling up (vertical scaling) and scaling out(horizontal scaling) alias shared-nothing architecture. 
* __Elastic systems__ - having systems that can either be manually or automatically scaled under a load.

There is no _magic scaling sauce_ or a one-size-fits-all architecture for designing scalable systems.

## Maintainability

This refers to designing software that makes it less painful to maintain in the long run. Maintainability helps ensure developers avoid building legacy software. No one likes legacy systems. 🤷🏾‍♂️

While writing this summary, the following [tweet](https://twitter.com/pati_gallardo/status/1379464931859386374) resonated:

![image](https://user-images.githubusercontent.com/33921841/113774368-d5bb2180-972f-11eb-8526-2da1b41a622e.png)


To ensure maintainability, development teams have to follow a couple of design principles when building systems:

* __Operability__ - refers to making a system easy to run (making life easy for the operations team).
* __Simplicity__ - refers to the ability to manage complexity when building a platform, e.g., creating abstractions.
* __Evolvability__ - refers to adapting software for future needs such as new features.

Cheers, and stay tuned for more. 📣