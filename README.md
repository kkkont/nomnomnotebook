# NomNomNotebook

NomNomNotebook is a web application dedicated to recipe sharing and storage, providing a digital space a space for food lovers to connect and explore a variety of delicious dishes.

# Features

## User-Friendly Account Management

Creating an account is easy! Simply sign up and set up your profile to start sharing your recipes. With a personalized account, you can keep track of your own recipes and interact with others in the community.

## Publish or Keep It Private

One of the standout features of our application is the flexibility to choose how you share your recipes. Users can choose to share their recipes with everyone, creating a friendly community and exploring new culinary delights together. Alternatively, if you prefer to keep your recipes private, you can store them on your own page.

## Interact with the Community

Engage with other food enthusiasts by liking and commenting on their posted recipes. This interactive element adds a social layer to the platform, allowing users to connect, share tips, and celebrate the joy of cooking together.

# How to run the project

## Database setup

### PostgreSQL and pgAdmin

1. Install PostgreSQL and pgAdmin tool.
2. During PostgreSQL installation set superuser password and port.
3. With pgAdmin tool create a database

### Configure Backend Database Connection:

1. Open the database.js file in the backend directory.
1. Replace parameters in "const pool" with the corresponding values you set in pgAdmin for your PostgreSQL database.

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
