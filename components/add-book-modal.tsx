import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Typography } from '@mui/material'
import InputField from './input-field';
import { Controller, FieldErrors } from 'react-hook-form';

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

type AddBookModalProps = {
    open: boolean
    handleClose: () => void
    register: any
    control: any
    errors: FieldErrors
}

const AddBookModal = ({ open, handleClose, register, control, errors }: AddBookModalProps) => {

    const handleSubmitFromModal = () => {
        handleClose()
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 500 }}>
                <InputField name='bookName' label='Book Name' type='text' error={errors?.bookName} register={register} />
                <InputField name='author' label='Author Name' type='text' error={errors?.author} register={register} />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="category-select-label">Category</InputLabel>
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

                    {errors.category && (
                        <Typography sx={{ color: "red" }}>
                            {errors.category.message?.toString()}
                        </Typography>
                    )}
                </FormControl>

                <Button
                    variant="contained"
                    onClick={handleSubmitFromModal}
                >
                    Add
                </Button>
            </Box>
        </Modal>
    )
}

export default AddBookModal
