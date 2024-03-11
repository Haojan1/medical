import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Magnify from 'mdi-material-ui/Magnify'

function TableSearch() {
  return (
    <Box
      sx={{
        margin: 6,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <TextField
        size='small'
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Magnify fontSize='small' />
            </InputAdornment>
          )
        }}
      />
    </Box>
  )
}

export default TableSearch
