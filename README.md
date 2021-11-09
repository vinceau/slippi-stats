# Slippi Stats Graphic Generator

> Automatically generate Summit-style Slippi set stats. Say that 5 times.

Instantly compute Slippi stats in-browser and beautifully render the results. Perfect for both tournament broadcasts and competitors.

## Screenshot

![generated slippi stats screenshot](docs/images/screenshot.png)

## Features

- Extremely fast offline stats computation
- Easy drag-and-drop into OBS
- Highly customizable
- No download required
- Free and open source

## Usage

1. Go to <https://vinceau.github.io/slippi-stats/>
2. Drag and drop your SLP files
3. Click "Generate Stats"
4. Drag the OBS button into OBS to instantly create a source

![animated gif showing the usage](docs/images/usage.gif)

## FAQ

### The detected winner is incorrect!

Determining who wins a game seems easy at first but once you consider the possibilities of LRAS and quitting out of games, it's actually non-trivial. If the detected winner is incorrect, you can fix the set count by clicking on the head-to-head images.

![how to change the game winner](https://i.imgur.com/ZzCvVID.gif)

### How do I show different stats?

First click the *customize stats* button in the top right of the SLP file list to show the list of available stats. Then toggle the checkboxes to enable and disable certain stats from being calculated.

![how to customize stats](https://i.imgur.com/6CCWPMr.gif)

### How do I change the color scheme?

Expand the options panel at the bottom to show some more customization options.

![how to change the color scheme](https://i.imgur.com/zFnevxq.gif)

### How do I remove the background in OBS?

Just add this to the Custom CSS in the source properties.

```css
body {
  background: none !important;
}
```

### Dragging the OBS button doesn't work!

If you're using Streamlabs OBS (SLOBS), or just can't get it to work in normal OBS, just copy the browser URL and create a new browser source as you normally would for a website.

### How does it work?

It reads your SLP files locally and does all the computation in-browser. Nothing is sent to any servers so this works offline too! This allows very fast Slippi game parsing so you can generate these graphics instantly.

## Development

### Setup

Clone the repo and install dependencies:

```bash
git clone https://github.com/vinceau/slippi-stats
cd slippi-stats
yarn install
```

In the project directory, you can run:

```bash
yarn run start
```

This runs the app in the development mode. Open <http://localhost:3000> to view it in the browser. The page will reload as you make changes.

To build the app for production, run:

```bash
yarn run build
```

### Adding Custom Stats

You can add custom stats by extending the `StatDefinition` interface as defined in [`lib/stats/types.ts`](src/lib/stats/types.ts).

```typescript
export type StatCalculation = (games: GameDetails[], playerIndex: number) => StatCalculationResult;

export interface StatDefinition {
  name: string;
  type: string;
  betterDirection?: string;
  recommendedRounding?: number;
  calculate: StatCalculation;
}
```

See [`firstBlood.ts`](src/lib/stats/definitions/firstBlood.ts) and [`lCancelAccuracy.ts`](src/lib/stats/definitions/lCancelAccuracy.ts) for an example of custom stats implementations.

Once you have a custom stats definition, simply give it an ID in [`lib/stats/types.ts`](src/lib/stats/types.ts) and register the definition in [`lib/stats/compute.ts`](src/lib/stats/compute.ts).

## Acknowledgements

This project was made possible by:

- [Jas Laferriere](https://github.com/JLaferri) and [the team](https://slippi.gg/about) for Project Slippi

- [Jas Laferriere](https://github.com/JLaferri) for his [Slippi Set Stats](https://github.com/project-slippi/slippi-set-stats) script

- [BTS Smash](https://twitter.com/BTSsmash/) for their post-match stats design

- [David V. Kimball](https://twitter.com/davidvkimball) for the HD stage screenshots

## License

This software is released under the terms of [MIT license](LICENSE).
