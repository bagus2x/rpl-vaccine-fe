import { Fragment, MutableRefObject, ReactNode, useRef } from 'react'
import useIntersectionObserver from '../../hooks/intersection-observer'

interface ObserverVisibilityProps {
  children: (visible: boolean, ref: MutableRefObject<HTMLDivElement | null>) => ReactNode
}

const ObserverVisibility = ({ children }: ObserverVisibilityProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})

  return <Fragment>{typeof children === 'function' && children(!!entry?.isIntersecting, ref)}</Fragment>
}

export default ObserverVisibility
