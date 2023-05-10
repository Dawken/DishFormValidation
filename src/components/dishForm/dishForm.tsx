import React from 'react'
import styles from './dishForm.module.scss'
import { ThemeProvider } from '@mui/material'
import { purpleTheme } from '../../themes/customMuiTheme'
import useDishForm from './useDishForm'
import { FormProvider } from 'react-hook-form'
import OrderLabel from '../../shared/orderLabel'


const DishForm = () => {

	const { methods, order } = useDishForm()

	return (
		<div className={styles.layout}>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit((formv) => order(formv))}
					className={styles.dishForm}
				>
					<ThemeProvider theme={purpleTheme} >
						<OrderLabel name='name' label='Dish name'/>
						<OrderLabel name='preparation_time' type='time' label='Preparation time'/>
						<OrderLabel
							name='type'
							type='select'
							label='Dish type'
							options={[
								{ value: 'Pizza', label: 'Pizza' },
								{ value: 'Soup', label: 'Soup' },
								{ value: 'Sandwich', label: 'Sandwich' },
							]}
						/>
					</ThemeProvider>
					<div className={styles.order}>
						<button className={styles.orderButton}>Order</button>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
export default DishForm
