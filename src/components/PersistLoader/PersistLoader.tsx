import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const PersistLoader = () => {
  return (
    <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Box>
  )
}

export default PersistLoader