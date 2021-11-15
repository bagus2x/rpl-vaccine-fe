import Box, { BoxProps } from '@mui/material/Box'
import React from 'react'
import { Link as ScrollLink } from 'react-scroll'

interface ScrollableLinkProps extends BoxProps {
  to: string
  duration?: number
  smooth?: boolean
}

const ScrollableLink = ({ to, duration = 1000, smooth = true, children, ...props }: ScrollableLinkProps) => {
  return (
    <Box {...props}>
      <ScrollLink to={to} duration={duration} smooth={smooth}>
        {children}
      </ScrollLink>
    </Box>
  )
}

export default ScrollableLink
