# WakieWakie

A dating app that aims to match people nearby based on the time they wake up. The goal of this app is to foster a much deeper connection between matches, and increase the time surface that they can interact by matching them by their sleep schedules.

## Setup

**Prerequisites**

- [`Yarn`](https://yarnpkg.com/) This is the package manager used in this project, additionally the `workspaces` feature is used extensively in this project, so this becomes a must.
- [`PostgreSQL`](https://www.postgresql.org/download/) This is used as the database.

1. Clone this repository.
2. Go into the directory using `cd WakieWakie`.
3. Install the necessary dependencies using `yarn`.
4. Create an empty database in `PostgreSQL`. This will be used later on for migrations, make sure to use the name of this database for the `server/.env` config.
5. Configure the necessary environment variables on your local machine, check the [ENV](#env) section.
6. Run the migrations on the database using `yarn db:migrate`.
7. Run the app locally using `yarn dev`.
   > This runs the client at `http://localhost:5173`, and the server at `http://localhost:4000`.
8. Open the web app on your desired browser using the URL above.
   > If you want to test out the server via the `Apollo GraphQL Explorer`, you can head over to `http://localhost:4000/graphql`. Make sure to enable the [cookies setting](https://community.apollographql.com/t/allow-cookies-to-be-sent-alongside-request/920/7).

## ENV

These are the necessary environment variables that must be configured to run this application locally. You can check the `.env.example` on the respective machines for a quick breakdown of the environment variables.

> Note: All values are inferred as strings, and are parsed appropriately in the application. For example `Port` is a string value of 4000, it is parsed to its number counterpart in the application.

**Variables for `server/.env`**

| Field       | Values                      | Required | Default     | Description                       |
| ----------- | --------------------------- | -------- | ----------- | --------------------------------- |
| PORT        | `number`                    |          | `4000`      | Port number                       |
| NODE_ENV    | `dev`, `test`, `production` |          |             | Running environment of the server |
| DB_USERNAME | `string`                    |          | `postgres`  | Database Username for Postgres    |
| DB_PASSWORD | `string`                    |          | ` `         | Password for Postgres             |
| DB_HOSTNAME | `string`                    |          | `localhost` | Hostname for Postgres             |
| DB_DATABASE | `string`                    | ✅       |             | Database name for Postgres        |
| DB_PORT     | `number`                    |          | `5432`      | Postgres running port             |

## License

[GNU General Public License v3.0](https://github.com/LaplaceXD/WakieWakie/blob/master/LICENSE)
