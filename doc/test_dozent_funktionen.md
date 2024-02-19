# M294 - Blackbox test

1. [Testfall - Dozenten Auflisten](#testfall-dozenten-auflisten)
2. [Testfall - Details eines Dozenten auflisten](#testfall-details-eines-dozenten-auflisten)
3. [Testfall - Dozent erstellen](#testfall-dozent-erstellen)
4. [Testfall - Dozent bearbeiten](#testfall-dozent-bearbeiten)
5. [Testfall - Dozent löschen](#testfall-dozent-löschen)

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

### Aktion

Ein Dozent wird erstellt, dabei wird nur der Vorname angegeben.

### Eingabe

Formular, Feld 'Vorname' wird mit 'Max' ausgefüllt. Alle anderen Felder werden leer gelassen.

### Erwartete Ausgabe

Die Seite zeigt Fehler im Formular an, da, wo sie bestehen.

### Ausgabe

Das Feld 'Nachname' wird rote gekennzeichnet, fokussiert und die Meldung 'Pflichtfeld' erscheint darunter.

### Fazit

Das Formular wird validiert und Fehler werden mit passender Meldung angezeigt.

## Testfall - Dozent bearbeiten

### Aktion

Es Wird über die Tabelle -> Klick auf den Dozenten -> Knopf 'Bearbeiten' zum Formular navigiert.
Ein bestehender Dozent wird bearbeitet. Dabei wird eine E-Mail hinzugefügt.

### Eingabe

Das Feld 'E-Mail' wird ausgefüllt mit dem wert 'max@example.com'.
Es wird Enter gedrückt.

### Erwartete Ausgabe

Das Formular wird von Anfang an mit bestehenden Werten ausgefüllt.
Das Formular wird auf seine Gültigkeit überprüft und die Änderungen werden Vorgenommen.

### Ausgabe

Das Formular wird von Anfang an mit bestehenden Werten ausgefüllt.
Das Formular wird übermittelt, und man wird auf die Detailansicht des Eintrags umgeleitet, den man gerade bearbeitet hat.

### Fazit

Es ist klar ersichtlich, ob die Änderung funktioniert hat. Man sieht den bearbeiteten Eintrag direkt nach der Übermittlung des Formulars.

## Testfall - Dozent löschen

### Aktion

Es wird zum Bearbeitungs - Formular eines bestehenden Dozenten navgiert. Der Knopf 'Löschen' wird gedrückt.

### Erwartete Ausgabe

Der entsprechende Eintrag wird gelöscht, es bestehen keine Referenzen zu dem gelöschten Objekt in der Datenbank.

### Ausgabe

Der Eintrag wird gelöscht, die dazugehörige Tabelle wird angezeigt, mit neuen Daten. Wenn man andere Tabellen mit Referenzen auf dieses Objekt enthielten, sind diese nun leer und können mit neuen Werten befüllt werden.
