# MMM-cpasbien
Cpasbien website scraper Module for MagicMirror<sup>2</sup>

## Dependencies
  * An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
  * Node.js > v0.6.0
  * request-promise
  * cheerio

## Installation
 1. Clone this repo into `~/MagicMirror/modules` directory.
 2. Install dependencies with npm install
 3. Configure your `~/MagicMirror/config/config.js`:

  * Basic Config:

    ```
    {
        module: 'MMM-cpasbien',
        position: 'bottom_right'
    }
    ```
  * Full Config:

    ```
    {
        module: 'MMM-cpabien',
        position: 'bottom_right',
        config: {
            fontSize: 12,
            dimmed: false
        }
    }
    ```

## Config Options
| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `fontSize` | 9 | Font size in pixels |
| `header` | true | Boolean to display header |
| `dimmed` | true | Boolean for discrete visibility |
| `loadingText` | 'Loading...' | String to display loading message |
| `topMax` | 10 | Display max results |
| `replace` | ["DVDRIP","2016","FRENCH","DVDSCR","720p"] | Keywords removed on movies titles |
