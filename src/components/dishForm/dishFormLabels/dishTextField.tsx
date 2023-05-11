import { Controller, useFormContext, get } from 'react-hook-form'
import { TextField, TextFieldProps } from '@mui/material'
import React, { FC } from 'react'

type InputProps = {
	name: string;
} & TextFieldProps

const DishTextField: FC<InputProps> = ({ name, ...otherProps }) => {

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
					helperText={error ? error.message : ''}
				/>
			)}
		/>
	)
}
export default DishTextField
