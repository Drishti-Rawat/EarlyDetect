// import z from "zod";

// export const PredictionformSchema = z.object({
//   age: z.number().int().min(20, "Age must be between 20 and 80").max(80),
//   gender: z.enum(["male", "female"]),
//   bmi: z.number().min(15, "BMI must be between 15 and 40").max(40),
//   smoking: z.enum(["yes", "no"]),
//   geneticRisk: z.enum(["0", "1", "2"]),
//   physicalActivity: z.number().min(0).max(10),
//   alcoholIntake: z.number().min(0).max(5),
//   cancerHistory: z.enum(["yes", "no"]),
// });

import z from "zod";

export const PredictionformSchema = z.object({
  age: z
    .number()
    .int("Age must be an integer")
    .min(20, "Age must be between 20 and 80")
    .max(80, "Age must be between 20 and 80"),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender must be either male or female" }),
  }),
  bmi: z
    .number()
    .min(15, "BMI must be between 15 and 40")
    .max(40, "BMI must be between 15 and 40"),
  smoking: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Smoking status must be Yes or No" }),
  }),
  geneticRisk: z.enum(["0", "1", "2"], {
    errorMap: () => ({ message: "Genetic risk must be Low, Medium, or High" }),
  }),
  physicalActivity: z
    .number()
    .min(0, "Physical activity must be between 0 and 10 hours")
    .max(10, "Physical activity must be between 0 and 10 hours"),
  alcoholIntake: z
    .number()
    .min(0, "Alcohol intake must be between 0 and 5 units per week")
    .max(5, "Alcohol intake must be between 0 and 5 units per week"),
  cancerHistory: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Cancer history must be Yes or No" }),
  }),
});
