import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

type LinkProps = MuiLinkProps & NextLinkProps

const Link = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref = true,
  prefetch,
  locale,
  ...props
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
    >
      <MuiLink {...props}>{children}</MuiLink>
    </NextLink>
  )
}

export default Link
