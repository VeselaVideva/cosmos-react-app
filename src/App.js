import './App.css';
import Background from './components/Background';
import Header from './components/Header/Header';

export default function App() {
    return (
        <>
            <Background />
            <div className="App">
                <Header />
            </div>
        </>
    );
}