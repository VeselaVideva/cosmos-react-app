import './Loading.css';


const Loading = () => {
    return (
        <div className="loader-container" data-testid="loader">
            <div className="loader">
                <div className="inner one" />
                <div className="inner two" />
                <div className="inner three" />
            </div>
        </div>
    );
}

export default Loading;