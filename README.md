```markdown
# Blincs Player

Blincs Player is a customizable React video player component with TypeScript support. It uses Tailwind CSS for styling and allows developers to fully customize the player buttons and other elements. The player is optimized for chunked media playback, ensuring faster load times and smoother streaming.

## Features

- Play/Pause button
- Volume control (increase, decrease, set to 100%)
- Full-screen toggle
- Forward 10 seconds
- Rewind 10 seconds
- Fully customizable button styles and labels using props
- Supports chunked media playback for faster streaming

## Installation

To install Blincs Player, use npm or yarn:

```sh
npm install blincs-player
```

```sh
yarn add blincs-player
```

## Usage

Import the `CustomVideoPlayer` component and use it in your project:

```tsx
import React from 'react';
import CustomVideoPlayer from 'blincs-player';
import 'blincs-player/dist/styles.css'; // Ensure you import the styles

const App: React.FC = () => {
  return (
    <div className="App">
      <CustomVideoPlayer
        videoUrl="https://example.com/video"
        customClasses="custom-video-player-class"
        buttonStyles={{
          playPause: 'custom-play-pause-class',
          volumeUp: 'custom-volume-up-class',
          volumeDown: 'custom-volume-down-class',
          volumeMax: 'custom-volume-max-class',
          fullScreen: 'custom-full-screen-class',
          forward: 'custom-forward-class',
          rewind: 'custom-rewind-class',
        }}
        buttonLabels={{
          play: 'Play',
          pause: 'Pause',
          volumeUp: 'Volume Up',
          volumeDown: 'Volume Down',
          volumeMax: 'Max Volume',
          fullScreen: 'Full Screen',
          forward: 'Forward 10s',
          rewind: 'Rewind 10s',
        }}
      />
    </div>
  );
};

export default App;
```

## Props

### `videoUrl`
- **Type:** `string`
- **Description:** The URL of the video to be played.

### `customClasses`
- **Type:** `string`
- **Description:** Custom classes to apply to the video player container.

### `buttonStyles`
- **Type:** `object`
- **Description:** Custom styles for each button.
- **Structure:**
  - `playPause`: Custom class for play/pause button
  - `volumeUp`: Custom class for volume up button
  - `volumeDown`: Custom class for volume down button
  - `volumeMax`: Custom class for volume max button
  - `fullScreen`: Custom class for full-screen button
  - `forward`: Custom class for forward button
  - `rewind`: Custom class for rewind button

### `buttonLabels`
- **Type:** `object`
- **Description:** Custom labels for each button.
- **Structure:**
  - `play`: Label for play button
  - `pause`: Label for pause button
  - `volumeUp`: Label for volume up button
  - `volumeDown`: Label for volume down button
  - `volumeMax`: Label for volume max button
  - `fullScreen`: Label for full-screen button
  - `forward`: Label for forward button
  - `rewind`: Label for rewind button

## Example

```tsx
import React from 'react';
import CustomVideoPlayer from 'blincs-player';
import 'blincs-player/dist/styles.css'; // Ensure you import the styles

const App: React.FC = () => {
  return (
    <div className="App">
      <CustomVideoPlayer
        videoUrl="https://example.com/video"
        customClasses="custom-video-player-class"
        buttonStyles={{
          playPause: 'bg-custom-play-pause text-custom',
          volumeUp: 'bg-custom-volume-up text-custom',
          volumeDown: 'bg-custom-volume-down text-custom',
          volumeMax: 'bg-custom-volume-max text-custom',
          fullScreen: 'bg-custom-full-screen text-custom',
          forward: 'bg-custom-forward text-custom',
          rewind: 'bg-custom-rewind text-custom',
        }}
        buttonLabels={{
          play: 'Play',
          pause: 'Pause',
          volumeUp: 'Volume Up',
          volumeDown: 'Volume Down',
          volumeMax: 'Max Volume',
          fullScreen: 'Full Screen',
          forward: 'Forward 10s',
          rewind: 'Rewind 10s',
        }}
      />
    </div>
  );
};

export default App;
```

## License

MIT
```

This README provides detailed information about the features, installation, usage, props, and an example of how to use the `CustomVideoPlayer` component. It also highlights the component's support for chunked media playback, which ensures faster streaming.