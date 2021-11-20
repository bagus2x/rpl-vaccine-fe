import useParticipants from '@/hooks/query/participants'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import ParticipantHistoryCard from './ParticipantHistoryCard'


const ParticipantHistories = () => {
  const participants = useParticipants()

  return (
    <Box>
      <Typography
        component="h1"
        variant="h5"
        sx={{
          mb: 3
        }}
      >
        Riwayat vaksinasi
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2
        }}
      >
        {participants.data?.map((participant) => (
          <ParticipantHistoryCard
            key={participant.id}
            id={participant.id}
            vaccination={participant.vaccination}
            status={participant.status}
            createdAt={participant.createdAt}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ParticipantHistories
