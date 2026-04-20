import { z } from "zod";

export const serviceOptions = [
  "Web Design",
  "Web Development",
  "UI/UX Design",
  "Brand Identity",
  "SEO Optimization",
  "Performance Marketing",
  "Custom Software Development",
  "Other",
] as const;

export const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .min(7, "Enter a valid contact number")
    .max(20, "Contact number is too long"),
  service: z
    .string()
    .min(1, "Please select a service")
    .refine(
      (value) =>
        serviceOptions.includes(value as (typeof serviceOptions)[number]),
      {
        message: "Please select a service",
      },
    ),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
