import { z } from "zod";

// Contact Form Validation
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Quote Form Validation
export const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  companyName: z.string().min(2, "Company name must be at least 2 characters").max(200),
  companySize: z.enum(["1-50", "51-200", "201-500", "500+"], {
    errorMap: () => ({ message: "Please select a company size" })
  }),
  serviceInterest: z.string().min(1, "Please select a service"),
  scope: z.string().min(20, "Project scope must be at least 20 characters").max(2000),
  budget: z.enum(["5k-10k", "10k-25k", "25k-50k", "50k+"], {
    errorMap: () => ({ message: "Please select a budget range" })
  }),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

// Login Form Validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginData = z.infer<typeof loginSchema>;

// Register Form Validation
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterData = z.infer<typeof registerSchema>;

// Course Enrollment Validation
export const enrollmentSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  paymentMethod: z.enum(["stripe", "flutterwave", "mpesa", "bank"], {
    errorMap: () => ({ message: "Please select a payment method" })
  }),
});

export type EnrollmentData = z.infer<typeof enrollmentSchema>;

// Newsletter Signup Validation
export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// Service Review Validation
export const serviceReviewSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  comment: z.string().min(10, "Comment must be at least 10 characters").max(1000),
});

export type ServiceReviewData = z.infer<typeof serviceReviewSchema>;

// User Profile Update Validation
export const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;

// Blog Post Creation (Admin)
export const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  content: z.string().min(100, "Content must be at least 100 characters"),
  author: z.string().min(2, "Author name is required"),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

export type BlogPostData = z.infer<typeof blogPostSchema>;

// Course Creation (Admin)
export const courseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  price: z.number().min(0, "Price must be non-negative"),
  duration: z.number().optional(),
  prerequisites: z.array(z.string()).optional(),
});

export type CourseData = z.infer<typeof courseSchema>;
