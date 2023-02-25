import { Typography } from '@mui/material'
import React from 'react'

type Props = {
    error?: string;
}

const ErrorMessage = ({ error }: Props) => {
  return (
    <Typography
        variant='subtitle2'
        color='red'
        gutterBottom
        paddingY={1}

    >
        {error}
    </Typography>
  )
}

export default ErrorMessage;