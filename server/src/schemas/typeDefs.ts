const typeDefs = `
scalar Date

type User{
id: ID!
  firstName: String!
  lastName: String!
  password: String!
  email: String!
  city: String!
  age: Int
  weight: Int
  height: Int
  gender: String
  createdAt: Date
}
type  Auth{
    token: String!
    user: User!
    }

type Query{
    me: User
} 

input UserInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  city: String!
  age: Int
  weight: Int
  height: Int
  gender: String
}
   
type Mutation{
    login(email: String!, password: String!): Auth
    addUser(input:UserInput): Auth
}    
`;
export default typeDefs;