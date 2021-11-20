import './Home.css';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const Home = () => {
    const { text } = useTypewriter({
        words: [
            'Hello dear traveler',
            'If you are looking for a new journey',
            'This is the right place to start',
            'Explore our destinations and be safe'
        ],
        loop: 0,
    });

    return (
        <div className="home">
            <span>{text}</span>
            <Cursor />
        </div>
    );
}

export default Home;