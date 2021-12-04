import Particles from "react-tsparticles";


const Background = () => {
    const particlesInit = (main) => {
        // console.log(main);
    };

    const particlesLoaded = (container) => {
        // console.log(container);
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#001932",
                    },
                },
                particles: {
                    number: {
                        density: {
                            enable: true,
                            value_area: 1500,
                        },
                        value: 60,
                    },
                    line_linked: {
                        enable: true,
                        opacity: 0.02
                    },
                    move: {
                        direction: "right",
                        speed: 0.05
                    },
                    size: {
                        value: 1,
                    },
                    opacity: {
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.05
                        }
                    }
                },
                interactivity: {
                    events: {
                        onclick: {
                            enable: true,
                            mode: "push"
                        }
                    },
                    modes: {
                        push: {
                            particles_nb: 1
                        }
                    }
                },
                detectRetina: true,
            }}
        />
    );
}

export default Background;