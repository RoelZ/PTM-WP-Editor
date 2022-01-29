# TODO - Star poster
NEW
---
- Tijdelijke BF price!
- ~~iconen~~
- ~~marker kleur weg~~
- ~~achtergrond kleuren~~
- ~~prijs doorstrepen (50x70: €42.61, 30x40: €39.13)~~
- ~~toggle eruit~~
- defaultStyle wordt niet geset door parameters
- 30x40 valt te klein in poster
- maan is blauw (canvas.js in source code #669 #557)
- hay zwarte lijnen dunner (backlog)
- GTM Event triggers (datetime, en dubbele trigger op place)

Print
---
- kleuren en mw opacity kleuren

Editor
- 30x40 prijs wordt niet geupdate in CTA
- query params updaten alles behalve starmap viewer
- ~~Mobile fixes (toggle, canvas sterren)~~
- ~~Canvas updaten met final config (milkyway, kleuren)~~
- ~~Save to cart (NL) - Variation_id not set~~
- ~~Styles (kleuren) updaten~~
- ~~GTM~~
- ~~Canvas niet in het midden~~

Cart
---
- ~~screenshot~~
- draft link (tijdelijk) verwijderen

Order
---
- 
- Print poster link (geen tiles, maar eigen oplossing obv placeid?/location en datetime)



Dashboard
---
- tonen van star posters

# TODO - Map poster

UX
---
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