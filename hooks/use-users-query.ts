"use client"
import { LoginFormTypes, RegisterFormTypes } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUserRegisterQuery = () => {
    return useMutation({
        mutationFn: async (newUser: RegisterFormTypes) => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`, newUser);
            return res;
        },
    });
};


export const useUserLoginQuery = () => {
    return useMutation({
        mutationFn: async (userInfo: LoginFormTypes) => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, userInfo, { withCredentials: true });
            return res;
        },
    });
};

export const useUserLogoutQuery = () => {
    return useMutation({
        mutationFn: async () => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, { withCredentials: true });
            return res;
        },
    });
};

export const useOwnerQuery = () => {
    return useQuery({
        queryKey: ["OwnerList"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/ownerList`, {
                withCredentials: true,
            });
            return res.data
        },
    });
};

export const useChangeOwnerStatusQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ ownerId, newStatus }: { ownerId: string; newStatus: string }) => {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/status/${ownerId}`;
            const payload = {
                status: newStatus,
            };
            const res = await axios.put(url, payload, {
                withCredentials: true,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["OwnerList"] });
        },
    });
};

export const useDeleteOwnerQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => {
            return axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`, { withCredentials: true });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["OwnerList"] });
        },
    });
};