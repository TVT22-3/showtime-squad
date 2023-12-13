# Use an official Maven image as the base image
FROM maven:3.8.4-openjdk-17-slim AS build
# Set the working directory in the container
WORKDIR /

# Copy the pom.xml and the project files to the container
COPY pom.xml .
COPY src ./src

# Build the application using Maven
RUN mvn clean package -DskipTests

# Use an official OpenJDK image as the base image
FROM openjdk:17-jdk-slim
# Set the working directory in the container
WORKDIR /

# Copy the built JAR file from the Maven build stage to the container
COPY --from=build /target/showtimesquad-0.0.1-SNAPSHOT.jar ./

# Set environment variables during runtime
ARG TMDB_API_KEY
ARG PROFILE_PICTURES
ARG SPRING_DATASOURCE_URL
ARG SPRING_DATASOURCE_USERNAME
ARG SPRING_DATASOURCE_PASSWORD
ARG SPRING_JPA_HIBERNATE_DDL_AUTO
ARG SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT
ARG SPRING_DATASOURCE_DRIVER_CLASS_NAME
ARG SHOWTIMESQUAD_APP_JWTCOOKIENAME
ARG SHOWTIMESQUAD_APP_JWTSECRET
ARG SHOWTIMESQUAD_APP_JWTEXPIRATIONMS
ARG FRONTEND_URL

# Set the command to run the application with environment variables
CMD ["sh", "-c", "java -Dtmdb.api.key=$TMDB_API_KEY -Dprofile.pictures=$PROFILE_PICTURES -Dspring.datasource.url=$SPRING_DATASOURCE_URL -Dspring.datasource.username=$SPRING_DATASOURCE_USERNAME -Dspring.datasource.password=$SPRING_DATASOURCE_PASSWORD -Dspring.jpa.hibernate.ddl-auto=$SPRING_JPA_HIBERNATE_DDL_AUTO -Dspring.jpa.properties.hibernate.dialect=$SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT -Dspring.datasource.driver-class-name=$SPRING_DATASOURCE_DRIVER_CLASS_NAME -Dshowtimesquad.app.jwtCookieName=$SHOWTIMESQUAD_APP_JWTCOOKIENAME -Dshowtimesquad.app.jwtSecret=$SHOWTIMESQUAD_APP_JWTSECRET -Dshowtimesquad.app.jwtExpirationMs=$SHOWTIMESQUAD_APP_JWTEXPIRATIONMS -DfrontEndUrl=$FRONTEND_URL -jar showtimesquad-0.0.1-SNAPSHOT.jar"]
