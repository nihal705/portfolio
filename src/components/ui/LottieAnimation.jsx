import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

const LottieAnimation = ({ 
  animationData, 
  loop = true, 
  autoplay = true, 
  className = '',
  speed = 1 
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !animationData) return

    const instance = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: loop,
      autoplay: autoplay,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    })

    instance.setSpeed(speed)

    return () => {
      instance.destroy()
    }
  }, [animationData, loop, autoplay, speed])

  return <div ref={containerRef} className={className} />
}

export default LottieAnimation