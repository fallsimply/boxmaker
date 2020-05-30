// Constants / Variables
const singleBox = `┌───────────────────┐
│    Single Line    │
└───────────────────┘`
const doubleBox = `╔═══════════════════╗
║    Double Line    ║
╚═══════════════════╝`
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

var output = document.querySelector("pre#output")
var input  = document.querySelector("textarea#boxContent")

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
function center(str, width) {}

/* Creates ASCII BOX
 * @param {string} boxStr - box text
 * @param {string} type - "single" or "double"
 */
function box(boxStr, type) {
	let strArr    = []
	let lineWidth = maxWidth(boxStr)
	
	strArr.push(
		topLine(lineWidth, boxChars[type])
	)
	for (line of boxStr.split("\n")) {
		strArr.push(
			middleLine(lineWidth, boxChars[type], line)
		)
	}
	strArr.push(
		bottomLine(lineWidth, boxChars[type])
	)
	
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
function middleLine(width, chars, str) {
	return `${chars.vertical} ${str +  " ".repeat(width - str.length)} ${chars.vertical}`
}

/* Makes Bottom Line of Box
 * @param {number} width - text width (before padding)
 * @param {Object} chars - "single" or "double" chars object
 */
function bottomLine(width, chars) {
	return `${chars.bottomLeft}${chars.horizontal.repeat(width + 2)}${chars.bottomRight}`
}


document.querySelector("button.makeBox").addEventListener("click", (e) => {
	output.insertAdjacentHTML(
		'beforeend', `<pre>${box(
			input.value, 
			document.querySelector('input[name="boxType"]:checked').value
		)}</pre>`
	)
})