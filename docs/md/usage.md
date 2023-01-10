<img src="/docs/assets/banner-no-title-grey.svg" style="opacity: .5"/>

<br><br>

# How to Use

graphis is a font you can simply download and install, serve on your website, etc. In any context that the font
setting is set to graphis, you can copy and paste [one of the icons](/) and you're good to go.

Glyphs are mapped to special characters and emojis that do resemble the intended icon, so in cases that the font
is not present, still meaningful content will be displayed.

> graphis is designed around thin strokes, which means it works better alongside text font that has
> also thin strokes. It is recommended to use it alongside font families _light_ or _extra-light_ weights,
> and set text that is immediately adjacent to graphis icons to these weights. I personally recommend
> [Nunito Sans](https://fonts.google.com/specimen/Nunito+Sans) 300 for optimal visual results.


> :Buttons
> > :Button label=📥 download graphis font, url=https://unpkg.com/graphis/font/graphis.ttf


---

## Using the Web Font
```html
<link rel="stylesheet" href="https://esm.sh/graphis/font/graphis.css">
```
```css
font-family: 'graphis', sans-serif;
```

<br><br>

You can use the font on elements that are supposed to only
contain icons:

```css
i {
  font-family: 'graphis', sans-serif;
  font-style: normal;
  font-size: 1.2em;
}
```
```html
<h1><i>👤</i> Account</h1>
```
> <h1><i style="font-style: normal; font-size: 1.2em">👤</i> Account</h1>

<br><br>

You can also use it globally alongside another font family for text:

```css
body, * {
  font-family: 'graphis', 'Nunito Sans', sans-serif;
}
```
```markdown
Now you can have 👤 icons alongside text
<input placeholder="🔍 Or in inputs" type="email"/>
<br>
<button>Or in Buttons 🔒</button>
```
>
> Now you can have 👤 icons alongside text
> <input placeholder="🔍 Or in inputs" type="email"/>
> > :Button label=Or in Buttons 🔒
>

---

> :ToCPrevNext
