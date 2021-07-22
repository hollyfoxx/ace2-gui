# ACE2 GUI Development Guide
## Backend (FastAPI) commands
### Run unit tests
```
docker-compose run -e TESTING=1 backend pytest
```

## Frontend (Vue.js) commands
### Compile and minify for production
```
docker-compose run frontend npm run build
```

### Run unit tests
```
docker-compose run frontend npm run test:unit
```

### Run end-to-end tests
```
docker-compose run frontend npm run test:e2e
```

### Lint and fix files
```
docker-compose run frontend npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).