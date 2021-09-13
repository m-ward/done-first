## Frontend instructions

This frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using TypeScript. Please refer to the source for more information.

Start development client:
```
yarn start
```

Run client tests: After you write them because I didn't have time to get to that :shame:
```
yarn test
```

Build client for production:
```
yarn build
```

Start json-server mock api
```
yarn stubapi
```

Typical workflow if only working on the client:
1) Open 2 terminal instances to this directory
2) In one, run  `yarn stubapi`
3) In the other, run `yarn start`
4) Enjoy working on the client with mock data being served from `tools/db.json`