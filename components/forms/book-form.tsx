"use client";

import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getOwnBookQuery, useBookCreateQuery, useUpdateBookQuery } from "@/hooks/use-books-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBookSchema } from "@/utils/schema";
import { toast } from "react-toastify";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  justifyContent: "center",
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 5
};

const UploadBook = () => {
  const { data } = getOwnBookQuery()
  const [options, setOptions] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      const bookNames = data.data.map((book: any) => ({
        bookName: book.bookName,
        author: book.author,
        category: book.category,
        quantity: book.quantity,
        rentPrice: book.rentPrice,
        id: book.id
      }));
      setOptions(bookNames);
    }
  }, [data]);


  const { control, handleSubmit, reset, setValue: setFormValue, clearErrors, formState: { errors, } } = useForm({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      bookName: '',
      author: '',
      category: '',
      quantity: null,
      rentPrice: null,
      cover: null,
    },
  });


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModalSubmit = () => {
    handleClose();
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  const { mutate: addBook, isSuccess, isPending, isError, error } = useBookCreateQuery();



  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append('bookName', data.bookName);
    formData.append('author', data.author);
    formData.append('category', data.category);
    formData.append('quantity', data.quantity);
    formData.append('rentPrice', data.rentPrice);
    if (selectedFile) {
      formData.append('cover', selectedFile);
    }
    addBook(formData, {
      onSuccess: () => {
        reset();
        setFileName(null);
        toast.success("Successfully Created")
      },
    });

  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", alignItems: "center", width: 600, flexDirection: "column", gap: 10, marginTop: 10 }}
    >
      <Controller
        name="bookName"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            id="controllable-states-demo"
            options={[...options, { bookName: '' }]}
            getOptionLabel={(option) => option.bookName}
            sx={{ width: 350 }}
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="Search Book" />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props} sx={{ borderTop: option.bookName === '' ? '1px solid lightgray' : 'none' }}>
                {option.bookName === '' ? (
                  <Button onClick={handleOpen} >
                    Add
                  </Button>

                ) : (
                  option.bookName
                )}
              </Box>
            )}
          />
        )}
      />

      {/* MODAL */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <Box sx={{ display: "flex", gap: 1, flexDirection: "column", }}>
            <Controller
              name="bookName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Book Name"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
            />
            {errors.bookName && <Box sx={{ color: "red" }}>
              {errors.bookName.message}
            </Box>}
          </Box>
          <Box sx={{ display: "flex", gap: 1, flexDirection: "column", }}>

            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Author Name"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
            />
            {errors.author && <Box sx={{ color: "red" }}>
              {errors.author.message}
            </Box>}
          </Box>


          <Box sx={{ display: "flex", gap: 1, flexDirection: "column", }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                    onChange={(event: SelectChangeEvent) => field.onChange(event.target.value)}
                  >
                    <MenuItem value="Fantasy">Fantasy</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            {errors.category && <Box sx={{ color: "red" }}>
              {errors.category.message}
            </Box>}
          </Box>

          <Button
            variant="contained"
            onClick={handleModalSubmit}
          >
            Add
          </Button>
        </Box>
      </Modal>
      {/* END OF MODAL */}

      {/* QUANTITY AND RENT PRICE FORM */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "start", mt: 12 }}>
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column", alignItems: "center" }}>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Quantity"
                type="number"
                variant="outlined"
                fullWidth
                sx={{ mb: 2, width: 300 }}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />

          {errors.quantity && <Box sx={{ color: "red" }}>
            {errors.quantity.message}
          </Box>}

        </Box>
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column", alignItems: "center" }}>
          <Controller
            name="rentPrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Rent Price"
                type="number"
                variant="outlined"
                fullWidth
                sx={{ mb: 2, width: 300 }}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          {errors.rentPrice && <Box sx={{ color: "red" }}>
            {errors.rentPrice.message}
          </Box>}
        </Box>

      </Box>
      {/* END OF QUANTITY AND RENT PRICE FORM */}

      {/* UPLOAD ICON */}
      <Box onClick={handleIconClick} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, color: 'blue' }}>
        <FileUploadOutlinedIcon
          sx={{ fontSize: 24, }}

        />
        {fileName ? (
          <Typography sx={{ ml: 2 }}>{fileName}</Typography>
        ) : (
          <Typography sx={{ ml: 0.5 }}>Upload Book cover</Typography>
        )}
        <Input
          inputRef={fileInputRef}
          type="file"
          onChange={handleFileChange}
          sx={{ display: 'none' }}
        />
      </Box>

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
