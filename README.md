
### using local database

**REQUIRED: PostgreSQL is running**
database: `spatialspring` & externalCourse: `postgres` & password: `admin`

```
./gradlew clean bootRun
```

### running tests
**REQUIRED: Database must be running for integration tests to work**
```
./gradlew clean test
```
