## Cultum Front-end Starter Kit

> Basic project structure organizations and start point for a new project

## Getting Started

~ Clone project into your local projects folder:

`git clone git@gitlab.com:Venumteam/cultum-fe-starter-kit.git`

~ Open cloned project in the `IDE`

*deploy information goes here

> Basic flow example:

- MR's should be created to develop branch
- When merged, release branch can be created and merged to the master branch
- To deploy staging master should be merged to the staging
- To deploy production staging should be merged to the production branch

## Prerequisites

> To work on this project you should install:

- `IDE` - code editor
- `git` - version control system
- `nvm` - node version package manager
- `nodejs` - check `nvmrc` file in the root to get the right version and install package via `nvm`
- `yarn` - package manager

> default API or local ports you can find in the .env.example

## Installing

> Steps to run application in the DEV environment:

1. `yarn` - install all required packages
2. copy `.env.example.local` to the root and create `.env.local` file
3. `yarn dev` - run local server

> Steps to run application in PROD environment:

1. 1 & 2 steps from the steps above, if not already used
2. `yarn build` - builds the project
3. `yarn start` - start prod environment

> Additional Scripts

1. `type-check` - run the type checking process
2. `format` - run prettier for your current changes
3. `lint` - run lint check

## Coding style

- Project has configured `Prettier` which helps stick to rules of coding style.
- Check the shortcuts for your `IDE` to run `Prettier` for current file

## Deployment

Every merge request which merged to `Staging` or `Prod` branches runs the deployment process to corresponding live
environment
