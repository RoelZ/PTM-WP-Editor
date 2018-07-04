TODO
====

UX
----
- CheckSize() verneukt mobiel keypad (gelinkt met bovenstaande)
- Schaduw achter poster toevoegen
- Next button (per panel)
- Checkout button is nog niet juist (later bekijken)
- Kruisje (sluiten) toevoegen (zie prototype)
- Design Tab namaken als prototype (check ook nike)

GET endpoints
-------------
- **m** : marker style
- ~~**mc** : marker Coordinates~~
- **c** : center (focus) point
- ~~**s** : poster style~~

POST endpoints
--------------
- coordinates : Canvas (lat,lng,zoom)
- marker_coordinates : Marker (lat,lng)
- ptm_moment : Text Moment 
- ptm_location : Text Subline
- ptm_address : Text Tagline
- design_id : 0=snow, 1=moon, 2=granite, 3=mint
- marker_style : 0=granite, 1=mint, 2=yellow

Adres
-----
- Controle op adresgegevens (bv. undefined bij geen huisnummer)
- PreSelected adres (API)

Styles
------
- PreSelected UI (bij laden van pagina (default | GET))

Markers
-------
- Verplaatsen
- Verwijderen
- PreSelected UI (bij laden van pagina (default | GET))

Website stijling
-----
- PTM Marker logo als mask gebruiken voor foto's!! (wat een **vet** idee Roel!)