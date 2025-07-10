import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;

export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseCategories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Design",
  "Marketing",
  "Business",
  "Personal Development",
  "Finance & Accounting",
  "Health & Fitness",
  "AI & Machine Learning",
] as const;


export const courseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),

  description: z
    .string()
    .min(3, "Description must be at least 3 characters long"),

  fileKey: z.string().min(1, "File key is required"),

  price: z.coerce.number().min(1, "Price must be at least ₹1"),

  duration: z.coerce
    .number()
    .min(1, "Duration must be at least 1 hour")
    .max(1000, "Duration must be less than or equal to 1000 hours"),

  level: z.enum(courseLevels, {
    errorMap: () => ({ message: "Please select a valid course level" }),
  }),

  category: z.enum(courseCategories, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),

  smallDescription: z
    .string()
    .min(3, "Small description must be at least 3 characters")
    .max(200, "Small description must be less than 200 characters"),

  slug: z
    .string()
    .min(1, "Slug is required (usually generated from the title)"),

  status: z.enum(courseStatus, {
    errorMap: () => ({ message: "Please select a valid course status" }),
  }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;