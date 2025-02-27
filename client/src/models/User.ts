export interface UserLogin {
    email: string;
    password: string;
}

export interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city?: string;
    age?: number;
    weight?: number;
    height?: number;
    gender?: string;
    createdAt?: Date;
}
