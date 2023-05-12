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

	const { methods, order, dishType, setDishType } = useDishForm()


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
							setDishType={setDishType}
						/>
						{dishType === 'Pizza' &&
							<>
								<DishTextField name='no_of_slices' label='Slices' type='number' inputProps={{ min: 0, pattern: '^[0-9]+$'  }} className={styles.label}/>
								<DishTextField name='diameter' label='Diameter' type='number' inputProps={{ step: 0.1, min: 0 }} className={styles.label}/>
							</>
						}
						{dishType === 'Sandwich' &&
							<DishTextField name='slices_of_bread' label='Slices' type='number' inputProps={{ min: 0, pattern: '^[0-9]+$'  }} className={styles.label}/>
						}
						{dishType === 'Soup' &&
							<DishSelect name='spiciness_scale' label='Spiciness scale'
								options={
									Array.from({length: 10}, (_, i) => (
										{value: i, label: i}
									))
								}
								className={styles.label}/>
						}
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
