"use client"
import "./Datenschutz.css";


export default function Datenschutz() {


    return (
        <section className="datenschutz-container">
            <h1 className="title">Datenschutzerklärung</h1>

            <p className='datenschutz-paragraph'>Wir freuen uns über Ihr Interesse an unserer Webseite. Der Schutz Ihrer Privatsphäre ist für uns sehr wichtig. Nachstehend informieren wir Sie ausführlich über den Umgang mit Ihren Daten.</p>

            <h2 className="title">Datenerfassung auf unserer Website</h2>

            <h6 className="title">Cookies</h6>
            <p className='datenschutz-paragraph'>Unsere Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die auf Ihrem Endgerät abgelegt werden und die Ihr Browser speichert.</p>
            <p className='datenschutz-paragraph'>Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie diese löschen. Diese Cookies
                ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.</p>

            <h2 className="title">Daten bei Registrierung</h2>
            <p className='datenschutz-paragraph'>Wenn Sie sich bei uns registrieren, werden Ihre Angaben aus dem Registrierungsformular inklusive der von Ihnen dort angegebenen Daten zwecks Durchführung der Registrierung und für den Fall von Rückfragen gespeichert. Diese Daten geben
                wir nicht ohne Ihre Einwilligung weiter.</p>


            <h2 className="title">Änderung unserer Datenschutzbestimmungen</h2>
            <p className='datenschutz-paragraph'>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer
                Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.</p>

        </section>
    );
};
