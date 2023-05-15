import { Controller, useFormContext, get } from 'react-hook-form'
import { InputAdornment, TextField, TextFieldProps } from '@mui/material'
import React, { FC } from 'react'

type InputProps = {
	name: string;
	icon: React.ReactNode
	regex: RegExp
} & TextFieldProps

const DishNumberInput: FC<InputProps> = ({ name, ...otherProps }) => {

    const {
        control,
        formState: { errors },
    } = useFormContext()

    const error = get(errors, name)

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <TextField
                    {...otherProps}
                    {...field}
                    value={field.value ?? otherProps.value ?? ''}
                    error={!!errors[name]}
                    helperText={typeof field.value === 'number' && error ? error.message : ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <div style={{color:'white'}}>{otherProps.icon}</div>
                            </InputAdornment>
                        )
                    }}
                    onKeyPress={(event) => {
                        if (!otherProps.regex.test(event.key)) {
                            event.preventDefault()
                        }
                    }}
                    onChange={event => {
                        field.onChange(event.target.value.length > 0 ? Number(event.target.value) : '')
                    }}
                />
            )}
        />
    )
}
export default DishNumberInput
