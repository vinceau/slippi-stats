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

The gif above is real-time speed and is not sped up!

## FAQ

### How is it so fast?

It reads your SLP files locally and does all the computation in-browser. Nothing is sent to any servers so this works offline too! This allows very fast Slippi game parsing so you can generate these graphics instantly.

### Can I remove the background in OBS?

Yes, you can! Just add this to the Custom CSS in the source properties.

```css
body {
  background: none !important;
}
```

## Development

In the project directory, you can run:

```
yarn run start
```

This runs the app in the development mode. Open <http://localhost:3000> to view it in the browser. The page will reload as you make changes.

To build the app for production, run:

```
yarn run build
```

## Acknowledgements

This project was made possible by:

- [Jas Laferriere](https://github.com/JLaferri) and the rest of the [Project Slippi](https://slippi.gg/about) team for Project Slippi

- [Jas Laferriere](https://github.com/JLaferri) for his [Slippi Set Stats](https://github.com/project-slippi/slippi-set-stats) script

- [BTS Smash](https://twitter.com/BTSsmash/) for their post-match stats design


## License

This software is released under the terms of [MIT license](LICENSE).
