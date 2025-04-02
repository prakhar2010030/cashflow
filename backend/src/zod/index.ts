import z from "zod";

export const signupValidator = z.object({
  email: z.string().email("must be an email").trim().toLowerCase(),
  password: z.string().min(6, "password must be atleast 6 characters"),
  firstname: z.string().trim().max(50),
  lastname: z.string().trim().max(50),
});

export const loginValidator = z.object({
  email: z.string().email("must be an email").trim().toLowerCase(),
  password: z.string().min(6, "password must be atleast 6 characters"),
});

export const updateValidator = z.object({
  password: z
    .string()
    .min(6, "password must be atleast 6 characters")
    .optional(),
  firstname: z.string().max(50).optional(),
  lastname: z.string().max(50).optional(),
});

export const transferValidator = z.object({
  to: z.string(),
  amount: z.number(),
});
