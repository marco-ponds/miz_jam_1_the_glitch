const MainMenu = ({ onStartClick }) => (
    <div className='mainmenu'>
        <h1 className="title glitch">THE GLITCH</h1>
        <ul className="menu">
            <li
                className="item"
                onClick={onStartClick}>
                start
            </li>
            <li className="item">about</li>
        </ul>
    </div>
);

export default MainMenu;