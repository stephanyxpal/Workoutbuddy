import { gql } from '@apollo/client';

export const Me = gql`
query Me {
  me {
    goals {
    
      goalText
    
    }
    weight
    lastName
    height
    firstName
    email
    city
    age
  }
}`;

export const Workouts = gql`
query Workouts {
  workouts {
    workoutType
    weightUsed
    sets
    repetitions
    id
    duration
    date
    caloriesBurned
  }
}`