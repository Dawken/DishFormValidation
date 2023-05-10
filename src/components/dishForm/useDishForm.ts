import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'


const dishSchema = object({
	name: string()
		.nonempty('Dish name is required'),
	preparation_time: string()
		.nonempty('Preparation time is required'),
	type: string()
		.nonempty('Dish type is required')
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
