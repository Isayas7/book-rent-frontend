import { Box, TextField, Typography } from '@mui/material'
import { FieldError } from 'react-hook-form'

type InputFieldProps = {
    label: string
    type: string
    name: string
    register: any
    error?: FieldError | any
    InputLabelProps?: any
}
const InputField = ({ label, type, name, register, error, InputLabelProps }: InputFieldProps) => {
    return (
        <Box sx={{ width: "100%", display: "flex", gap: 1, flexDirection: "column", }}>
            <TextField
                {...register(name, { valueAsNumber: type === "number" ? true : false })}
                label={label}
                type={type}
                variant="outlined"
                InputLabelProps={InputLabelProps}
                sx={{ width: { xs: 350, md: 300 } }}
            />
            {
                error?.message &&
                <Typography sx={{ color: "red" }}>
                    {error.message.toString()}
                </Typography>
            }
        </Box>

    )
}

export default InputField