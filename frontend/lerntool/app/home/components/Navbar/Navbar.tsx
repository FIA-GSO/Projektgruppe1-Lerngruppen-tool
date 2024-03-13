import "./Navbar.css";


export default function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <a className="nav-element" href="/home/grouplist">Gruppen Liste</a>
                </li>
                <li>
                    <a className="nav-element" href="/home/mygroups">Meine Gruppen</a>
                </li>
                <li>
                    <a className="nav-element" href="/home">Home</a>
                </li>
                <li>
                    <a className="nav-element" href="/home/creategroup">Gruppe erstellen</a>
                </li>
                <li>
                    <a className="nav-element" href="/login">Login</a>
                </li>
            </ul>
        </nav>
    );
};
