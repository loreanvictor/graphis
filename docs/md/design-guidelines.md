<img src="/docs/assets/banner-design-guidelines.svg"/>

<br><br>

# Design Guidelines

Imagine designing your app icons with a pen. You don't want to close up any loops,
and you want to minimize the number of times you have to raise the pen from the paper.
The resulting look and feel is what defines graphis icons.

<br>

In order to achieve this feel:

- Icons are combination of thin strokes.
- Icons have no closed paths.
- Icons have the least number of strokes possible.
- Corners are generally smooth (as they would in natural pen movement).

<br>

![look and feel](/docs/assets/look-and-feel.svg)

<br>

<b style="font-size: 24px; vertical-align: -2px; display: inline-block">ℹ</b> &nbsp; **IMPORTANT**

Visual clarity and readability of icons are always more important than aesthetics.
If visual noise of a continuous stroke clutters the icon on smaller sizes, use
multiple strokes. For example, the quote icon <b>∂</b> is broken into two strokes,
the light bulb icon <b>💡</b> into three and the GIF icon <b>🕺</b> into six, for increased
readability and familiarity.

<br>

![examples of multiple strokes](/docs/assets/multiple-strokes-examples.svg)

---

<br>

## Grid & Keylines

Each icon is designed using a 128❌128px grid with established keylines, towards which the strokes
typically aligned. You can download this grid [here](https://github.com/loreanvictor/graphis/raw/docs/assets/grid.svg), alternatively, you can
find it as a symbol in the [standard sketch file](https://github.com/loreanvictor/graphis/raw/main/design/graphis.sketch) used for designing the icon font.

> :Buttons
>
> > :Button label=📥 Grid & Keylines, url=https://github.com/loreanvictor/graphis/raw/docs/assets/grid.svg
>
> > :Button label=📥 Sketch File, url=https://github.com/loreanvictor/graphis/raw/main/design/graphis.sketch

<br><br>

<div style="text-align: center">
  <img src="/docs/assets/grid.svg" width="384px"/>
</div>

<br><br>

Key points of strokes should be placed on the center point of crossing of grid lines. Strokes themselves
should be aligned on grid lines or key lines whenever possible.
If a stroke were to have the same width as the grid line, it would completely cover the overlapping
section of the grid line. When a stroke is cut, the end point of the path should be placed
at the center point of the crossing of grid lines, not at the edge.

<br>

![how to use grid lines](/docs/assets/gridline-usage.svg)

<br>

When need be, key points of a stroke can also be placed at the middle point between
two adjacent key lines. The distance between center points of two adjacent key lines
are 8px, so mid points will be 4px horizontal or vertical from center point of a key line.

<br>

![grid lines mid points](/docs/assets/gridline-usage-midpoints.svg)

<br>

---

<br>

## Boundaries

Icons are exported from a 116❌116px frame centered on the grid. All strokes should be contained
within this frame, considering various potential stroke widths.

<br>

- For circular icons, the boundary area is the outer-most radial key line of the grid (circle of 116px radius centered on the grid), which, assuming a maximum stroke width of 8px, means stroke key points should maximally be placed on a circle of 108px radius centered on the grid.

<br>

- For square icons, the boundary area is the 112❌112px square centered on the grid, which assuming a maximum stroke width of 8px, means
stroke key points should maximally be placed on the 96❌96px square grid line.

<br>

![boundaries](/docs/assets/boundaries.svg)

<br>

Icons should fill up the space as much as possible, unless their general shape or tone is to be different. Since
icons might appear alongside alphabetical characters, it is recommended to ensure they visually touch the baseline,
which is the bottom most maximal grid line of square icons. It is also recommended that icons be placed symmetrically
within the grid, so that they appear in a balanced manner.

Here are some recommended boundaries for various icon styles:

![variational boundaries](/docs/assets/boundaries-variations.svg)

> :ToCPrevNext