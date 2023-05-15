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
                    '&:hover:not($disabled):not($focused):not($error) .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#5500ff'
                    },
                    '&:hover:not($disabled):not($focused):not($error) fieldset': {
                        borderColor: '#5500ff'
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
                        color: '#ffffff',
                    },
                    '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#5500ff',
                        },
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
                    '&.Mui-error': {
                        color: '#ffffff',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: '#ffffff',
                },
            },
        },
    },
})



export { purpleTheme }

