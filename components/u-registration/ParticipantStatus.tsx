import Typography, { TypographyProps } from '@mui/material/Typography'
import React, { FC } from 'react'

interface ParticipantStatusProps extends TypographyProps {
  status: 'ACCEPTED' | 'REJECTED' | 'CANCELED' | 'WAITING'
}

const ParticipantStatus: FC<ParticipantStatusProps> = ({ status, ...props }: ParticipantStatusProps) => {
	
  return (
    <Typography
      {...props}
      variant="caption"
      sx={{
        display: 'inline',
        bgcolor:
          status === 'ACCEPTED'
            ? 'success.main'
            : status === 'REJECTED'
            ? 'error.main'
            : status === 'CANCELED'
            ? 'warning.main'
            : 'info.main',
        color: '#fff',
        py: 0.25,
        px: 0.5,
        borderRadius: 1
      }}
    />
  )
}

export default ParticipantStatus
