import "./Navbar.css";


export default function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <a href="/home">Home</a>
                </li>
                <li>
                    <a href="/home/grouplist">Gruppen Liste</a>
                </li>
                <li>
                    <a href="/home/mygroups">Meine Gruppen</a>
                </li>
                <li>
                    <a href="/login">Login</a>
                </li>
            </ul>
        </nav>
    );
};
