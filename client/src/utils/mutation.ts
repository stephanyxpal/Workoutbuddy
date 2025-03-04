import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
login(email: $email, password: $password) {
token
user {
email
}
}
}
`;

export const ADD_USER = gql`
mutation addUser($input: UserInput!) {
  addUser(input: $input) {
    user {
      firstName
      lastName
    }
    token
  }
}
`;

export const ADD_WORKOUT = gql`
mutation AddWorkout($input: WorkoutInput!) {
  addWorkout(input: $input) {
    workoutType
    weightUsed
    userId
  }
}
`;

export const ADD_GOAL = gql`
mutation AddGoal($input: GoalInput!) {
  addGoal(input: $input) {
    userId
    goalText
  }
}
`
export const DELETE_WORKOUT = gql`
mutation Mutation($deleteWorkoutId: ID!) {
  deleteWorkout(id: $deleteWorkoutId)
}
`

export const UPDATE_WORKOUT = gql`
mutation Mutation($updateWorkoutId: ID!, $input: updWorkoutInput) {
  updateWorkout(id: $updateWorkoutId, input: $input) {
    workoutType
    weightUsed
    repetitions
    duration
    caloriesBurned
  }
}
`