# song-mood-finder

Finds songs in your library notes that match a mood or moment, on-device. Built with [Tether's QVAC SDK](https://github.com/tetherto/qvac) — the model runs on-device, so nothing leaves your machine.

## What it does

Finds songs in your library notes that match a mood or moment, on-device.

**QVAC functions used:** `loadModel` and `embed`.

![song-mood-finder demo](demo.png)

## Why I built it

'Something for driving at night in the rain' isn't a genre in any music app.

## Requirements

- Node.js >= 22
- `@qvac/sdk` `^0.19.0` (installed automatically via `npm install`)

## Install

```bash
git clone https://github.com/YURIIMII-byte/song-mood-finder.git
cd song-mood-finder
npm install
```

## Run

```bash
npm start -- songs.example.txt "driving at night in the rain"
```

An example input is included: `songs.example.txt`.

See the comments at the top of `index.js` for the exact input this app expects. On first run, QVAC downloads the model it needs once and caches it locally; every run after that is fully offline.

## SDK version used

`@qvac/sdk` `0.19.1`

## License

MIT — see [LICENSE](LICENSE).
