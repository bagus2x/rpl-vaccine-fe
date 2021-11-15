import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { forwardRef } from 'react'
import { truncate } from '@/utils/truncate'

const ArticleCard = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        position: 'relative',
        width: { xs: 180, md: 250 }
      }}
      component="div"
      ref={ref}
    >
      <Box
        sx={{
          width: { xs: 180, md: 250 },
          height: { xs: 180, md: 250 },
          position: 'relative',
          borderRadius: { xs: 2, md: 4 },
          overflow: 'hidden'
        }}
      >
        <Image
          draggable={false}
          src="/assets/image/Depositphotos_336730000_l-2015.jpg"
          layout="fill"
          objectFit="cover"
        />
        <Button
          component="div"
          sx={{
            top: 0,
            left: 0,
            width: { xs: 180, md: 250 },
            height: { xs: 180, md: 250 },
            position: 'absolute',
            cursor: 'pointer'
          }}
        />
      </Box>
      <Typography
        variant="h6"
        sx={{
          whiteSpace: 'normal',
          mt: 2
        }}
      >
        {truncate('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, ut. loremmmm', 50)}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          whiteSpace: 'normal',
          mt: 1,
          textAlign: 'justify',
          wordBreak: 'break-word',
          hyphens: 'auto',
          color: 'text.secondary'
        }}
      >
        {truncate('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, ut. loremmmm', 100)}
      </Typography>
    </Box>
  )
})

export default ArticleCard
