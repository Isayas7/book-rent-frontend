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
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState(null)


  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const { mutate: updateBook, isSuccess: isUpdateSuccess, isPending: isUpdatePending, isError: isUpdateError, error: UpdateError } = useUpdateBookQuery();


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

    if (isEdit) {
      updateBook({ bookId: editId, newBookInfo: formData }, {
        onSuccess: () => {
          setIsEdit(false)
          setFileName(null);
          reset();
          toast.success("Successfully Updated")
        },
      });
    } else {
      addBook(formData, {
        onSuccess: () => {
          reset();
          setFileName(null);
          toast.success("Successfully Created")

        },
      });
    }
  };

  const handleBookSelect = (selectedBook: any) => {
    setFormValue('bookName', selectedBook.bookName);
    setFormValue('author', selectedBook.author);
    setFormValue('category', selectedBook.category);
    setFormValue('quantity', selectedBook.quantity);
    setFormValue('rentPrice', selectedBook.rentPrice);
    // Clear errors
    clearErrors();
    setIsEdit(true)
    setEditId(selectedBook.id)
  };

  return (
    <Box>
      <Box sx={{ width: 400 }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}
        >
          <Box sx={{ width: 400, mx: 'auto' }}>
            <Controller
              name="bookName"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={value}
                  onChange={(event: any, newValue: any) => {
                    setValue(newValue);
                    handleBookSelect(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={options}
                  getOptionLabel={(option) => option.bookName}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Search Book" />}
                />
              )}
            />
            {isEdit ?
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{ mt: 2, width: "100%" }}
              >
                Edit
              </Button> : <Button
                variant="contained"
                onClick={handleOpen}
                sx={{ mt: 2, width: "100%" }}
              >
                Add
              </Button>
            }

          </Box>
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
          <Box sx={{ display: "flex", gap: 2, alignItems: "start", mt: 2 }}>
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
              {errors.rentPrice && <Box sx={{ color: "red" }}>
                {errors.rentPrice.message}
              </Box>}
            </Box>

          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, color: 'blue' }}>
            <FileUploadOutlinedIcon
              sx={{ fontSize: 30, cursor: 'pointer' }}
              onClick={handleIconClick}
            />
            {fileName ? (
              <Typography sx={{ ml: 2 }}>{fileName}</Typography>
            ) : (
              <Typography sx={{ ml: 2 }}>Upload Book cover</Typography>
            )}
            <Input
              inputRef={fileInputRef}
              type="file"
              onChange={handleFileChange}
              sx={{ display: 'none' }}
            />
          </Box>
          <Button
            disabled={isPending || isUpdatePending}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UploadBook;
