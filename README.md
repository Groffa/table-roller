# table-roller

This is a simple [custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) for wrapping existing table elements (i.e. vanilla HTML), to add rolling capabilities to them.

I wrote this primarely for my [RPG blog](https://acornafloat.blogspot.com), to add some interactivity to my random tables. Usually, when I add random tables to a blog post, I edit the HTML to add some Javascript to it, but after having done that a couple of times, I thought I might as well do some proper programming.

## Example

See [example.htm](./example.htm) for some basic examples, with some of the attributes you can use as well for the `<table-roller>` element.

Otherwise, here's a simple example, using an existing table 

```html
<table>
  <tr>
    <td>1d4</td>
    <td>Thing</td>
    <td>Of</td>
    <td>What</td>
  </tr>
  <tr>
    <td>1</td>
    <td>Sword</td>
    <td>with</td>
    <td>teeth</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Axe</td>
    <td>from</td>
    <td>newt</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Dagger</td>
    <td>of</td>
    <td>dullness</td>
  </tr>
  <tr>
    <td>4</td>
    <td>Fork</td>
    <td>of</td>
    <td>truth</td>
  </tr>
</table>
```

(In the example file, I call the first column for a "dice column". I believe there are better and more accurate words for it, but that's where we are now.)

By wrapping this table with `<table-roller>`, two buttons will appear beneath the table: Roll, and Clear.

```html
<table-roller>
  <table>
    ...same as above...
  </table>
</table-roller>
```

And that's pretty much everything needed for this kind of table; the table-roller element defaults to this kind of layout (e.g. with headers and a "dice column"), but if your table for instance lacks a dice column, there are attributes that you can provide to the table-roller to ignore that.

## How to use

I wanted to keep this little element as simple as possible, so there are no exeternal dependencies at all (it's just plain ECMAScript 6 e.g. ES6, with a class).

All you need to do is include the script [table-roller.js](./table-roller.js) in someway. Since the `<table-roller>` element is a custom element, nothing happens if - for some reason - the script can't be loaded (e.g. the page won't break).

Including the script can be done in multiple ways:

 - Include the entirety of the script file in your blog post, inside a script `<script>` tag
   - E.g. `<script>(...full contents of table-roller.js here...)</script>`
 - Download the file and host it yourself somewhere, and include with a `<script>` tag:
   - `<script async defer src="(...your url...)/table-roller.js"></script>`
