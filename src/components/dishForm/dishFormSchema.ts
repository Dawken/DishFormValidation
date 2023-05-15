import * as z from 'zod'

const DishSchema = z
	.object({
		name: z.string().nonempty('Dish name is required').min(3, 'Name should be at least 3 words long'),
		preparation_time: z
			.string()
			.nonempty('Preparation time is required')
			.refine((value) => /^\d{2}:\d{2}:\d{2}$/.test(value), {
				message: 'Preparation time must be in the format HH:MM:SS',
			}),
	})

const PizzaSchema = z.object({
	type: z.literal('pizza'),
	no_of_slices: z
		.number()
		.int()
		.min(1, 'Pizza must contain at least 1 slice'),
	diameter: z.number().positive('Diameter must be a positive number'),
}).merge(DishSchema)

const SoupSchema = z.object({
	type: z.literal('soup'),
	spiciness_scale: z
		.number()
		.int()
		.min(1, 'Spiciness scale must be at least 1')
		.max(10, 'Spiciness scale cannot be greater than 10')
}).merge(DishSchema)

const SandwichSchema = z.object({
	type: z.literal('sandwich'),
	slices_of_bread: z
		.number()
		.int()
		.min(1, 'Slices of bread must be at least 1')
}).merge(DishSchema)

const OrderSchema = z.union([PizzaSchema, SandwichSchema, SoupSchema])

export default OrderSchema
