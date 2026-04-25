import { faker, Faker } from "@faker-js/faker";

export class Randomdata
{
    static getfirstname():string
    {
        return faker.person.firstName()
    }

    static getlastname()
    {
        return faker.person.lastName()
    }

    static getpassword()
    {
        return faker.internet.password()
    }

    static getemail()
    {
        return faker.internet.email()
    }

    static getphonenumber()
    {
        return faker.phone.number()
    }
    
}