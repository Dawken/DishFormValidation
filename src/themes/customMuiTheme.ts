import { createTheme } from '@mui/material/styles'

const purpleTheme = createTheme({
	palette: {
		primary: {
			main: '#5500ff',
		},
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'&$notchedOutline': {
						borderColor: '#ffffff',
					},
					'& fieldset': {
						borderColor: '#5500ff',
						borderWidth: 2,
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: '#5500ff',
					},
					'&:hover fieldset': {
						borderColor: '#5500ff',
					},
					'&.Mui-focused fieldset': {
						borderColor: '#5500ff',
					},
					'& .MuiOutlinedInput-input': {
						color: '#ffffff'
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: '#ffffff',
					'&.Mui-focused': {
						color: '#ffffff',
					},
				},
			},
		},
	},
})

export { purpleTheme }

