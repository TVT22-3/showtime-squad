# syntax = docker/dockerfile:1.2

# Use an official Maven image as the base image
FROM maven:3.8.4-openjdk-17-slim AS build
# Set the working directory in the container
WORKDIR /app

# Copy only the pom.xml to cache dependencies
COPY pom.xml .
# Download dependencies
RUN mvn dependency:go-offline

# Copy the rest of the project files to the container
COPY src ./src

# Build the application using Maven
RUN mvn clean package -DskipTests

# Use an official OpenJDK image as the base image
FROM openjdk:17-jdk-slim
# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file from the Maven build stage to the container
COPY --from=build /app/target/showtimesquad-0.0.1-SNAPSHOT.jar ./app.jar

# Set the command to run the application with environment variables
ENTRYPOINT [ "java", "-jar", "/app.jar" ]
