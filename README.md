
### Start postgres
```
docker-compose run --service-ports database
```

### running tests
**REQUIRED: Database must be running for integration tests to work**
```
./gradlew clean test
```
