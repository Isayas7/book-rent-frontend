import { z } from "zod";

export enum UserRole {
    ADMIN = "ADMIN",
    OWNER = "OWNER",
    CUSTOMER = "CUSTOMER"
}

export const registerSchema = z
    .object({
        email: z.string().email({
            message: "please enter valid email",
        }),
        location: z.string().min(2, {
            message: "please enter location",
        }),
        phoneNumber: z.string().min(6, {
            message: "please enter phone Number",
        }),
        role: z.enum([UserRole.ADMIN, UserRole.OWNER, UserRole.CUSTOMER], {
            message: "Invalid role selected",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters long"
        }),
        confirmPassword: z.string().min(2, {
            message: "Password must be at least 6 characters long",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password don't match",
        path: ["confirmPassword"],
    });


export const LoginSchema = z
    .object({
        email: z.string().email({
            message: "please enter valid email",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters long"
        }),

    })

export const createBookSchema = z.object({
    bookName: z.string().min(1, "Book name is required"),
    author: z.string().min(1, "Author is required"),
    category: z.string().min(1, "Category is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    rentPrice: z.number().min(0, "Rent price must be at least 0"),
});