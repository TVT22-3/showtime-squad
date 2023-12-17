# Showtime Squad - Fullstack Web Application for Movie Lovers

![Maven Build](https://github.com/tvt22-3/showtime-squad/actions/workflows/backend-tests.yaml/badge.svg)
![React Tests](https://github.com/tvt22-3/showtime-squad/actions/workflows/frontend-tests.yaml/badge.svg)

## ABOUT

Showtime Squad is a website for movie hobbyists. In Showtime Squad you can browse movies, create an account, review movies and share your personal page to let others see what kind of media you are all about.

This is a fullstack application running on Vite-React + Java Spring Boot + PostgreSQL combo.

The goal of this project was to familiarize team members with close to real life applications of agile development, fullstack systems, authentication, interactive and dynamically updating frontend, unit testing, CI/CD pipelines and more.

### Creators
* Antti Jylhä [@Jylant](https://github.com/Jylant)
  - Backend:
    * Everything userLists
    * First half of TMDB controller
    * Abandoned unit test attempt 
  - Frontend:
    * navbar
    * (almost ready) lists connected to Miika's view/movie blocks
  - Other:
    * Database ER Diagram
    * Postman documentation

* Mika Korkiakoski [@mikakorkiakoski](https://github.com/mikakorkiakoski)
  - Backend:
    * Partial TMDB controller's implementation.
    * Everything related to reviews.
  - Frontend:
    * User related stuff: register, login and logout.
    * Contexts to pass data sitewide (options button context excl.)
    * Everything related to Movies page and TV series page.
    * TMDB requests.
    * Filters for movies and TV series (search bar's logic, filterbar etc.)
    * Everything related to reviews (profile page's reviews fetch excl.)
  - Other:
    * Postman documentation
    * UI design for movies page, tv series page, logout modal and register modal.

* Santtu Niskanen [@santtuniskanen](https://github.com/santtuniskanen)
  - Backend:
    * Endpoints for Profile (username, images, reviews)
    * Login/Registration Unit Tests
    * Relevant Endpoints for User Profile
  - Frontend:
    * Design and Implementation of Profile
  - Other:
    * GitHub Actions Pipeline for Maven (Backend)
    * UI Design for Profile
    * Partial Database management on Render (PostgreSQL)

* Miika Tiihonen [@Wh1teh](https://github.com/Wh1teh)
  - Backend:
    * User related stuff: register, auth, and user + related data deletion
    * Everything groups related
    * Unit tests for user deletion
  - Frontend:
    * General layout
    * Everything on groups page
    * User deletion in settings
    * Footer
    * Unit tests for some components 
    * Modular blocks for displaying fun stuff (backend integration unimplemented)
  - Other:
    * UI design for index and news
    * Postman documentation
    * Deployment of frontend as static site to render.com
    * Deployment of backend as Docker container web service to render.com
    * Partial management of PostgreSQL database online on render.com
    * Partial GitHub Actions CI/CD pipeline management and setup
    * Partial agile and repository etc. management

### DOCUMENTATION

[Postman documentation](https://documenter.getpostman.com/view/26545619/2s9Ye8hFMi)

[ER-Diagram](documentation/database/ER-diagram-pic.png)

[UI mockups and examples](documentation/frontend)

## SETUP

### Backend

The Backend is powered by Spring Boot. <br>
Spring recommends [BellSoft Liberica JDK 17](https://bell-sw.com/pages/downloads/#jdk-17-lts)
for the Java™ Development Kit (JDK), which is also what we ended
up using for the project.

#### Setup and requirements

Create the following file (relative to the root of the project)

`/showtime-squad_backend/src/main/resources/application.properties`

```bash
# External services
TMDB_API_KEY=${TMDB_API_KEY}
PROFILE_PICTURES=${PROFILE_PICTURES}

# Database credentials
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}

# JPA
spring.jpa.hibernate.ddl-auto=${SPRING_JPA_HIBERNATE_DDL_AUTO}
spring.jpa.properties.hibernate.dialect=${SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT}
spring.datasource.driver-class-name=${SPRING_DATASOURCE_DRIVER_CLASS_NAME}

# JWT
showtimesquad.app.jwtCookieName=${SHOWTIMESQUAD_APP_JWTCOOKIENAME}
showtimesquad.app.jwtSecret=${SHOWTIMESQUAD_APP_JWTSECRET}
showtimesquad.app.jwtExpirationMs=${SHOWTIMESQUAD_APP_JWTEXPIRATIONMS}

# CORS
FRONTEND_URL=${FRONTEND_URL}
```

> [!IMPORTANT]
> See more detailed explanations below and in the database section.

> [!TIP]
> You can also create a .env-file and pass it to a Docker container like `docker run --env-file=./.env -p 8080:8080 showtime-squad-app` or inject them into the program during launch like `-Dtmdb.api.key=$TMDB_API_KEY` etc.

##### TMDB API Key

You should head over to [https://developer.themoviedb.org/reference/intro/getting-started](https://developer.themoviedb.org/reference/intro/getting-started) and create an account to get access to their movie database.

##### Profile pictures

The application randomly generates a profile picture for the user.
In order to get the correct profile pictures, you need to add a field
into the `application.properties` file.
```bash
PROFILE_PICTURES=https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?,/{another_link_here},/{...}
```

##### JWT

This is an example config for a JWT that expires in 24 hours.

> [!CAUTION]
> You should  <ins>**always**</ins> generate your own JWT secret key, do not use this example key for any real life application. 
```yaml
showtimesquad.app.jwtCookieName=showtimesquad
showtimesquad.app.jwtSecret=r9kxRZ9kAUNgmllnkaaWN3s1DD5oluVsEfjK96HSwsTKTWnaO0HviwNNauMrP1X95YICDJ01L6Zmiv3wpZX/7Q==
showtimesquad.app.jwtExpirationMs=86400000
```

##### CORS

You will also need the URL for the location of the Front End 
Application, for example
```bash
FRONTEND_URL=http://localhost:5173
```

#### Running the application

```bash
mvn spring-boot:run
```
or

```bash
./mvnw spring-boot:run
```

### Database

#### Setup and requirements

- PostgreSQL 15

##### Configuring Database access for local Postgres instance

```yaml
spring.datasource.url=jdbc:postgresql://localhost:5432/<database>
spring.datasource.username=<username>
spring.datasource.password=<password> (empty if password hasn't been set)
```

##### Configuring Database access for external Postgres instance

```yaml
spring.datasource.url=jdbc:postgresql://<hostname>.<location>-postgres.render.com/<database>
spring.datasource.username=<username>
spring.datasource.password=<password>
```

##### General JPA and Hibernate config

```yaml
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.datasource.driver-class-name=org.postgresql.Driver
```

> [!WARNING]
> The Spring Boot application and Hibernate takes care of initializing required tables and rows. You should run this app on fresh database only to avoid problems with constraint mismatches etc.

### Frontend

#### Setup and requirements

Node.js 16 or higher

```yaml
npm install
```

##### .env
The .env file contains the location of the Backend Application and the 
URL for the external fonts required by certain views. 

Create the following file (relative to the root of the project)

`/showtime-squad_frontend/.env`

```bash
VITE_REACT_APP_BACKEND_BASE_URL=http://localhost:8080
VITE_REACT_APP_FONT_AWESOME_URL=https://kit.fontawesome.com/c3d2bb709a.js
```

##### Run app:

```yaml
npm run dev
```

##### Run unit tests:

```yaml
npm run test
```

##### Build app for deployment:

```yaml
npm run build
```
