"use client";
import {
    Typography,
    Button,
    Box
} from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getOwnBookQuery, getSingleBookQuery, useUpdateBookQuery } from "@/hooks/use-books-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateBookSchema } from "@/utils/schema";
import AddBookModal from "../add-book-modal";
import InputField from "../input-field";
import { UpdateBookFormTypes } from "@/utils/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "../Loading";


const UpdateBookForm = ({ bookId }: { bookId: number }) => {
    const { data } = getOwnBookQuery();
    const { data: singleBook, isLoading } = getSingleBookQuery(bookId);

    const [options, setOptions] = useState<any[]>([]);
    const [value, setValue] = useState<any | null>(null);
    const [inputValue, setInputValue] = useState('');

    const [open, setOpen] = useState(false);
    const [shrink, setShrink] = useState<boolean>(false)

    const router = useRouter()

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (data && Array.isArray(data.data)) {
            const bookNames = data.data.map((book: any) => ({
                bookName: book.bookName,
            }));
            setOptions(bookNames);
        }
    }, [data]);


    const { register, control, handleSubmit, reset, formState: { errors }, watch } = useForm<UpdateBookFormTypes>({
        resolver: zodResolver(updateBookSchema),

    });


    useEffect(() => {
        if (singleBook?.data) {
            reset(singleBook?.data)
            setShrink(true);
        }

    }, [reset, singleBook?.data]);

    const { mutate: updateBook, isPending: isUpdating, } = useUpdateBookQuery();

    const coverFile = watch("coverPhotoUrl") as FileList | null;

    const onSubmit = (data: any) => {

        const formData = new FormData();

        formData.append('bookName', data.bookName);
        formData.append('author', data.author);
        formData.append('category', data.category);
        formData.append('quantity', data.quantity);
        formData.append('rentPrice', data.rentPrice);
        if (data.coverPhotoUrl[0]) {
            formData.append('coverPhotoUrl', data.coverPhotoUrl[0]);
        }

        updateBook({ bookId: singleBook?.data?.id, newBookInfo: formData }, {
            onSuccess: () => {
                reset();
                toast.success("Successfully Updated")
                router.push("/dashboard")
            },
        });
    };

    if (isLoading) {
        return <Loading />
    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", alignItems: "center", width: 600, flexDirection: "column", gap: 10, marginTop: 10 }}
        >
            <Autocomplete
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                options={[...options, { bookName: '' }]}
                getOptionLabel={(option) => option.bookName}
                sx={{ width: 350 }}
                renderInput={(params) => (
                    <TextField {...params} variant="filled" label="Search Book" />
                )}
                renderOption={(props, option) => (
                    <Box component="li" {...props} sx={{ borderTop: option.bookName === '' ? '1px solid lightgray' : 'none' }}>
                        {option.bookName === '' ? (
                            <Button onClick={handleOpen}>
                                Edit
                            </Button>
                        ) : (
                            option.bookName
                        )}
                    </Box>
                )}
            />

            {/* MODAL */}
            <AddBookModal open={open} handleClose={handleClose} register={register} control={control} errors={errors} />

            {/* QUANTITY AND RENT PRICE FORM */}
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, alignItems: "start", mt: 12 }}>
                <InputField
                    name='quantity'
                    label='Quantity'
                    type='number'
                    error={errors.quantity}
                    register={register}
                    InputLabelProps={{ shrink: shrink }}


                />
                <InputField
                    name='rentPrice'
                    label='Rent Price'
                    type='number'
                    error={errors.rentPrice}
                    register={register}
                    InputLabelProps={{ shrink: shrink }}
                />
            </Box>

            <input
                {...register("coverPhotoUrl")}
                id="file-input"
                type="file"
                accept="image/*"
                hidden
            />
            <label htmlFor="file-input">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, color: 'blue' }}>
                        <FileUploadOutlinedIcon sx={{ fontSize: 24 }} />
                        <Typography sx={{ ml: 2 }}>
                            {coverFile instanceof FileList && coverFile.length > 0
                                ? coverFile[0].name
                                : typeof coverFile === "string" && coverFile
                                    ? coverFile
                                    : "Upload Book cover"
                            }
                        </Typography>
                    </Box>
                    {errors?.coverPhotoUrl && (
                        <Typography sx={{ color: "red" }}>
                            {errors.coverPhotoUrl.message?.toString()}
                        </Typography>
                    )}
                </Box>
            </label>

            {/* SUBMIT BUTTON */}
            <Button
                disabled={isUpdating}
                variant="contained"
                type="submit"
                sx={{ width: 250, mt: 5, p: 2, borderRadius: 5 }}
            >
                Submit
            </Button>
        </form>

    );
};

export default UpdateBookForm;
