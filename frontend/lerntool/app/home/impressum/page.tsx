"use client"
import "./Impressum.css";

export default function Impressum() {


    return (
        <section className="impressum-container">
            <h1 className="title">Impressum</h1>

            <div className="impressum-paragraph">
                <p>Verantwortlich für den Inhalt dieser Website gemäß § 5 TMG:</p>
                <p>Tim Scherer
                    <br/>
                    Musterstraße 123<br/>
                    12345 Musterstadt</p>

                <p>Kontakt:<br/>
                    Telefon: 0123-456789<br/>
                    E-Mail: <a href="mailto:tim.scherer@gso.schule.koeln">tim.scherer@gso.schule.koeln</a></p>

                <p>Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:<br/>
                    DE 123456789</p>
            </div>
            <div className="impressum-paragraph">
                <p>Verantwortlich für den Datenschutz gemäß § 55 Abs. 2 RStV:</p>
                <p>Jakub Slowik<br/>
                    Musterstraße 123<br/>
                    12345 Musterstadt</p>

                <p>Haftungsausschluss:<br/>
                    Wir übernehmen keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>

                <p>Datenschutzerklärung:<br/>
                    Unsere Datenschutzerklärung finden Sie unter <a href="/home/datenschutz"><span className="span-text">Datenschutz</span></a>.</p>
            </div>
        </section>
    );
};
