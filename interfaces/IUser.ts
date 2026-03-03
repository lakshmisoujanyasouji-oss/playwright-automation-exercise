export interface IUser {
    name: string;
    email?: string;        // optional - auto generated dynamically
    password: string;
    day: string;
    month: string;
    year: string;
    firstName: string;
    lastName: string;
    company?: string;      // optional - not mandatory field
    address: string;
    address2?: string;     // optional - not mandatory field
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
}