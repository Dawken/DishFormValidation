import React, { FC } from 'react'
import {Controller, get, useFormContext} from 'react-hook-form'
import MenuItem from '@material-ui/core/MenuItem'
import { MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { FormControl, FormHelperText, InputLabel, Select, TextField } from '@mui/material'
import dayjs from 'dayjs'

interface FormInputProps {
	name: string
	type?: 'time' | 'select'
	label?: string
	options?: { value: string; label: string }[]
	[propName: string]: unknown;
}

const labelStyle = {
	margin:'20px',
	width: '90%',
	height: '7vh'
}

const OrderLabel: FC<FormInputProps> = ({ name, type , label, options = [], ...otherProps }) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()

	const error = get(errors, name)

	switch (type) {
	case 'time':
		return (
			<FormControl sx={labelStyle}>
				<Controller
					control={control}
					name={name}
					render={({ field }) => (
						<LocalizationProvider
							dateAdapter={AdapterDayjs}
						>
							<DemoContainer components={['MobileTimePicker', 'MobileTimePicker', 'MobileTimePicker']} sx={{ minWidth: 210 }}>
								<MobileTimePicker
									{...field}
									label='Preparation time'
									views={['hours', 'minutes', 'seconds']}
									format='hh:mm:ss'
									value={field.value ?? ''}
									slotProps={{
										textField: {
											error: !!error
										}
									}}
									onChange={value => {
										const preparationTime = dayjs(value).format('hh:mm:ss')
										field.onChange(preparationTime)
									}}
								/>
							</DemoContainer>
						</LocalizationProvider>
					)}
				/>
			</FormControl>
		)
	case 'select':
		return (
			<FormControl fullWidth sx={labelStyle}>
				<Controller
					control={control}
					name={name}
					render={({ field }) => (
						<>
							<InputLabel>
								{label}
							</InputLabel>
							<Select
								label={label}
								onChange={field.onChange}
								error={!!error}
								value={field.value ?? ''}
							>
								{options.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</Select>
							{error && (
								<FormHelperText error={true}>
									{error.message}
								</FormHelperText>
							)}
						</>
					)}
				/>
			</FormControl>
		)
	default:
		return (
			<FormControl fullWidth sx={labelStyle}>
				<Controller
					control={control}
					name={name}
					render={({ field }) => (
						<TextField
							{...otherProps}
							{...field}
							label={label}
							value={field.value ?? otherProps.value ?? ''}
							error={!!errors[name]}
							helperText={error ? error.message : ''}
						/>
					)}
				/>
			</FormControl>
		)
	}
}

export default OrderLabel
