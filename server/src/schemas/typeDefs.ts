const typeDefs = `
scalar Date

# 🏋️‍♂️ User Profile
type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  city: String
  age: Int
  weight: Int
  height: Int
  gender: String
  createdAt: Date
}

# 🔑 Authentication Payload
type Auth {
  token: String!
  user: User!
}

# 🏋️‍♂️ Workout Logging
type Workout {
  id: ID!
  userId: ID!
  activity: String!
  duration: Int! # Minutes
  date: Date!
  caloriesBurned: Int
}

# 🎯 Fitness Goals
type Goal {
  id: ID!
  userId: ID!
  goalText: String!
  targetDate: Date!
  startDate: Date!
  progress: Int!
  completed: Boolean!
}

# 🔍 Queries
type Query {
  me: User
  workouts: [Workout]
  goals: [Goal]
}

# 🏋️‍♂️ Input for Adding Workouts
input WorkoutInput {
  activity: String!
  duration: Int!
  date: Date!
}

# 🎯 Input for Setting Goals
input GoalInput {
  goalText: String!
  targetDate: Date!
  startDate: Date!
}

# ✏️ Input for Updating Profile
input UpdateUserInput {
  firstName: String
  lastName: String
  city: String
  age: Int
  weight: Int
  height: Int
  gender: String
}

# 🔧 Mutations (CRUD)
type Mutation {
  login(email: String!, password: String!): Auth
  addUser(input: UserInput!): Auth
  updateProfile(input: UpdateUserInput!): User
  deleteUser: Boolean

  # 🏋️‍♂️ Workouts (CRUD)
  addWorkout(input: WorkoutInput!): Workout
  deleteWorkout(id: ID!): Boolean

  # 🎯 Fitness Goals (CRUD)
  addGoal(input: GoalInput!): Goal
  deleteGoal(id: ID!): Boolean
}

`;

export default typeDefs;
