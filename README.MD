# ODIN BOOK

##### Connecting with your friends.

### Introduction

- A full-stack MERN Application, call Odin Book. Where user can create making new friends, create posts and comment on friends' posts.

Project in action - [Odin Book](https://odin-book.herokuapp.com/landing)

### Features:

User can :

- create posts.
- like on other users' posts.
- comment on other users' posts.
- send friend requests to others.
- friend requests can be revoked, accepted or declined.
- friends can see each other's posts.
- customizable profile page with profile picture.
- search for users based on user name.
- search for posts based on post content.

![Dashboard image](https://res.cloudinary.com/dbvndh29t/image/upload/v1656426473/odin-book/dashboard_hh1dr5.png)

#### Run the app locally

```sh
npm run install-dependencies
```

- rename file .env.temp to .env
- set up values for MONGO_URI, JWT_SECRET, JWT_LIFETIME,
- set up values for CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET for connecting to Cloudinary service

```sh
npm start
```

- visit url http://localhost:3000/

#### Screenshots of the project

- Landing page
  ![Landing page](https://res.cloudinary.com/dbvndh29t/image/upload/v1656426277/odin-book/landing-page_l9s5t0.png)

- User profile page
  ![User profile page](https://res.cloudinary.com/dbvndh29t/image/upload/v1656426278/odin-book/profile-page_cufpfz.png)

- Search page
  ![Search post](https://res.cloudinary.com/dbvndh29t/image/upload/v1656427163/odin-book/search-post_u0wpry.png)

  ![Search user](https://res.cloudinary.com/dbvndh29t/image/upload/v1656426277/odin-book/search-user_ffpour.png)
