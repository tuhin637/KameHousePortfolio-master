import { useRef, useMemo } from "react" 
import { TextureLoader, Uniform } from 'three'
import { useLoader, useFrame } from "@react-three/fiber"

import vertexShader from '../../shaders/tvnoise/vertex.glsl'
import fragmentShader from '../../shaders/tvnoise/fragment.glsl'

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

    </>
}