![Numida](./logo.numida.png)

# Setup

The project was migrated to PNPM Package Manager from NPM to work well with ShadCN Ui lib. To set it up, follow the official instructions [here](https://pnpm.io/installation)

## Server

To run the server, change to the server directory then run:

```sh
docker compose up --build
```

## Web

To run the web app, run:

```sh
pnpm run dev
```

To build the web app, run:

```sh
pnpm run build
```

To Preview the web app, run:

```sh
pnpm run preview
```

To serve/run the production build, run:

```sh
pnpm run serve
```

To run tests, run:

```sh
pnpm run test
```

## Notes

The server stores the loans and loan_payments in-memory, so the data you work with will be reset the the initial states each time the server is restarted.

### Improvements

Given time, I would implement the following:

- Properly set up apollo client, react and typescript to automatically generate hooks and consume `.graphql` files.
- Store the API base urls and secrets in env variables and properly setup env validation using `t3-env`
- Add comprehensive observability i.e. logging using a service like betterstack, monitoring using betterstack, error tracing using sentry etc
  - Set up a proper logger like pino or winston instead of the simple consola
- Properly setup a global state management like `zustand` to supplement `tanstack-query`
- Maybe setup a Persister for tanstack query for `local-first` architecure.
  - `@tanstack/react-query-persist-client`
  - `@tanstack/query-async-storage-persister`
