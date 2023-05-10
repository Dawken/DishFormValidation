import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {TypeOf} from 'zod'


const dishSchema = z.object({
	name: z.string()
		.nonempty('Dish name is required'),
	preparation_time: z.string()
		.nonempty('Preparation time is required')
		.refine((value) => /^\d{2}:\d{2}:\d{2}$/.test(value), {
			message: 'Preparation time must be in the format HH:MM:SS',
		}),
	type: z.enum(['Pizza', 'Soup', 'Sandwich'])
})

type DishInput = TypeOf<typeof dishSchema>

const useDishForm = () => {

	const order = (values:DishInput) => {
		console.log(values)
	}

	const methods = useForm<DishInput>({
		resolver: zodResolver(dishSchema),
	})
	return {
		methods,
		order
	}
}
export default useDishForm
