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
}`