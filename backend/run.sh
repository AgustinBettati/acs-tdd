cd .. && docker-compose run -d --service-ports database
cd backend && ./gradlew clean bootRun