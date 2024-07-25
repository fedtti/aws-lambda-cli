# Create AWS Lambda

Create an AWS Lambda starter project for Node.js

- [Description](#description)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Contributing](#contributing)
- [Notes](#notes)

## Description

This tool creates an AWS Lambda starter project, built for Node.js, based on the infomation provided.

## Getting Started

### Prerequisites

- Node.js v20.x+

### Installation

<pre lang="javascript">
npm i -g @fedtti/create-aws-lambda
</pre>

### Usage

<pre lang="javascript">
npx create-aws-lambda <em>folder-name</em>
</pre>

If you don't provide a folder name, it will fallback to `my-lambda`. Strings will be sanitized as kebab-case.

It supports the following environment variables:
- `AWS_DEFAULT_REGION`
- `AWS_REGION`
- `NODE_ENV`

## Contributing

## Notes

It has been developed working at [Vivocha](https://www.vivocha.com/) to speed up the AWS Lambda project bootstrapping process in Node.js.
