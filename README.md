# FreudJS

Master: [![Build Status](https://travis-ci.org/abuisman/freudjs.svg?branch=master)](https://travis-ci.org/abuisman/freudjs)

![sigmund](https://cloud.githubusercontent.com/assets/27729/9395534/56b81cd0-478f-11e5-9543-7d0afaa5a855.jpg)

Add behaviours to DOM elements, somewhat like components. These are simple Javascript classes that can do whatever you want with the element. For when you need something simpler and more light weight than a library like jQuery, Vue or React.

![freudsignature](https://cloud.githubusercontent.com/assets/27729/9395535/56b9558c-478f-11e5-8994-788cbffadfe5.png)

## What is a behaviour?

A behaviour is a simple class with a constructor that gets passed the element they are applied to. That class can then do all sorts of magical and not so magical things with that element.

This concept started out as a jQuery library I built a few years ago ([abuisman/jquery-freud](https://github.com/abuisman/jquery-freud/)). Nowadays I found myself not wanting to introduce jQuery in new projects, but also not wanting to setup using bigger UI libraries like React and Vue. I therefore revamped the freud concept into this VanillaJS incarnation.

## An example (ES6)

```js
class IncreaseCount {
  constructor(element, options) {
    this.element = element;
    this.options = options;

    this.count = this.element.dataset['count'] || 0;
    this.element.innerHTML += "<button>Add one</button>";
    this.element.querySelector('button').addEventListener('click', this.buttonClick);
  }

  buttonClick = () => {
    this.count = this.count + 1;
    this.element.querySelector('.count').innerText = this.count;
  }
}
```

For brevity the above code is in ES6, but you can use any class you want. FreudJS creates an instance like this: `new behaviour(element, options = {})`.

You can now tell FreudJS about the behaviour like so:

`Freud.register(IncreaseCount)`

FreudJS now knows this behaviour as 'IncreaseCount'. If you want to use a different name you can do:

`Freud.register('OtherName', IncreaseCount)`

Of course you can also directly declare the behaviour as you pass it to freud:

```js
Freud.register(
  class OttoLoewi {
    constructor(element, options = {}) {
      neurotransmit(element);
    }
  }
)
```

## Applying behaviours

### Data attribute 'behaviours'

By default behaviours can be applied to an element by setting a `data` attribute called `behaviours` on them with the name of the behaviour(s) as the value:

````
 -- HTML:
  <div class='greeting-card' data-behaviours='greetingCard'></div>

 -- Javascript


  $(function() {
    $('[data-behaviours]').freud();
  });
````

### Passing behaviours to freud()

Alternatively you may pass data-attributes to FreudJS by passing an array to FreudJS when selecting elements:

````
-- HTML:
  <div class='greeting-card'></div>

-- Javascript
  // Freud comes with a document.ready implementation, but you can use your own:
  Freud.ready(function() {
    Freud.init(document.querySelector('.greeting-card'), { behaviours: ['greetingCard'] });
  });
````

### Hybrid

You can also use both methods at the same time:

````
-- HTML:
  <div class='greeting-card' data-behaviours='anotherBehaviour'></div>

-- Javascript
  Freud.init(document.querySelector('.greeting-card'), { behaviours: ['greetingCard'] });
````

### Other key

You can also use your own key in case you don't want to use `'behaviours'`:

````
 -- HTML:
  <div class='greeting-card' data-custom-key='greetingCard'></div>

 -- Javascript
  Freud.init('[data-behaviours]', { behaviourKey: 'custom-key' })
````

### More than one behaviour

Apply more than one behaviour to the same element by passing a JSON array as the behaviours value:

````
  <div class='greeting-card' data-behaviours='["GreetingCard", "HelloWorld"]'></div>

  -- Javascript
  Freud.init()
````

You can also apply many behaviours through passing behaviours through the FreudJS function:

````
-- HTML:
  <div class='greeting-card'></div>

-- Javascript
  Freud.init(document.querySelector('.greeting-card'), { behaviours: ['greetingCard', 'anotherBehaviour'] });
````

## Example uses

Some things that I have used behaviours for:

- In a calculations app we have charts displaying the results of calculations. My behaviour sits on the chart's container and opens up the web socket connection to listen for changes to the chart.

- In forms you sometimes have select boxes that manage the values of other select boxes. E.g. 'select country', 'select city'. When you select a country the list of cities changes to display the cities for that country, etc. Instead of binding directly to the first select box, you can manage the code more easily in a behaviour that you put on the whole form. If you use the same pattern more often for different forms you can even apply multiple behaviours:

`<form behaviours='[“CountrySelect”, ”GoogleMaps”]'>`

## Feedback

If you find any bugs or issues please create a ticket here (on github). If you have any questions feel free to e-mail me at the e-mail address contained in the `package.json`.

## Contributing

With regards to bugs and issues, or when you find a killer feature for FreudJS please consider contributing.

### Webpack

FreudJS is written in ES6. You can edit the file in `src` and build it by running the command `npm run build`. Open `spec/test.html` in order to run the specs in your browser and have the library available to you during development. In which case running `npm run dev` is probably useful as it will compile the `freud.js` version for you continuously as you make changes.

Just make sure to add tests and build both the dev and minimal version with `npm run build` when you are done.

Also make sure that all tests are passing by running `npm test`.

## License

--------------

The MIT License (MIT)

Copyright (c) 2017 Achilleas L.D. Buisman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
