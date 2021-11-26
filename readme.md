## Hópverkefni 2

Þetta hópverkefni er búið til af Hermanni og Brynjari. Þetta er todo vefforrit sem geymir stöðu notanda í vafra.

## Keyrsla verkefnis

- `npm run dev`: keyrir verkefnið og opnar síðuna í nýjum vafra.
- `npm run lint`: keyrir kóða verkefnisins í gegnum stylelint og eslint sem eru staðlar fyrir scss og javascript kóða.
- https://priceless-neumann-4de510.netlify.app/ hér er linkur á vefsíðuna keyrandi á netlify.

## Lýsing verkefnis

Síðan byrjar á því að ná í gögn úr data.json og sýnir þau. Síðan getur notandi búið til, breytt og bætt við verkefnum að vild og geymist það í vafra. Notandi getur líka eytt verkefnum og merkt við að þau séu kláruð.

## Uppsetning

Verkefnið er unnið með HTML, CSS og javascript, CSS hlutinn er gerður með nokkrum SCSS skrám sem eru svo þýddar í eina styles.css skrá.

Í verkefnamöppunni eru 13 skrár og 4 möppur en við leyfum okkur að horfa framhjá tveimur þeirra. `/styles` mappan inniheldur 5 SCSS skrár sem eru grundvallaratriði CSS kóða verkefnisins.
þær eru eftirfarandi:

- `config.scss` - Stillinga skrá
- `categories.scss` - Útlit flokkana vinstra megin við verkefnin
- `forms.scss` - Útlit fyrir formin til þess að búa til verkefni eða breyta 
- `js.scss` - SCSS skjal fyrir javascript flokkana
- `projects.scss` - Útlit fyrir verkefnalistann

>Þessi skjöl eru keyrð í gegnum `styles.scss` sem er aðal scss skjalið og útfrá því verður `styles.css` til.

`/js` mappan inniheldur 5 javascript skrár sem ásamt `main.js` skránni er öll javascript virkni fyrir síðuna.
Þær eru eftirfarandi.

- `data.js` - Sækir gögn úr data.json
- `helpers.js` - Skrá með hjálparföllum til þess að búa til eða eyða HTML elementum
- `locals.js` - Setur gögn í localstorage
- `sort.js` - Sortar verkefni eftir því hvað er beðið um
- `ui.js` - Sýnir það sem á að sýna fyrir hverja stöðu

>Þetta er allt útfært með `type=module` og `src=main.js` þannig að vefsíðan keyrir `main.js` skránna og nær hún í föll frá hinum skránum.

Annað sem hægt er að finna í möppunni er t.d. `index.html` sem er HTML kóði verkefnisins og `package.json` sem er með allar scriptur og dependencies verkefnisins.

## Hópmeðlimir
### Hermann
    - Netfang: hoh36@hi.is
    - Github: `hemmiklemmi`

### Brynjar
    - Netfang: brb83@hi.is
    - Github: `brynjar13`





