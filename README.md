# Recipe blog application project

# How to run the project

## Database

### PostgreSQL and pgAdmin

1. Install PostgreSQL and pgAdmin tool.
2. During PostgreSQL installation set superuser password and port.
3. With pgAdmin tool create a database

### database.js file in backend directory

1. Replace parameters in const pool with the corresponding values you set in pgAdmin for your PostgreSQL database.

## Run backend

### Navigate to the backend directory

```
cd back
```

### Install dependencies

```
npm install
```

### Run the project

```
npm start
```

or

```
npm server.js
```

## Run frontend

### Navigate to the frontend directory

```
cd front
```

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```
