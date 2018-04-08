[![npm version](https://badge.fury.io/js/reavas.svg)](https://badge.fury.io/js/reavas)

# Reavas ⚛ + 🖼 (react + canvas )

This is a tiny react component that takes in the id of a `<canvas>` and provides you with `setup()` and `paint()` callbacks.

## Demo

I built a fun particle canvas app using this library. [Try it out here!](https://jamesformica.github.io/lineart/)

## Install It

Simply grab it from npm using yarn or npm

```shell
$ yarn add reavas

$ npm install reavas
```

## Use It

Firstly, create a new react class component and extend Reavas

```javascript
import Reavas from 'reavas';

class Canvas extends Reavas {

}
```

Secondly, implement the `setup()` and `paint()` methods as you wish

```javascript
import Reavas from 'reavas';

class Canvas extends Reavas {
  setup(canvas, context) {
    this.x = 100;
    this.y = 100;
  }

  paint(canvas, context) {
    context.beginPath();
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, 200, 100);
  }
}
```

Thirdly, create an html `<canvas>` element and give it an `id`. Then simply place your new component next to it and pass the id to the `canvasId` prop

```javascript
import React from 'react'
import Canvas from './Canvas'; // the new component we just created

const SomeComponent = () => (
  <div>
    <canvas id="chicken"></canvas>
    <Canvas canvasId="chicken" />
  </div>
);
```

And that's it!

## How it works

- The component that `extends` Reavas won't actually render anything.

- On mount it will find the canvas via the id then call the `setup()` function.

- An internal loop that aims to achieve 60fps (using `window.requestAnimationFrame`) will be initiated and call the `paint()` function at each interval.

## Props

- `canvasId`: the id of the `<canvas>` element that you want to target. (required)

- `debug`: when true, will print out loop info such as FPS to the `console`. (default: false)

## Functions

As mentioned, there are two functions that your class can override `setup()` and `paint()`. You don't need to implement either, although, without the paint function you won't be doing much.

Both functions receive 2 arguments: `canvas` and `context`. The canvas arg is the actual html canvas element and can be used to get things such as the width and height of the canvas. The context arg is what you use to draw with.

## Final words

Honestly, I don't know if this is actually useful to anyone, but if it is that's awesome! I'm by no means an expert at this sort of stuff so don't yell at me if the algorithms are wrong or something.

Thanks 🙃
