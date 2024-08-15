"use client"
import { AuthContext } from "@/context/AuthContext";
import { LoginSchema } from "@/utils/schema";
import { LoginFormTypes } from "@/utils/types";
import { useUserLoginQuery } from "@/hooks/use-users-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const LoginForm = () => {
  const { dispatch } = useContext(AuthContext);
  const router = useRouter()

  const { mutateAsync: loginUser, isSuccess, isPending, isError, error } = useUserLoginQuery();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormTypes>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormTypes> = async (data) => {
    dispatch({ type: "LOGIN_START" });

    try {
      await loginUser(data, {
        onSuccess: (result) => {
          console.log(result.data);

          dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
          reset();
          router.push("/dashboard");
        },
        onError: (error) => {
          const errorResponse = (error as any)?.response?.data || "An unknown error occurred";
          dispatch({ type: "LOGIN_FAILURE", payload: errorResponse });
        }
      });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: "An unknown error occurred" });
    }
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

      {isError && <Box sx={{ color: "red", textAlign: "center" }}>
        {(error as any)?.response?.data?.message || 'An error occurred'}
      </Box>}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Checkbox {...label} />
        <Typography>Remember me</Typography>
      </Box>

      <Button disabled={isPending} type="submit" variant="contained" sx={{ width: "100%" }}>
        LOGIN
      </Button>


      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>Have not have an account?</Typography>
        <Link href="/" style={{ color: "#0f4ec2" }}>
          Sign up
        </Link>
      </Box>
    </form>
  );
};

export default LoginForm;
