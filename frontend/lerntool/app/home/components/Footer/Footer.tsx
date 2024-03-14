import "./Footer.css";


export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-bottom">
                &copy; 2024 <a className="footer-link" href="/home/impressum">Impressum</a>
                |
                <a className="footer-link" href="/home/datenschutz">Datenschutz</a>
            </div>
        </footer>
    );
};
