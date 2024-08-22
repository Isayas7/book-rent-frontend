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
    bookName: z.string().min(1, { message: "Book name is required!" }),
    author: z.string().min(1, { message: "Author name is required!" }),
    category: z.string({ message: "Category is required!" }),
    quantity: z.number({ invalid_type_error: 'Quantity must be a number' }).min(1, "Quantity must be at least 1"),
    rentPrice: z.number({ invalid_type_error: 'Rent Price must be a number' }).min(0, "Rent price must be at least 0"),
    coverPhotoUrl: z
        .any()
        .refine((files) => files instanceof FileList && files.length > 0, {
            message: "Image is required",
        }),
});

export const updateBookSchema = z.object({
    bookName: z.string().min(1, { message: "Book name is required!" }).optional(),
    author: z.string().min(1, { message: "Author name is required!" }).optional(),
    category: z.enum(["Fantasy", "Science", "Business"], { message: "Category is required!" }).optional(),
    quantity: z.number({ invalid_type_error: 'Quantity must be a number' }).min(1, "Quantity must be at least 1").optional(),
    rentPrice: z.number({ invalid_type_error: 'Rent Price must be a number' }).min(0, "Rent price must be at least 0").optional(),
    coverPhotoUrl: z
        .any()
        .optional()
        .refine(
            (value) =>
                typeof value === 'string' ||
                (value instanceof FileList && value.length > 0),
            {
                message: "Image is required",
            }
        ),
});
