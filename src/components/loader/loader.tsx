import './loader.css';

const Loader = () => {
    return (
        <div className='flex items-center justify-center overflow-hidden w-screen h-screen'>
            <div className="newtons-cradle">
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
            </div>
        </div>
    )
}

export default Loader;