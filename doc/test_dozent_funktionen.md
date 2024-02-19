# M294 - Blackbox test

## Testfall - Dozenten Auflisten

### Aktion

Über die Menüleiste wird zur Seite 'Dozenten' navigiert.

### Eingabe

Klick auf das Feld 'Dozenten' in der Navigationsleiste.

### Erwartete Ausgabe

Die Seite zeigt eine Tabelle aller Dozenten an.

### Ausgabe

Die Seite zeigt eine Tabelle aller Dozenten an.

### Fazit

Der Testfall ist positiv ausgefallen, das Feature Dozenten auflisten funktioniert.

## Testfall - Details eines Dozenten auflisten

### Aktion

In der liste wird auf einen beliebigen Dozent geklickt.

### Eingabe

Klick auf beliebige Zeile in der Tabelle aller Dozenten.

### Erwartete Ausgabe

Die Seite wechselt zu einer Tabelle mit Schlüssel - Wert Paaren, die alle Daten des gewählten Dozenten anzeigen.

### Ausgabe

Die Seite wechselt zu einer Tabelle mit Schlüssel - Wert Paaren, die alle Daten des gewählten Dozenten anzeigen. Fremdschlüssel werden als Links angezeigt, und man kann zur Detailansicht des dazugehörigen Elements wechseln, in dem man darauf klickt.

### Fazit

Der Testfall ist positiv ausgefallen, das Feature 'Details eines Dozenten auflisten' funktioniert.

## Testfall - Dozent erstellen

## Aktion

Ein Dozent wird erstellt, dabei wird nur der Vorname angegeben.

## Eingabe

Formular, Feld 'Vorname' wird mit 'Max' ausgefüllt. Alle anderen Felder werden leer gelassen.

## Erwartete Ausgabe

Die Seite zeigt Fehler im Formular an, da, wo sie bestehen.

## Ausgabe

Das Feld 'Nachname' wird rote gekennzeichnet, fokussiert und die Meldung 'Pflichtfeld' erscheint darunter.
