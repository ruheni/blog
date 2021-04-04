---
title: Child Processes👶
published: true
description: An introduction to child processes with NodeJs
tags: webdev, JavaScript, NodeJs
cover_image: 
date: '2019-06-01'
cannonicalUrl: ''
---

## Child Processes

For this article, it will assume you have a basic understanding of NodeJs and intermediate programming knowledge in JavaScript. For you to be able to get a firm grasp of child processes, you will need have a fair understanding of streams and event emitters. The final assumption I am going to make is that you have a basic knowledge of terminal commands used to manipulate files and folders.

### What exactly is a child process?

A child process is a process that is created by another process. Sounds meta, right…? It is important to remember that JavaScript is single threaded and therefore we would not want to block the main thread running, otherwise our application will be slow and it won’t be able to do much really. In case you are asking “what the heck is he talking about …?”😕 don’t panic yet.

[JavaScript Event loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0) explains how exactly JavaScript runs when executed 😉.

With child process, you are able to run multiple processes seamlessly and improve performance of your application. You are able to control the input stream and listen to its output stream, and pass it to another process, the same way the pipe `|` operator works in Linux

Child processes enable you to access the operating system functionalities by running a child process in it. There are four different ways of creating child processes and they vary in terms of speed (some slightly more efficient than others) and functionality. You create a child process through the following ways: `fork()`, `spawn()`, `exec()`, and `execFile()`.

For you to have access to this module, you will have to import it to your program and destructure it to access the specific child process you would like to use. The examples i am going to use in this article are fairly simple😁.

Since I would not want to make this tutorial too long, I will cover only `spawn()`.

```js
const { spawn, exec, execFile, fork } = require('child_process');
```

### Spawn

This launches a new command in a new process. With spawn, you can pass any argument to it to carry out a given process. `spawn` is able to handle events, that is, you can register events so as to carry out a given task when the signal is sent.

The following events can be registered when using `spawn()`:

1. `error` - is emitted when the process could not be spawned or killed.
2. `message` - it is emitted when child uses `process.send()` to send a message. It enables communication between the child and parent processes.
3. `disconnect` - when parent process manually calls `child.disconnect()`
4. `close` - emitted when the input and output streams of the given process are closed.
5. `data` - the `data` event is emitted when the given stream is readable and we would like to manipulate the input and output the data. It can also be emitted in case of an error.

_For those who are unfamiliar with the `pwd` command, it used to show the current working directory._

```javascript
const { spawn } = require('child_process');
const pwd = spawn('pwd');

pwd.stdout.on('data', (data) => console.log(`path: ${data}`));

pwd.stderr.on('data', (data) => {
	console.error(`child stderr: ${data}`);
});

pwd.on('exit', (code, signal) => {
	console.log(`child process exited with ${code} and signal ${signal}`);
});
```

Output:

```bash
path: "/c/Users/Users/Documents/pandora's_box/sandbox/nodejs"
child process exited with 0 and signal null
```

Optionally, the `spawn` function is able to take in a second parameter which is an array containing strings which are the parameters one would like to use when executing a given command.

```javascript
const { spawn } = require('child_process');
const py = spawn('py', ['--version']);

py.stdout.on('data', (data) => console.log(`python version: ${data}`));

py.stderr.on('data', (data) => {
	console.error(`child stderr: ${data}`);
});

py.on('exit', (code, signal) => {
	console.log(`child process exited with ${code} and signal ${signal}`);
});
```

Output:

```bash
python version: Python 3.7.3
child process exited with 0 and signal null
```

_The output will vary with your current working directory and code 0 means there was no error encountered when executing the program..._

_Happy hacking 🎉😁_
