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
  goals:[Goal]
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
  workoutType: String!
  duration: Int!
  caloriesBurned: Int
  date: Date!
  repetitions: Int
  sets: Int
  weightUsed: Int
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

# ✅ Add UserInput
input UserInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  city: String
  age: Int
  weight: Int
  height: Int
  gender: String
}

input WorkoutInput {
  workoutType: String!
  duration: Int!
  caloriesBurned: Int
  date: Date!
  repetitions: Int
  sets: Int
  weightUsed: Int
}

input updWorkoutInput {
    duration: Int!
    caloriesBurned: Int!
}
# ✅ Add GoalInput
input GoalInput {
  goalText: String!
  targetDate: Date!
  startDate: Date!
}


# 🔍 Queries
type Query {
  me: User
  workouts: [Workout]
  goals: [Goal]
}

# 🔧 Mutations (CRUD)
type Mutation {
  login(email: String!, password: String!): Auth
  addUser(input: UserInput!): Auth
  updateProfile(input: UserInput!): User
  deleteUser: Boolean

  # 🏋️‍♂️ Workouts
  addWorkout(input: WorkoutInput!): Workout
  deleteWorkout(id: ID!): Boolean
  updateWorkout(id: ID!,input: updWorkoutInput):Workout

  # 🎯 Fitness Goals
  addGoal(input: GoalInput!): Goal
  updateGoalProgress(id: ID!, progress: Int!): Goal
  deleteGoal(id: ID!): Boolean
}
`;

export default typeDefs;
