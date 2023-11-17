# showtime-squad

## SETUP

### Backend

The Backend is powered by Spring Boot. <br>
Our Spring application requires Java 17 or later.

#### Setup and requirements

Create file ```backend/src/main/resources/application.properties:```

```
TMDB_API_KEY=<your the movie database api key>
```

#### Running the application

``` java
mvn spring-boot:run
        or
./mvnw spring-boot:run)
```

### Database

#### Setup and requirements

- PostgreSQL 15

##### Configuring Database access for local Postgres instance

```
spring.datasource.url=jdbc:postgresql://localhost:5432/<database>
spring.datasource.username=postgres (or other username)
spring.datasource.password=<password> (empty if password hasn't been set)
spring.datasource.driver-class-name=org.postgresql.Driver
```

##### Configuring Database access for external Postgres instance

```
spring.datasource.url=jdbc:postgresql://<hostname>.<location>-postgres.render.com/<database>
spring.datasource.username=<username>
spring.datasource.password=<password>
spring.datasource.driver-class-name=org.postgresql.Driver
```

### Frontend

#### Setup and requirements

Vite requires Node.js 14.18 or higher

`npm install`

#### Run app:

`npm run dev`
