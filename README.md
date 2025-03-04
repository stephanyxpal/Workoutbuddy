# Workout Buddy

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Description
Workout Buddy is a fitness tracking app designed to help users log their workouts, set fitness goals, and track their progress. Built with React and Chakra UI for the frontend and GraphQL for routing, the app provides an interactive and user-friendly experience. The App is deployed to render and CICID pipeline is set up using github actions.

**Features**
User Authentication: Secure login and registration system.
Workout Logging: Track different exercises, duration, and intensity.
Goal Setting: Set fitness goals and track progress over time.
Progress Tracking: View workout history and monitor improvements.
Responsive Design: Optimized for mobile and desktop views using Chakra UI.
GraphQL API: Efficient data fetching and state management.

**Component Details**
1. Signup and Login Page
A user can log in to the application using their email ID and password. The password is encrypted using the bcrypt package. When authentication is successful, the JWT token is stored in local storage for authentication validation. If a user does not have an account, they can create one by providing their email, password, and basic details. When a user logs out, the stored JWT token is deleted.
2. Home Page
After logging in, users are redirected to the dashboard, where they can see an overview of their fitness progress. The dashboard displays key metrics such as total workouts completed, progress toward goals, and recent activity logs.
3. Workout Logging Page
Users can log their workouts by entering exercise details, including:
Exercise name
Duration
calories burned
Repetitions/sets (if applicable)
Each workout entry is saved and can be reviewed later in the history section.
4. Goals Page
Users can set fitness goals, such as target weight, workout frequency, or exercise-specific milestones. The app tracks goal completion and provides visual progress indicators.
5. Profile Page
Users can see their profile details.

## Table of Contents

- [Workout Buddy](#workout-buddy)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
  - [Deployed Site](#deployed-site)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [License](#license)
  - [Contributing](#contributing)
  - [Images :](#images-)
  - [Screenshots](#Screenshots)
  - [Questions](#questions)

## Usage

1. ***Clone the repository:***
   ```bash
   git clone https://github.com/stephanyxpal/Workoutbuddy.git
   ```
2. ***Install Dependencies:*** 
   ```bash
   cd server && npm install && npm run build && npm run seed
   cd ../client && npm install && npm run build
   ```

3. ***Start the Development Server***
   ```bash
   npm run start

4. ***Open Browser and navigate to:***
   ```bash
   http://localhost:3000     


## Deployed Site

https://workoutbuddy-f6uy.onrender.com


## Features
- Log workouts, times and goals in each text box
- Save information to your account
- View data saved on acitvity log
- Responsive for mobile and desktop 

## Technologies Used
Frontend: React, Chakra UI
Backend: Node.js, Express, GraphQL
Database: MongoDB, Mongoose
Authentication: JSON Web Tokens (JWT)

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit)

## Contributing
Maurice Zuniga, Kaviyarasi Krishnan, Stephany Palacios, James Friel 

# Images :
Photo by <a href="https://unsplash.com/@risennnnn?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Risen Wang</a> on <a href="https://unsplash.com/photos/gym-equipment-inside-room-20jX9b35r_M?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

## Screenshots

### Home Page
![Home Page](screenshots/Home%20Page.png)

### Goal Page
![Goal Page](screenshots/Goal%20Page.png)

### Sign Up Page
![Sign Up Page](screenshots/Sign%20Up%20Page.png)
      

## Questions
Can contact us through Github: 

[stephanyxpal](https://github.com/stephanyxpal)
[jtfriel](https://github.com/jtfriel)
[mauricek12d](https://github.com/mauricek12d)
[gitkaviyarasi](https://github.com/pink727gitkaviyarasi)
