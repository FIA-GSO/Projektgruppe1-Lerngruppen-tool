import "./Navbar.css";


export default function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-list-item">

                    <a className="nav-element" href="/home">Home</a>
                </li>
                <li className="navbar-list-item">

                    <a className="nav-element" href="/home/mygroups">Meine Gruppen</a>
                </li>
                <li className="navbar-list-item">
                    <a className="nav-element" href="/home/grouplist">Gruppen Liste</a>
                </li>

                <li className="navbar-list-item">

                    <a className="nav-element" href="/home/creategroup">Gruppe erstellen</a>
                </li>
                <li className="navbar-list-item">

                    <a className="nav-element" href="/login">Login</a>
                </li>
            </ul>
        </nav>
    );
};
