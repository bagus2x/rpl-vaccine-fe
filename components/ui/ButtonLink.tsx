import Button, { ButtonProps } from '@mui/material/Button'
import Link, { LinkProps } from 'next/link'

type ButtonLinkProps = ButtonProps & LinkProps

const ButtonLink = ({
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
}: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
    >
      <Button {...props}>{children}</Button>
    </Link>
  )
}

export default ButtonLink
