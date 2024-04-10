# NestJS Async Local Storage example

This project shows a simple example of using AsyncLocalStorage to manage state for a single request in NestJS.

## Usage

Start the application

```shell
nest start
```

In one process, call the "wait" endpoint, which will wait for 20 seconds

```shell
http localhost:3000/wait
```

In another process, call the "/" endpoint

```shell
http localhost:3000/
```

In the nestjs logs, you will see the "/" request log immediately with a counter value of 1. When the "wait" endpoint concludes after 20 seconds, you will see an additional log, also with a counter value of 1. This proves that the AsyncLocalStorage has a new instace of Context per request and that manipulating the state in one request does not affect the state of another.
