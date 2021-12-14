## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app.

### `npm run test`

Launches the test runner.

## Main architecture
Main logic of application is placed under `/features` folder. Features has connection to redux state.
Folder `/components` contains representational components that are supposed to be reused.
Async actions are handled with redux-observable and rxjs.
