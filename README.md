# WakieWakie

A dating app that aims to match people nearby based on the time they wake up. The goal of this app is to foster a much deeper connection between matches, and increase the time surface that they can interact by matching them by their sleep schedules.

## Setup

**Prerequisites**

- [`Yarn`](https://yarnpkg.com/) This is the package manager used in this project, additionally the `workspaces` feature is used extensively in this project, so this becomes a must.
- [`PostgreSQL`](https://www.postgresql.org/download/) This is used as the database.
- [`Redis`](https://redis.io/) (Optional) This is only used if you intend to try out using Redis for the session storage. But why?

1. Clone this repository.
2. Go into the directory using `cd WakieWakie`.
3. Install the necessary dependencies using `yarn`.
4. Create an empty database in `PostgreSQL`. This will be used later on for migrations, make sure to use the name of this database for the `server/.env` config.
5. Configure the necessary environment variables on your local machine, check the [ENV](#env) section. At a minimum, you only need to configure the following environment variables in `server/.env` to be able to run the application locally.

```bash
# Database Configurations
DB_USERNAME = postgres          # Database Username for Postgres (default: "postgres")
DB_PASSWORD = postgres          # Password for Postgres          (default: "")
DB_HOSTNAME = localhost         # Hostname for Postgres          (default: "localhost")
DB_DATABASE = wakiewakie        # Database name for Postgres
DB_PORT     = 5432              # Postgres running port          (default: 5432)
```

6. Run the migrations on the database using `yarn db:migrate`.
7. Run the app locally using `yarn dev`.
   > This runs the client at `http://localhost:5173`, and the server at `http://localhost:4000`.
8. Open the web app on your desired browser using the URL above.
   > If you want to test out the server via the `Apollo GraphQL Explorer`, you can head over to `http://localhost:4000/graphql`. Make sure to enable the [cookies setting](https://community.apollographql.com/t/allow-cookies-to-be-sent-alongside-request/920/7).

## ENV

These are the available environment variables that are configurable for this application. You can check the `.env.example` file on each directory for a quick breakdown of the environment variables.

> Note: All values are inferred as strings, and are parsed appropriately in the application. For example `Port` is a string value of 4000, it is parsed to its number counterpart in the application.

#### Variables for `server/.env`

| Field            | Values                              | Required | Default                                                            | Description                                                         |
| ---------------- | ----------------------------------- | -------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| DB_USERNAME      | `string`                            | ✅       | `postgres`                                                         | Database Username for PostgreSQL                                    |
| DB_PASSWORD      | `string`                            | ✅       | ` `                                                                | Password for PostgreSQL                                             |
| DB_HOSTNAME      | `string`                            | ✅       | `localhost`                                                        | Hostname for PostgreSQL                                             |
| DB_DATABASE      | `string`                            | ✅       |                                                                    | Database name for PostgreSQL                                        |
| DB_PORT          | `number`                            | ✅       | `5432`                                                             | Postgres running port                                               |
| PORT             | `number`                            |          | `4000`                                                             | Port number                                                         |
| NODE_ENV         | `development`, `test`, `production` |          | `development`                                                      | Running environment of the server                                   |
| REDIS_CONNECTION | `string`                            |          | Defaults to using `MemoryStore` if not set instead of `RedisStore` | Connection string to a Redis instance                               |
| CORS_ORIGIN      | `string`                            |          | `http://localhost:4000`, `http://localhost:5173`                   | A list of URLs (separated by a space) that are allowed through CORS |
| SESSION_SECRET   | `string`                            |          | `This is a secret in localhost.`                                   | The secret used for signing sessions                                |

> At most `REDIS_CONNECTION`, `CORS_ORIGIN`, and `SESSION_SECRET` will only be used for deployment.

#### Variables for `client/.env`

| Field                    | Values                              | Required | Default                         | Description                                   |
| ------------------------ | ----------------------------------- | -------- | ------------------------------- | --------------------------------------------- |
| NODE_ENV                 | `development`, `test`, `production` |          | `development`                   | Running environment of the server             |
| VITE_GRAPHQL_ENDPOINT    | `string`                            |          | `http://localhost:4000/graphql` | The endpoint for GraphQL queries              |
| VITE_GRAPHQL_WS_ENDPOINT | `string`                            |          | `ws://localhost:4000/graphql`   | The endpoint for GraphQL subscription queries |

## Deployment

This application has been deployed over at [Vercel](https://wakiewakie.vercel.app/). However, do note that `Real-Time Communication` and `Notifications` do not work on the deployed application. This is due to the [limitations of Vercel](https://vercel.com/docs/limits/overview#websockets), wherein they do not support their `Serverless Functions` to act like a [WebSocket Server](https://en.wikipedia.org/wiki/WebSocket). This means that you can only test out those functions by refreshing the page forcibly.

## Authors and Acknowledgement

- [Jonh Alexis Buot](https://github.com/LaplaceXD) [Project Manager, Back-End Developer]
- [Sherly Jao](https://github.com/jaosherlyr) [Web Designer, Front-End Developer]

## Contributing

Unfortunately, we are not accepting pull requests, since this is a one-time project. However, feel free to fork this project, and improve on it!

## License

[GNU General Public License v3.0](https://github.com/LaplaceXD/WakieWakie/blob/master/LICENSE)
