# Funny-nput.JS
## A small JS libraries for adding particles in your input.

![imagename](https://github.com/lnbodle/Funny-nput.JS/blob/main/assets/img/demo.gif)

> :warning: **This is a really early version there is a lot of bugs and the performance may not be good**

[Try the demo here !](https://lnbodle.github.io/Funny-nput.JS/)

Add `particles.json` and `funnynput.js` in your web project.

Import in your Html file like this : 
```Html
<input data-type="ex : particles/exemple" class="input">
<script src="funnynput.js"></script>
```

Create new particle by adding object in `particles.json` like this : 
```Json
"exemple": {
        "rotation": 0,
        "gravity": 0.2,
        "direction": 0.3,
        "speed": 0,
        "life": 200,
        "color": "black"
    }
```

