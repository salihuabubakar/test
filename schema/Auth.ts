import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, {
      message: "Password must include at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter.",
    })
    .regex(/\d/, { message: "Password must include at least one digit." })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must include at least one special character.",
    }),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-z]/, {
        message: "Password must include at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must include at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must include at least one digit." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must include at least one special character.",
      }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const emailVerificationSchema = z.object({
  code: z.string().min(6, {
    message: "Your verification code must be 6 characters.",
  }),
});

export type EmailVerificationSchema = z.infer<typeof emailVerificationSchema>;
