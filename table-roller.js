/**
 * Adds two buttons below the table it wraps: one button for rolling randomly on the table
 * and outputting the result, and one for clearing the output.
 *
 * Rolling on tables with multiple columns will cause the table roller to roll
 * several times - once per column - and concatenate the output.
 *
 * To use, just wrap a table element, like so:
 * ```
 * <table-roller>
 *  <table>
 *   ...
 *  </table>
 * </table-roller>
 * ```
 *
 * @element table-roller
 * @attr [no-headers=false] Table doesn't contain any headers, so include it as well
 * @attr [no-dice-column=false] First column of table doesn't contain row numbers
 * @attr [output-dice-column=false] Output a dice column as well when rolling
 * @attr [roll-label="Roll"] Label of roll button
 * @attr [clear-label="Clear"] Label of clear button
 * @attr [delim=" "] String to use when combining columns, except if using `glue`
 * @attr [glue=""] Comma separated list of column indexes (starting on 1) that should glue with their next column (e.g. don't use delimeter between this column and the next)
 */
class TableRoller extends HTMLElement {
  static get observedAttributes() {
    return [
      "no-headers",
      "no-dice-column",
      "roll-label",
      "clear-label",
      "output-dice-column",
      "delim",
      "glue",
    ];
  }

  constructor() {
    super();
    this.table = null;
    this.outputPane = null;
    this.outputCounter = 1;
  }

  connectedCallback() {
    if (this.isConnected) {
      const tables = this.querySelectorAll("table");
      if (tables.length === 0) {
        console.warn(
          "The <table-roller> element needs to wrap a <table> (e.g. as a child element), but could not find one."
        );
      } else if (tables.length > 1) {
        console.warn(
          "The <table-roller> element wraps several tables, which is not supported. Wrap each table separately."
        );
      } else {
        this.table = tables[0];
        this.createActions();
      }
    }
  }

  get glue() {
    return (this.getAttribute("glue") ?? "")
      .split(",")
      .map((s) => Number.parseInt(s, 10));
  }

  get outputDiceColumn() {
    return this.hasAttribute("output-dice-column");
  }

  get rollLabel() {
    return this.getAttribute("roll-label") ?? "Roll";
  }

  get clearLabel() {
    return this.getAttribute("clear-label") ?? "Clear";
  }

  get noHeaders() {
    return this.hasAttribute("no-headers");
  }

  get noDiceColumn() {
    return this.hasAttribute("no-dice-column");
  }

  get delim() {
    return this.getAttribute("delim") ?? " ";
  }

  get rows() {
    const query = `tr${this.noHeaders ? "" : ":not(:first-child)"}`;
    return Array.from(this.table.querySelectorAll(query));
  }

  get cols() {
    return this.table.querySelectorAll("tr:first-child td").length;
  }

  get randomAcross() {
    const maxCols = this.cols;
    const allRows = this.rows;
    const startColIndex = this.noDiceColumn ? 0 : 1;
    const gluers = this.glue;
    const standardDelimeter = this.delim;
    let s = "";
    for (let colIndex = startColIndex; colIndex < maxCols; ++colIndex) {
      const rowIndex =
        Math.floor(Math.random() * allRows.length) + (this.noHeaders ? 0 : 1);

      const columnText =
        this.table.querySelector(
          `tr:nth-child(${1 + rowIndex}) td:nth-child(${1 + colIndex})`
        )?.innerText ?? "";

      const delimeter =
        gluers.indexOf(colIndex + 1) < 0 ? standardDelimeter : "";
      s += columnText + delimeter;
    }
    return s;
  }

  rollAction() {
    this.outputPane.append(this.addOutputRow(this.randomAcross));
    this.actionButton(this.clearLabel).style.display = "";
  }

  clearAction() {
    this.outputPane.innerHTML = "";
    this.actionButton(this.clearLabel).style.display = "none";
    this.outputCounter = 1;
  }

  actionButton(label) {
    return this.querySelector(`[data-action="${label}"]`);
  }

  createActions() {
    const toolbar = document.createElement("div");
    toolbar.style.display = "flex";
    toolbar.style.gap = "5px";
    toolbar.append(
      this.addButton(this.rollLabel, this.rollAction.bind(this)),
      this.addButton(this.clearLabel, this.clearAction.bind(this), true)
    );
    this.table.after(toolbar);
    toolbar.after(this.createOutputPane());
    this.outputCounter = 1;
  }

  createOutputPane() {
    this.outputPane = document.createElement("div");
    return this.outputPane;
  }

  addButton(label, cb, hidden = false) {
    const btn = document.createElement("button");
    btn.onclick = cb;
    btn.innerText = label;
    btn.dataset.action = label;
    btn.style.display = hidden ? "none" : "";
    return btn;
  }

  addOutputRow(s) {
    const el = document.createElement("div");
    const prefix = this.outputDiceColumn ? `${this.outputCounter++}. ` : "";
    el.innerText = `${prefix} ${s}`;
    return el;
  }
}
customElements.define("table-roller", TableRoller);
