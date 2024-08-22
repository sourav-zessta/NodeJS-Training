// joi Overview and Key Features

/*
  joi is a powerful data validation library for Node.js. It is used to validate 
  JavaScript objects, ensuring that the data you receive or process meets 
  the required structure and constraints. joi allows you to define schemas 
  for your data, specifying types, patterns, and rules. It is often used 
  for validating user inputs in APIs, form submissions, and other types 
  of data processing in Node.js applications.
  
  Key Features:
  - Schema Definition: Define the structure of your data, including required fields, 
    optional fields, data types, etc.
  - Validation: Validate data against the schema with detailed error messages if validation fails.
  - Chaining Methods: Chain methods to define constraints like min/max values, string patterns, enumerations, etc.
  - Custom Validation: Create custom validation rules to meet specific requirements.
  - Integration with Express: Easily integrate with Express middleware to validate request payloads.
*/

// Installation
// To install joi, use the following command:
// npm install joi

/*
  Note: The joi package provides its own type definitions, so there's no need 
  to install third-party type definitions when using it with TypeScript.
*/

// Example: Employee Schema Validation

import joi from 'joi';

const employeeSchema = joi.object({
  employeename: joi.string().min(3).max(10).required(), // Define a string field with min 3 and max 10 characters, required
  email: joi.string().email().required(), // Define an email field, required
  age: joi.number().integer().min(18).max(60), // Define an integer field for age, min 18 and max 60
  isActive: joi.boolean().default(true), // Define a boolean field with a default value of true
  roles: joi.array().items(joi.string()).min(1).optional(), // Define an array of strings, with a minimum of 1 item, optional
});

const employeeData = {
  employee: 'john_doe',
  email: 'john.doe@example.com',
  age: 25,
  isActive: true,
  roles: ['user', 'admin'],
};

// Validate the data against the schema
const { error, value } = employeeSchema.validate(employeeData);

if (error) {
  console.error('Validation failed:', error.details); // Output validation errors if any
} else {
  console.log('Validation succeeded:', value); // Output the validated data if validation succeeds
}

/*
  How It Works:
  - The employeeSchema defines the structure and rules for the user data.
  - The validate method checks the employeeData object against the schema.
  - If the data fails validation, the error object contains details about what went wrong.
  - If the data passes validation, the value object contains the validated and potentially modified data.
*/

// Custom Validation Example: Date Logic

const eventSchema = joi.object({
  event_name: joi.string().min(3).required(), // Define a string field for event name, required
  start_date: joi.date().required(), // Define a date field for start date, required
  end_date: joi.date().required().custom((value, helpers: joi.CustomHelpers) => {
    const { start_date } = helpers.state.ancestors[0]; // Access the start_date from the object being validated
    if (value <= start_date) {
      // return helpers.message('End date must be later than start date.'); // Custom error message if end_date is not later
        return helpers.error('any.custom', { message: 'End date must be later than start date.' })
    }
    return value;
  }),
});

const eventData = {
  event_name: 'Conference',
  start_date: '2024-09-01',
  end_date: '2024-08-31', // Invalid end date (before start date)
};

// Validate the data against the schema
const { error, value } = eventSchema.validate(eventData);

if (error) {
  console.error('Validation failed:', error.details); // Output validation errors if any
} else {
  console.log('Validation succeeded:', value); // Output the validated data if validation succeeds
}

/*
  joi ref and ancestors Features:
  - `joi.ref()`: Create a reference to another field in the same schema, useful for comparing values between fields or applying conditional logic.
  - `ancestors`: Access the entire hierarchy of objects being validated within custom validation functions, allowing reference to fields at different levels of the object structure.
*/

// Example: ref Usage

const schema = joi.object({
  password: joi.string().min(8).required(), // Define a string field for password with min 8 characters, required
  confirm_password: joi.string().valid(joi.ref('password')).required(), // Reference password field to match confirm_password
});

const data = {
  password: 'mypassword',
  confirm_password: 'mypassword',
};

const { error, value } = schema.validate(data);

if (error) {
  console.error('Validation failed:', error.details); // Output validation errors if any
} else {
  console.log('Validation succeeded:', value); // Output the validated data if validation succeeds
}

// Example: ancestors Usage

const schemaWithAncestors = joi.object({
  allowedCities: joi.array().items(joi.string()).required(), // Define an array of allowed cities at the root level, required
  user: joi.object({
    address: joi.object({
      city: joi.string().required(), // Define a string field for city, required
      postal_code: joi.string().required().custom((value, helpers) => {
        const { ancestors } = helpers.state; 
        const allowedCities = ancestors[2].allowedCities; // Access the root-level allowedCities array
        const city = ancestors[0].city; // Access the city field within the same object

        if (allowedCities.includes(city) && !/^\d{5}$/.test(value)) {
          return helpers.message('Postal code must be 5 digits for the allowed city.'); // Custom error message for invalid postal code
        }

        return value;
      }),
    }).required(),
  }).required(),
});

const dataWithAncestors = {
  allowedCities: ['New York', 'Los Angeles'], // Define the allowed cities
  user: {
    address: {
      city: 'New York',
      postal_code: '123', // Invalid postal code
    },
  },
};

const { error, value } = schemaWithAncestors.validate(dataWithAncestors);

if (error) {
  console.error('Validation failed:', error.details); // Output validation errors if any
} else {
  console.log('Validation succeeded:', value); // Output the validated data if validation succeeds
}
