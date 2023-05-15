import { Controller, useFormContext, get } from 'react-hook-form'
import React, { FC } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DatePickerProps, MobileTimePicker, MobileTimePickerProps, TimeView } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { InputAdornment } from '@mui/material'

type TimePickerProps = {
	name: string
} & DatePickerProps<string>

interface CustomMobileTimePickerProps extends MobileTimePickerProps<TimeView> {
	className: string
}

const DishTimePicker: FC<TimePickerProps & CustomMobileTimePickerProps> = ({ name, ...otherProps }) => {

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
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                >
                    <DemoContainer components={['MobileTimePicker', 'MobileTimePicker', 'MobileTimePicker']} sx={{ minWidth: 210 }}>
                        <MobileTimePicker
                            {...otherProps}
                            {...field}
                            views={['hours', 'minutes', 'seconds']}
                            format='HH:mm:ss'
                            value={field.value ?? otherProps.value ?? null}
                            slotProps={{
                                textField: {
                                    error: !!error,
                                    InputProps: {
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <AccessTimeIcon style={{color:'white'}} />
                                            </InputAdornment>
                                        )
                                    },
                                    placeholder: undefined
                                }
                            }}
                            ampm={false}
                            onChange={value => {
                                const preparationTime = dayjs(value).format('HH:mm:ss')
                                field.onChange(preparationTime)
                            }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            )}
        />
    )
}
export default DishTimePicker
