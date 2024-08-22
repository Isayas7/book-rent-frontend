"use client";
import {
  Typography,
  Button,
  Box,
  Input,
} from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getOwnBookQuery, useBookCreateQuery } from "@/hooks/use-books-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBookSchema } from "@/utils/schema";
import AddBookModal from "../add-book-modal";
import InputField from "../input-field";
import { CreateBookFormTypes } from "@/utils/types";
import { toast } from "react-toastify";


const UploadBook = () => {
  const { data } = getOwnBookQuery();
  const [options, setOptions] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any | null>(null);
  const [inputValue, setInputValue] = useState('');

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


  const { register, control, handleSubmit, reset, formState: { errors }, watch } = useForm<CreateBookFormTypes>({
    resolver: zodResolver(createBookSchema),

  });

  const { mutate: addBook, isSuccess, isPending, isError, error } = useBookCreateQuery();

  const coverFile = watch("coverPhotoUrl") as FileList | null;

  const onSubmit = (data: any) => {

    const formData = new FormData();

    formData.append('bookName', data.bookName);
    formData.append('author', data.author);
    formData.append('category', data.category);
    formData.append('quantity', data.quantity);
    formData.append('rentPrice', data.rentPrice);
    formData.append('coverPhotoUrl', data.coverPhotoUrl[0]);

    addBook(formData, {
      onSuccess: () => {
        reset();
        toast.success("Successfully Created")
      },
    });
  };


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
                Add
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
      <Box sx={{ display: "flex", gap: 2, alignItems: "start", mt: 12 }}>
        <InputField name='quantity' label='Quantity' type='number' error={errors.quantity} register={register} />
        <InputField name='rentPrice' label='Rent Price' type='number' error={errors.rentPrice} register={register} />
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
              {coverFile && coverFile?.length > 0 ? coverFile[0].name : "Upload Book cover"}
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
        disabled={isPending}
        variant="contained"
        type="submit"
        sx={{ width: 250, mt: 5, p: 2, borderRadius: 5 }}
      >
        Submit
      </Button>
    </form>

  );
};

export default UploadBook;
