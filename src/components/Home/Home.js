import './Home.css';

import { useTypewriter } from 'react-simple-typewriter';


const Home = () => {
    const { text } = useTypewriter({
        words: [
            'Hello dear space traveler',
            'If you are looking for a new adventure',
            'This is the right place to start',
            'Explore all the planets and be safe'
        ],
        loop: 1,
    });

    return (
        <div className="home">
            <span>{ text }</span>
            <div className="video">
                <video
                    src="/space-walk.mp4"
                    width="1280"
                    height="720"
                    controls
                    autoPlay
                    muted
                    loop
                />
            </div>
        </div>
    );
}

export default Home;