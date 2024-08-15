import { CreateBookFormTypes, UpdateBookFormTypes } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';


export const getOwnBookQuery = () => {
    return useQuery({
        queryKey: ["OwnBooks"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book/ownBooks`, {
                withCredentials: true,
            });
            return res.data
        },
    });
};
export const getOwnRentalQuery = () => {
    return useQuery({
        queryKey: ["OwnRental"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rental/own-rental`, {
                withCredentials: true,
            });
            return res.data
        },
    });
};

export const getRentalStaticsQuery = () => {
    return useQuery({
        queryKey: ["rentalStatics"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rental/rental-statics`, {
                withCredentials: true,
            });
            return res.data
        },
    });
};

export const getFreeBooksQuery = () => {
    return useQuery({
        queryKey: ["freeBooks"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book/free-books`, {
                withCredentials: true,
            });
            return res.data
        },
    });
};

export const getFreeOwnerBooksQuery = () => {
    return useQuery({
        queryKey: ["freeOwnerBooks"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book/free-owner-books`, {
                withCredentials: true,
            });
            return res.data
        },
    });
};


export const useBookCreateQuery = () => {
    return useMutation({
        mutationFn: async (newBook: FormData) => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book/create`, newBook, { withCredentials: true });
            return res;
        },
    });
};

export const useUpdateBookQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ bookId, newBookInfo }: { bookId: number | null, newBookInfo: FormData }) => {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/${bookId}`;
            const res = await axios.put(url, newBookInfo, {
                withCredentials: true,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["OwnBooks"] });
        },
    });
};

export const useDeleteBookQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => {
            return axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book/${id}`, { withCredentials: true });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ownerBooks"] });
        },
    });
};



export const useChangeBookStatusQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ bookId, newStatus }: { bookId: string; newStatus: string }) => {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/status/${bookId}`;
            const payload = {
                status: newStatus,
            };
            const res = await axios.put(url, payload, {
                withCredentials: true,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Books"] });
        },
    });
};


