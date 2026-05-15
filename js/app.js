import "./infocard.js";
import "./particle.js";
import "./wave.js";
import "./entry.js";
import "./navbar.js";
import "./produkt.js";


document.addEventListener('DOMContentLoaded', function() {
    const breadcrumbList = document.getElementById('breadcrumb-dynamic');
    
    // Holt den aktuellen Dateinamen (z.B. "referenzen.html")
    let path = window.location.pathname.split("/").pop();
    
    // Wenn wir nicht auf der Startseite (index.html oder leer) sind
    if (path !== "" && path !== "index.html") {
        
        // Dateiendung .html entfernen
        let pageName = path.replace(".html", "");
        
        // Text verschönern: Bindestriche durch Leerzeichen ersetzen & Erster Buchstabe groß
        pageName = pageName.replace(/-/g, ' ');
        let displayName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        
        // Ein neues Listenelement für die Unterseite erstellen
        const li = document.createElement('li');
        li.classList.add('breadcrumb-item', 'active');
        li.setAttribute('aria-current', 'page');
        li.textContent = displayName;
        
        // An die Liste anhängen
        breadcrumbList.appendChild(li);
        
        // Den Home-Link (das erste Element) wieder normal färben (nicht mehr fett)
        breadcrumbList.querySelector('li').classList.remove('active');
    } else {
        // Wir sind auf Home -> Home soll aktiv/fett sein
        breadcrumbList.querySelector('li').classList.add('active');
    }
});