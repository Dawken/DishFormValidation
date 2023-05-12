import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TypeOf } from 'zod'
import { useState } from 'react'


const DishSchema = z
	.object({
		name: z.string().nonempty('Dish name is required'),
		preparation_time: z
			.string()
			.nonempty('Preparation time is required')
			.refine((value) => /^\d{2}:\d{2}:\d{2}$/.test(value), {
				message: 'Preparation time must be in the format HH:MM:SS',
			}),
	})

const PizzaSchema = z.object({
	type: z.literal('Pizza'),
	no_of_slices: z
		.number()
		.int()
		.min(0),
	diameter: z.number().positive('Diameter must be a positive number'),
}).merge(DishSchema)

const SoupSchema = z.object({
	type: z.literal('Soup'),
	spiciness_scale: z
		.number()
		.int()
		.min(1, 'Spiciness scale must be at least 1')
		.max(10, 'Spiciness scale cannot be greater than 10')
}).merge(DishSchema)

const SandwichSchema = z.object({
	type: z.literal('Sandwich'),
	slices_of_bread: z
		.number()
		.int()
		.min(0)
}).merge(DishSchema)

const OrderSchema = z.union([PizzaSchema, SandwichSchema, SoupSchema])

type DishInput = TypeOf<typeof OrderSchema>

const useDishForm = () => {

	const [dishType, setDishType] = useState('')

	const order = (values:DishInput) => {
		console.log(values)
	}

	const methods = useForm<DishInput>({
		resolver: zodResolver(OrderSchema),
	})
	return {
		methods,
		order,
		dishType,
		setDishType
	}
}
export default useDishForm
