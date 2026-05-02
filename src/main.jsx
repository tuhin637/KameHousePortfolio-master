import { Analytics } from "@vercel/analytics/react"

import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { StrictMode, Suspense } from 'react'

import Loader from './Components/Loader.jsx'
import App from './App.jsx'
import './index.css'

console.log("Hi! If you notice a bug please contact me: tuhinuzzaman15-4649@diu.edu.bd")

const isMobile = () => {
    return ( ( window.innerWidth <= 1000 ) && ( window.innerHeight <= 800 ) );
}

const root = ReactDOM.createRoot(document.querySelector('#root'))

const fovForMobile = 100
const fovForPc = 45

root.render(
    <StrictMode>
        <Canvas
            camera={{
            fov: isMobile() ? fovForMobile : fovForPc,
            near: 0.1,
            far: 200,
            position: [52, 7, 12],
        }}
        >
            <Suspense fallback={<Loader/>}>
                <App/>   
            </Suspense>
        </Canvas>

        <Analytics/>
        <div style={{ display: "none" }}>
  <section aria-hidden="true">
    <h1>MD. Tuhinuzzaman Tuhin - Web Developer</h1>
    <h2>Bachelor of Science in Computer Science & Engineering - Daffodil International University</h2>
    <h2>Full-Stack Web Developer | PHP | JavaScript | MySQL</h2>
    <h2>Specialized in Full-Stack Web Development & Machine Learning</h2>
  </section>
  <section aria-hidden="true">
    <h2>Skills and Expertise</h2>
    <ul>
      <li>HTML5 & CSS3 Developer</li>
      <li>JavaScript Developer</li>
      <li>PHP & MySQL Developer</li>
      <li>Python Developer</li>
      <li>Responsive Web Design</li>
      <li>Git & GitHub</li>
      <li>Machine Learning - Scikit-learn, XGBoost, Random Forest</li>
    </ul>
  </section>
  <section aria-hidden="true">
    <h2>Projects</h2>
    <ul>
      <li>TasteKart - Online Food Delivery Platform</li>
      <li>Library Management System with AI Features</li>
      <li>ShopHub - E-Commerce Platform</li>
      <li>BrewLab - Coffee Shop Landing Page</li>
      <li>BirdScape - Interactive Photo Carousel</li>
      <li>Heart Disease Prediction Using Machine Learning (Thesis)</li>
    </ul>
  </section>
  <section aria-hidden="true">
    <p>
      Welcome to the 3D portfolio of MD. Tuhinuzzaman Tuhin, a Web Developer and 
      CSE graduate from Daffodil International University. This immersive 3D portfolio 
      showcases full-stack projects, technical skills, and academic achievements through 
      an interactive house experience built with React Three Fiber.
    </p>
  </section>
  <noscript>
    <p>
      This 3D portfolio of MD. Tuhinuzzaman Tuhin showcases web development projects 
      using React Three Fiber, Three.js, and GSAP. Please enable JavaScript to explore 
      the immersive experience.
    </p>
  </noscript>
</div>

    </StrictMode>
)