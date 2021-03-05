[![CodeQL](https://github.com/imagineai/create-node-app/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/imagineai/create-node-app/actions/workflows/codeql-analysis.yml)

# node-rest

## Launch App

```
$ yarn install
$ yarn start
```

Sample .env file:

```
DB_USER=
DB_PASSWORD=
DB_DIALECT=sqlite
DB_DATABASE=node-rest-dev.sqlite
DB_STORAGE=node-rest-dev.sqlite
TEST_DB_USER=
TEST_DB_PASSWORD=
TEST_DB_DIALECT=sqlite
TEST_DB_DATABASE=node-rest-dev.sqlite
TEST_DB_STORAGE=node-rest-dev.sqlite
```

## Utilities and useful commands

- Developer mode

```
$ yarn start-dev
```

- Docker compose

Build project and start

```
$ yarn run docker:build
```

Start with a pre builded project

```
$ yarn run docker:up
```

- Lint and Prettify code

```
$yarn lint
$yarn format
```

- Swagger

Go to [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/) URL to see the API documentation
