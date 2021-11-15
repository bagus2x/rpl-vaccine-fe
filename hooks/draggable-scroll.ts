import { MouseEventHandler, useEffect, useRef } from 'react'

const useDraggableScroll = <T extends HTMLElement>() => {
  const containerRef = useRef<T | null>(null)

  let initialPosition = {
    scrollTop: 0,
    scrollLeft: 0,
    mouseX: 0,
    mouseY: 0
  }

  const onMouseMove = (event: { clientX: number; clientY: number }) => {
    if (!containerRef.current) return
    const dx = event.clientX - initialPosition.mouseX
    containerRef.current.scrollLeft = initialPosition.scrollLeft - dx
  }

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  const onMouseDown: MouseEventHandler<T> = (ev) => {
    if (!containerRef.current) return

    initialPosition = {
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop,
      mouseX: ev.clientX,
      mouseY: ev.clientY
    }

    containerRef.current.style.userSelect = 'none'

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return { containerRef, onMouseDown }
}

export default useDraggableScroll
