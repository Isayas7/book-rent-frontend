import { Box, TextField, Typography } from '@mui/material'
import { FieldError } from 'react-hook-form'
import { SxProps, Theme } from '@mui/system'

type InputFieldProps = {
    label: string
    type: string
    name: string
    register: any
    error?: FieldError | any
    InputLabelProps?: any
    sx?: SxProps<Theme>
}

const InputField = ({ label, type, name, register, error, InputLabelProps, sx }: InputFieldProps) => {
    return (
        <Box sx={{ width: "100%", display: "flex", gap: 1, flexDirection: "column", ...sx }}>
            <TextField
                {...register(name, { valueAsNumber: type === "number" })}
                label={label}
                type={type}
                variant="outlined"
                InputLabelProps={InputLabelProps}
            />
            {error?.message && (
                <Typography sx={{ color: "red" }}>
                    {error.message.toString()}
                </Typography>
            )}
        </Box>
    )
}

export default InputField
