import { lazy, Suspense } from 'react'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'

// Lazy load below-the-fold sections
const Skills = lazy(() => import('../components/sections/Skills'))
const Projects = lazy(() => import('../components/sections/Projects'))
const Contact = lazy(() => import('../components/sections/Contact'))

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>}>
        <Skills />
        <Projects />
        <Contact />
      </Suspense>
    </>
  )
}

export default HomePage