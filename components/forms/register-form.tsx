"use client"
import { registerSchema, UserRole } from "@/utils/schema";
import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserRegisterQuery } from "@/hooks/use-users-query";
import { RegisterFormTypes } from "@/utils/types";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const RegisterForm = () => {
  const { mutate: registerUser, isSuccess, isPending, isError, error } = useUserRegisterQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormTypes>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      location: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      role: UserRole.OWNER
    },
  });


  const onSubmit: SubmitHandler<RegisterFormTypes> = (data) => {
    registerUser(data, {
      onSuccess: () => {
        reset();
      },
    });
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
      <TextField
        {...register("email")}
        id="outlined-basic"
        label="Email address"
        type="email"
        variant="outlined"
      />
      {errors.email && <Box sx={{ color: "red" }}>
        {errors.email.message}
      </Box>}
      <TextField
        {...register("password")}
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
      />
      {errors.password && <Box sx={{ color: "red" }}>
        {errors.password.message}
      </Box>}
      <TextField
        {...register("confirmPassword")}
        id="outlined-basic"
        label="Confirm password"
        type="password"
        variant="outlined"
      />
      {errors.confirmPassword && <Box sx={{ color: "red" }}>
        {errors.confirmPassword.message}
      </Box>}
      <TextField
        {...register("location")}
        id="outlined-basic"
        label="Location"
        type="text"
        variant="outlined"
      />
      {errors.location && <Box sx={{ color: "red" }}>
        {errors.location.message}
      </Box>}
      <TextField
        {...register("phoneNumber")}
        id="outlined-basic"
        label="Phone Number"
        type="number"
        variant="outlined"
      />
      {errors.phoneNumber && <Box sx={{ color: "red" }}>
        {errors.phoneNumber.message}
      </Box>}

      {isError && <Box sx={{ color: "red", textAlign: "center" }}>
        {(error as any)?.response?.data?.message || 'An error occurred'}
      </Box>}

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Checkbox {...label} />
        <Typography>I accept the Terms and Conditions</Typography>
      </Box>
      <Button disabled={isPending} type="submit" variant="contained" sx={{ width: "100%" }}>
        SIGN IN
      </Button>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>Already have an account?</Typography>
        <Link href="/login" style={{ color: "#0f4ec2" }}>
          Login
        </Link>
      </Box>
    </form>
  );
};

export default RegisterForm;
