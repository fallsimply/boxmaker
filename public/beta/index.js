// Constants
const defaults = {
	single: `┌───────────────────┐
│    Single Line    │
└───────────────────┘`,
	double: `╔═══════════════════╗
║    Double Line    ║
╚═══════════════════╝`,
	input: `multiline
hello
world`
}
const boxChars = {
	single: {
		topLeft:     "┌",
		bottomLeft:  "└",
		topRight:    "┐",
		bottomRight: "┘",
		vertical:    "│",
		horizontal:  "─",
	},
	double: {
		topLeft:     "╔",
		bottomLeft:  "╚",
		topRight:    "╗",
		bottomRight: "╝",
		vertical:    "║",
		horizontal:  "═",
	}
}
const io = {
	// Static
	in:       $('textarea#boxContent'),
	out:      $('pre#output'),
	single:   $('label[for="single"] pre'),
	double:   $('label[for="double"] pre'),
	colWidth: $('input[name="colWidth"]'),
	
	// Dynamic 	
	type:        () => $('input[name="boxType"]:checked'),
	center:      () => $('mk-switch.center'),
	useColWidth: () => $('mk-switch.useColWidth'),
}

const debug = window.location.search.includes("debug")

// Helpers

function $(ele) {
	return document.querySelector(ele)
}
function $ready (func) {
	document.addEventListener("DOMContentLoaded", func, false)
}

/* width of the longest line in a block of text
 * @param {string} str - text block with line breaks
 * @return {number} maxWidth - width of longest line
 */
function maxWidth(str = "") {
	var width = 0
	var arr   = str.split(/\n/)
	for (let i of arr) {
		if (i.length > width) {
			width = i.length
		}
	}
	return width
}

/* Centers Text
 * @param {string} str - text
 * @param {number} width - column width
 * @return {string} text - centered text
 */
function center(str, width) {
	width -= str.length
	let padStart = Math.floor(width / 2)
	let padEnd = width - padStart
	return `${" ".repeat(padStart)}${str}${" ".repeat(padEnd)}`
}

/* Creates ASCII BOX
 * @param {string} boxStr - box text
 * @param {string} type - "single" or "double"
 */
function box({input, type, center = false, lineWidth = 0}) {
	let strArr = []
	if (lineWidth == 0) {
		lineWidth = maxWidth(input)
	}
	lineWidth = Number(lineWidth)
	console.log(center)
	
	strArr.push(topLine(lineWidth, boxChars[type]))
	for (line of input.split("\n")) {
		strArr.push(middleLine(lineWidth, boxChars[type], line, center))
	}
	strArr.push(bottomLine(lineWidth, boxChars[type]))
	
	return strArr.join("<br>")
}

/* Makes Top Line of Box
 * @param {number} width - text width (before padding)
 * @param {Object} chars - "single" or "double" chars object
 */
function topLine(width, chars) {
	return `${chars.topLeft}${chars.horizontal.repeat(width + 2)}${chars.topRight}`
}

/* Makes Middle Line of Box
 * @param {number} width - text width (before padding)
 * @param {Object} chars - "single" or "double" chars object
 * @param {string} str - line in box
 */
function middleLine(width, chars, str, centerText) {
	text = centerText 
		? center(str, width) 
		: `${str}${" ".repeat(width - str.length)}`
	return `${chars.vertical} ${text} ${chars.vertical}`
}

/* Makes Bottom Line of Box
 * @param {number} width - text width (before padding)
 * @param {Object} chars - "single" or "double" chars object
 */
function bottomLine(width, chars) {
	console.log(chars.horizontal.repeat(Number(width) + 2).length)
	return `${chars.bottomLeft}${chars.horizontal.repeat(width + 2)}${chars.bottomRight}`
}


document.querySelector("button.makeBox").addEventListener("click", (e) => {
	output.insertAdjacentHTML(
		'beforeend', `<pre>${box({
			input: io.in.value, 
			type:  io.type().value,
			center: io.center().checked,
			lineWidth: io.useColWidth().checked 
					 ? io.colWidth.value 
					 : 0
		})}</pre>`
	)
	if (!io.useColWidth().checked || io.colWidth.value == "") {
		io.colWidth.value = maxWidth(io.in.value)
	}
})

$ready(() => { 	
	io.useColWidth().addEventListener('toggle', (e) => {
		if (debug) {
			output.insertAdjacentHTML('beforeend', 
				`Col Width Enabled: ${!io.colWidth.disabled}` + "\n" +
				`Gonna Be Disabled: ${e.target.checked}` + "\n\n")
		}
		io.colWidth.disabled = !e.target.checked
	})
})

io.single.innerText = defaults.single
io.double.innerText = defaults.double
io.in.value = defaults.input