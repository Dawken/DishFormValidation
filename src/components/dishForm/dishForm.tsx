import React from 'react'
import styles from './dishForm.module.scss'
import { ThemeProvider } from '@mui/material'
import { purpleTheme } from '../../themes/customMuiTheme'
import useDishForm from './useDishForm'
import { FormProvider } from 'react-hook-form'
import DishTextField from './dishFormLabels/dishTextField'
import DishTimePicker from './dishFormLabels/dishTimePicker'
import DishSelect from './dishFormLabels/dishSelect'


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
						<DishTextField name='name' label='Dish name' className={styles.label}/>
						<DishTimePicker name='preparation_time' label='Preparation time' className={styles.label}/>
						<DishSelect
							name='type'
							label='Dish type'
							options={[
								{ value: 'Pizza', label: 'Pizza' },
								{ value: 'Soup', label: 'Soup' },
								{ value: 'Sandwich', label: 'Sandwich' },
							]}
							className={styles.label}
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
