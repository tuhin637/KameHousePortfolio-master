import { useRef, useMemo } from "react" 
import { TextureLoader, Uniform } from 'three'
import { useLoader, useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"

import vertexShader from '../../shaders/tvnoise/vertex.glsl'
import fragmentShader from '../../shaders/tvnoise/fragment.glsl'

const PROJECTS = [
    {
        title: "TasteKart",
        desc: "Online Food Delivery Platform",
        tech: "HTML · CSS · JS · PHP · MySQL",
        live: "http://tastekart.lovestoblog.com/",
        github: "https://github.com/tuhin637/Tastekart",
    },
    {
        title: "Library Management",
        desc: "System with AI Features",
        tech: "PHP · MySQL · HTML · CSS · JS",
        live: "http://librarymanagementsystem.gamer.gd/",
        github: "https://github.com/tuhin637/Library-management-System",
    },
    {
        title: "ShopHub",
        desc: "E-Commerce Platform",
        tech: "HTML5 · CSS3 · JavaScript",
        live: "https://shop-hub-e-commerce-platform.vercel.app/",
        github: "https://github.com/tuhin637/ShopHub--E-Commerce-Platform",
    },
    {
        title: "BrewLab",
        desc: "Coffee Shop Landing Page",
        tech: "HTML5 · CSS3 · JavaScript",
        live: "https://brewlab-seven.vercel.app/",
        github: "https://github.com/tuhin637/brewlab",
    },
    {
        title: "BirdScape",
        desc: "Interactive Photo Carousel",
        tech: "HTML5 · CSS3 · JavaScript",
        live: "https://bird-scape-interactive-photo-carous.vercel.app/",
        github: "https://github.com/tuhin637/BirdScape---Interactive-Photo-Carousel",
    },
    {
        title: "Heart Disease Prediction",
        desc: "ML Thesis Web App",
        tech: "Python · Scikit-learn · XGBoost",
        live: "https://heart-disease-website-ou9g.vercel.app/",
        github: "https://github.com/tuhin637",
    },
]

export default function TvScreen(props)
{
    const planeRef = useRef()
    const logosRef = useRef()

    const githubTexture    = useLoader(TextureLoader, "./logos/logoGithub.png");
    const linledinTexture  = useLoader(TextureLoader, "./logos/logoLinkedin.png");
    const cvTexture        = useLoader(TextureLoader, "./logos/logoCV.png");
    const sourceTexture    = useLoader(TextureLoader, "./logos/logoSource.png");
    const workTexture      = useLoader(TextureLoader, "./logos/work.png");

    // ✅ Fixed: uProgress updates every frame
    useFrame(({ clock }) => {
        planeRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
        planeRef.current.material.uniforms.uProgress.value = props.progress;

        logosRef.current.children.forEach((child) => {
            if (child.material) {
                child.material.opacity = props.opacity;
            }
        })
    });

    // ✅ Fixed: memoized so it doesn't recreate every render
    const shaderMaterial = useMemo(() => ({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uTime:     new Uniform(0),
            uProgress: new Uniform(0)
        }
    }), [])

    const handleClick = (url) => {
        if (props.opacity > 0.9) {
            window.open(url, "_blank");
        }
    };

    const panelOpacity = Math.max(0, (props.opacity - 0.5) * 2);

    return <>

        <ambientLight intensity={1} />

        {/* TV noise shader screen */}
        <mesh position={[0.61, 2.35, -3.49]} ref={planeRef}>
            <planeGeometry args={[0.65, 0.45]} />
            <shaderMaterial
                attach="material"
                args={[shaderMaterial]}
            />
        </mesh>

        {/* ─── Icon buttons ─────────────────────────────────────
            Layout (X removed, 5 icons remain):
            Top row    :  GitHub  |  (gap)  |  LinkedIn
            Bottom row :    CV   |  Source  |  Work With Me
        ──────────────────────────────────────────────────── */}
        <group ref={logosRef}>

            {/* GitHub */}
            <mesh
                position={[0.38, 2.45, -3.48]}
                scale={[0.09, 0.1, 0.1]}
                onClick={() => handleClick("https://github.com/tuhin637")}
            >
                <planeGeometry />
                <meshBasicMaterial map={githubTexture} transparent />
            </mesh>

            {/* LinkedIn  (moved to right slot, X slot left empty) */}
            <mesh
                position={[0.83, 2.45, -3.48]}
                scale={[0.09, 0.1, 0.1]}
                onClick={() => handleClick("https://www.linkedin.com/in/tuhinuzzaman-tuhin-549367396")}
            >
                <planeGeometry />
                <meshBasicMaterial map={linledinTexture} transparent />
            </mesh>

            {/* CV — opens PDF in new tab */}
            <mesh
                position={[0.38, 2.25, -3.48]}
                scale={[0.07, 0.1, 0.1]}
                onClick={() => handleClick("./CV/CVTuhin.pdf")}
            >
                <planeGeometry />
                <meshBasicMaterial map={cvTexture} transparent />
            </mesh>

            {/* Source Code (GitHub repos) */}
            <mesh
                position={[0.60, 2.25, -3.48]}
                scale={[0.09, 0.1, 0.1]}
                onClick={() => handleClick("https://github.com/tuhin637?tab=repositories")}
            >
                <planeGeometry />
                <meshBasicMaterial map={sourceTexture} transparent />
            </mesh>

            {/* Work With Me (email) */}
            <mesh
                position={[0.83, 2.25, -3.48]}
                scale={[0.09, 0.12, 0.12]}
                onClick={() => handleClick("mailto:tuhinuzzaman15-4649@diu.edu.bd")}
            >
                <planeGeometry />
                <meshBasicMaterial map={workTexture} transparent />
            </mesh>

        </group>

        {/* ─── Projects Panel ───────────────────────────────── */}
        <Html
            position={[0.61, 1.72, -3.49]}
            rotation-y={0}
            transform
            occlude={false}
            style={{
                opacity: panelOpacity,
                transition: "opacity 0.3s",
                pointerEvents: panelOpacity > 0.5 ? "auto" : "none",
            }}
        >
            <div style={{
                width: "3800px",
                background: "rgba(18, 10, 4, 0.95)",
                border: "1px solid rgba(255,200,100,0.2)",
                borderRadius: "80px",
                padding: "90px 100px",
                fontFamily: "sans-serif",
                color: "#f4eadb",
                boxShadow: "0 0 200px rgba(0,0,0,0.9)",
                transform: "scale(0.00017)",
                transformOrigin: "top center",
            }}>
                {/* Header */}
                <div style={{
                    textAlign: "center",
                    fontSize: "130px",
                    fontFamily: "'Bangers', cursive",
                    letterSpacing: "15px",
                    color: "#ffd580",
                    marginBottom: "80px",
                    borderBottom: "4px solid rgba(255,200,100,0.3)",
                    paddingBottom: "50px",
                }}>
                    🗂 MY PROJECTS
                </div>

                {/* Project Cards Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "60px",
                }}>
                    {PROJECTS.map((p, i) => (
                        <div key={i} style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "2px solid rgba(255,200,100,0.25)",
                            borderLeft: "8px solid rgba(255,200,100,0.6)",
                            borderRadius: "40px",
                            padding: "60px 70px",
                        }}>
                            <div style={{
                                fontSize: "110px",
                                fontFamily: "'Bangers', cursive",
                                color: "#ffd580",
                                marginBottom: "20px",
                                letterSpacing: "5px",
                            }}>
                                {p.title}
                            </div>
                            <div style={{
                                fontSize: "75px",
                                color: "#ddd",
                                marginBottom: "25px",
                            }}>
                                {p.desc}
                            </div>
                            <div style={{
                                fontSize: "65px",
                                color: "#999",
                                marginBottom: "60px",
                                lineHeight: 1.4,
                            }}>
                                {p.tech}
                            </div>
                            <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
                                <a
                                    href={p.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        fontSize: "65px",
                                        background: "#ffd580",
                                        color: "#1a0e00",
                                        padding: "25px 70px",
                                        borderRadius: "30px",
                                        textDecoration: "none",
                                        fontWeight: "bold",
                                    }}
                                >
                                    🔗 Live Demo
                                </a>
                                <a
                                    href={p.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        fontSize: "65px",
                                        background: "rgba(255,255,255,0.08)",
                                        color: "#f4eadb",
                                        padding: "25px 70px",
                                        borderRadius: "30px",
                                        textDecoration: "none",
                                        border: "2px solid rgba(255,255,255,0.2)",
                                    }}
                                >
                                    ⌥ GitHub
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Html>

    </>
}