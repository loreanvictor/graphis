<img src="/docs/assets/banner-design-guidelines.svg"/>

<br><br>

# Design Guidelines

Imagine drawing and icon with a pen. You don't want to close up any loops,
and you want to minimize the number of times you have to raise the pen from the paper.
The resulting look and feel is what defines graphis icons.

<br>

In order to achieve this feel:

- Icons are combination of thin strokes.
- Icons have no closed paths.
- Icons have the least number of strokes possible.
- Corners are generally not super sharp.

<br>

> :DarkLight
> > :InDark
> >
> > ![look and feel](/docs/assets/look-and-feel-dark.svg)
>
> > :InLight
> >
> > ![look and feel](/docs/assets/look-and-feel-light.svg)

<br>

<b style="font-size: 24px; vertical-align: -2px; display: inline-block">ℹ</b> &nbsp; **IMPORTANT**

Visual clarity and readability of icons are always more important than aesthetics.
If visual noise of a continuous stroke clutters the icon on smaller sizes, use
multiple strokes. For example, the quote icon <b>∂</b> is broken into two strokes,
the light bulb icon <b>💡</b> into three and the GIF icon <b>🕺</b> into four, for increased
readability and familiarity.

<br>

![examples of multiple strokes](/docs/assets/multiple-strokes-examples.svg)

---

<br>

## Grid & Keylines

Each icon is designed using a 128❌128px grid with established keylines, towards which the strokes
typically are aligned. You can download this grid [here](https://github.com/loreanvictor/graphis/raw/main/docs/assets/grid.svg), alternatively, you can
find it as a symbol in the [standard sketch file](https://github.com/loreanvictor/graphis/raw/main/design/graphis.sketch) used for designing the icon font.

> :Buttons
>
> > :Button label=📥 Grid & Keylines, url=https://github.com/loreanvictor/graphis/raw/main/docs/assets/grid.svg
>
> > :Button label=📥 Sketch File, url=https://github.com/loreanvictor/graphis/raw/main/design/graphis.sketch

<br><br>

<div style="text-align: center">
  <img src="/docs/assets/grid.svg" width="384px"/>
</div>

<br><br>

Key points of strokes should be centered on intersection points of grid lines and keylines, including terminal points.
Strokes should follow (or be parallel to) grid lines or key lines whenever possible.

<br>

> :DarkLight
> > :InLight
> >
> > ![how to use grid lines](/docs/assets/gridline-usage-light.svg)
>
> > :InDark
> >
> > ![how to use grid lines](/docs/assets/gridline-usage-dark.svg)

<br>

When need be, key points of a stroke can also be placed on midpoints between
two adjacent key lines. The distance between two adjacent grid lines
is 8px, so mid points will be 4px from center point of a grid line.

<br>

> :DarkLight
> > :InLight
> >
> > ![grid lines mid points](/docs/assets/gridline-usage-midpoints-light.svg)
>
> > :InDark
> >
> > ![grid lines mid points](/docs/assets/gridline-usage-midpoints-dark.svg)



<br>

---

<br>

## Boundaries

Icons are exported from a 116❌116px frame centered on the grid. All strokes should be contained
within this frame, considering various potential stroke widths.

<br>

- For circular icons, the boundary area is the outer-most radial key line of the grid (circle of 58px radius centered on the grid), which, assuming a maximum stroke width of 8px, means stroke key points should not be placed farther than 54px radially from grid center.

<br>

- For square icons, the boundary area is the 112❌112px square centered on the grid, which assuming a maximum stroke width of 8px, means
stroke key points should maximally be placed on the 96❌96px square grid line.

<br>

![boundaries](/docs/assets/boundaries.svg)

<br>

Icons should generally fill up the space as much as possible.
Icons might appear alongside alphabetical characters, so they should try to touch the baseline,
which is the bottom most horizontal grid line. It is also recommended that icons be placed symmetrically
within the grid, so that they appear in a balanced manner.

Here are some recommended boundaries and maximal grid / key lines for various icon styles:

<br>

![variational boundaries](/docs/assets/boundaries-variations.svg)

<br>

---

<br>

## Stroke Widths & Spacing

Icons should be designed with three stroke widths corresponding to three weights: light, corresponding to 3px width,
regular, corresponding to 5px width, and bold, corresponding to 8px width.

> :DarkLight
> > :InLight
> >
> > ![how to use grid lines](/docs/assets/stroke-width-light.svg)
>
> > :InDark
> >
> > ![how to use grid lines](/docs/assets/stroke-width-dark.svg)

These stroke widths should be considered so that separate lines and strokes do not overlap in a weight where they should not.
For example, center points of parallel or semi-parallel lines should have a distance of at least one and a half gridlines (12px),
so that in maximum weight, the lines are still separated by half a stroke (4px). Similarly, edge of a line should at least
be 8px from the center of a nearby perpendicular line.

> :DarkLight
> > :InLight
> >
> > ![how to use grid lines](/docs/assets/spacing-light.svg)
>
> > :InDark
> >
> > ![how to use grid lines](/docs/assets/spacing-dark.svg)

> :ToCPrevNext