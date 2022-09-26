<!-- This is a Template Repository, use as needed! -->

<!-- Project Summary -->

<br />
<div align="center">
  <a href="https://github.com/tiagodlb/Sing-Me-A-Song">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f399-fe0f.svg" width= 80/>
  </a>

<h3 align="center">'Sing me a song' Tests</h3>
  <h6>WIP</h6>
  <p>
    Tests for the 'Sing me a song' project.
    <br />
    <a href="https://github.com/tiagodlb/Sing-Me-A-Song"><strong>Browse TypeScript code»</strong></a>
</div>

<div align="center">
  <h3>Built With</h3>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/> 
  <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" height="30px"/>

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

</br>

<div align="center">

[![Jest Coverage](https://github.com/NivaldoFarias/sing-me-a-song-tests/actions/workflows/jest.yml/badge.svg?branch=main)](https://github.com/NivaldoFarias/sing-me-a-song-tests/actions/workflows/jest.yml)
[![sing-me-a-song](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/t4q2d1&style=flat-square&logo=cypress)](https://dashboard.cypress.io/projects/t4q2d1/runs)

</div>

<!-- Table of Contents -->

# Table of Contents

- [Installation and Usage](#installation-and-usage)
- [Middlewares](#middlewares)
- [API Reference](#api-reference)
  - [Models](#models)
  - [Routes](#routes)
  - [Items](#items)

<!-- Installation and Usage -->

## Installation and Usage

###### Pre-requisites: Node.js `^16.14.0`, PostgreSQL `^12.11`

There are two available options for you to use this template for your next Back End project: either use Github's built-in `Use this api` feature (green button left of the _'About'_ section), or download the zip file and extract it in the root of a new project folder by running these commands:

```bash
git clone https://github.com/tiagodlb/Sing-Me-A-Song.git
```

Then run the following command to install the project's dependencies:

```bash
npm install //OBS: you'll need to do this in both folders.
```
These are the back end commands that you'll need to know:

```bash
npm run build              // create the project build
npm run start              // run the project, not recommended since you'll need also have to change all the import directories
npm run dev                // recommended way to run the project
npm run prisma:reset       // reset the prisma database
npm run prisma:migrate     // migrate the prisma database, you should do this after the npm install
npm run prisma:prod        // starts prisma build production process, do this if you want to make a deploy 
npm run prisma:test        // resets the database in order to make the tests more accurate
npm run prisma:seed        // start the seeding process, create data in the database
npm run test               // resets the database in order to make the tests more accurate
npm run test:unit          // starts the testing process
```

These are the front end commands that you'll need to know:

```bash
npm run start         // starts the project
npm run cypress:open  // open cypress
```

<!-- Middlewares -->

## Middlewares

While aiming to provide a reusable, modular and extensible architecture, the middlewares are generally the first structures to be refactored into self-contained modules. The `errorHandlerMiddleware()`, `validateSchemaMiddleware()` middlewares were set in order to achieve that goal. The following section describes **`useMiddleware()`**, which incorporates the forementioned functions as _key–value_ pairs in an Object, along with their structure and usage.

# API Reference

In this section, you will find the example API's endpoints and their respective descriptions, along with the request and response examples, as well as the [Prisma](https://www.prisma.io/) models for each entity, that can be used as guide for data formatting. All data is sent and received as JSON.

<!-- Models -->

## Models

### User model _`Recommendations`_

- `id`: A unique identifier for each user. `serial4`
- `name`: The recommendation title. `text`  An title may only be registered once.
- `youtubeLink`: The recommendations's youtube url. `text`

## Routes

### [Items](#items) _`/recommendations`_

- [Items](#---post-and-get)

###### &nbsp; &nbsp; POST _`/recommendations`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
        "name": "Lorem ipsum",
        "youtubeLink": "www.youtube.com/seu-link",
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |       Description        |          Properties           |
| :---------: | :----------------------: | :---------------------------: |
|   **201**   |         Created          |          `data: {}`           |
|   **409**   | Item already registered | `error: { type, message }`     |
|   **422**   |      Invalid Input       | `error: { type, message }`    |
|   **500**   |  Internal Server Error   | `error: { type, message }`    |

###### &nbsp; &nbsp; POST _`/recommendations/:id/downvote`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
      //empty
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |       Description        |          Properties           |
| :---------: | :----------------------: | :---------------------------: |
|   **200**   |         Created          |          `data: {}`           |
|   **404**   | Item already registered | `error: { type, message }`     |
|   **500**   |  Internal Server Error   | `error: { type, message }`    |

###### &nbsp; &nbsp; POST _`/recommendations/:id/upvote`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
      //empty
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |       Description        |          Properties           |
| :---------: | :----------------------: | :---------------------------: |
|   **200**   |         Created          |          `data: {}`           |
|   **404**   | Item already registered | `error: { type, message }`     |
|   **500**   |  Internal Server Error   | `error: { type, message }`    |

###### &nbsp; &nbsp; GET _`/recommendations/`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  //empty
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           | `data: {  recommendations  }` |
|   **500**   | Internal Server Error | `error: { type, message }`    |

###### &nbsp; &nbsp; GET _`/recommendations/:id`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  //empty
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           | `data: {  recommendation  }`  |
|   **404**   |    Item not found     | `error: { type, message }`    |
|   **500**   | Internal Server Error | `error: { type, message }`    |

###### &nbsp; &nbsp; GET _`/recommendations/random`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  //empty
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           | `data: {  recommendation  }`  |
|   **404**   |    Item not found     | `error: { type, message }`    |
|   **500**   | Internal Server Error | `error: { type, message }`    |

###### &nbsp; &nbsp; GET _`/recommendations/top/:amount`_

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  //empty
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           | `data: {  recommendations  }` |
|   **500**   | Internal Server Error | `error: { type, message }`    |

#

###### Template created by [Nivaldo Farias](https://github.com/NivaldoFarias/typescript-project-template).
