FROM eclipse-temurin:22-jdk
MAINTAINER zaraclone.com
WORKDIR /app

COPY target/backend-0.0.1-SNAPSHOT.jar /app/backend-0.0.1-SNAPSHOT.jar

EXPOSE 6789

CMD ["java", "-jar", "/app/backend-0.0.1-SNAPSHOT.jar"]

