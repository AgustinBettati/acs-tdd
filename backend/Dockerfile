#se tiene que correr ./gradlew build para que se genere el jar

FROM java:8-jdk-alpine

COPY ./build/libs/backend-0.0.1.jar /usr/app/

WORKDIR /usr/app

RUN sh -c 'touch backend-0.0.1.jar'

ENTRYPOINT ["java","-jar","backend-0.0.1.jar"]

#TODO que no copie solo el jar, que haga el build con el gradlew