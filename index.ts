// @ts-check
interface Queryable {
	querySelector: (selectors: string) => any;
}
interface BoxChars {
	readonly topLeft:     string,
	readonly bottomLeft:  string,
	readonly topRight:    string,
	readonly bottomRight: string,
	readonly vertical:    string,
	readonly horizontal:  string,
}

const singleBox = `
┌───────────────────┐
│    Single Line    │
└───────────────────┘
`.trim()
const doubleBox = `
╔═══════════════════╗
║    Double Line    ║
╚═══════════════════╝
`.trim()
const boxChars: {single: BoxChars, double: BoxChars} = {
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

const $ = (selector: string, elem: Queryable = document): any => elem.querySelector(selector)

var output = $("pre#output")
var input  = $("textarea#boxContent")


// width of the longest line in a block of text
function maxWidth(str: string = ""): number {
	let width = 0
	let arr   = str.split(/\n/)
	for (let i of arr) {
		if (i.length > width) {
			width = i.length
		}
	}
	return width
}

function center(str: string, width: number): string {
	throw new Error("Center is not Implemented");
}


// Creates ASCII BOX
function box(boxStr: string, type: string): string {
	let strArr    = []
	let lineWidth = maxWidth(boxStr)
	
	strArr.push(
		topLine(lineWidth, boxChars[type])
	)
	for (let line of boxStr.split("\n")) {
		strArr.push(
			middleLine(lineWidth, boxChars[type], line)
		)
	}
	strArr.push(
		bottomLine(lineWidth, boxChars[type])
	)
	
	return strArr.join("<br>")
}


// Makes Top Line of Box
function topLine(width: number, chars: BoxChars): string {
	return `${chars.topLeft}${chars.horizontal.repeat(width + 2)}${chars.topRight}`
}

// Makes Middle Line of Box
function middleLine(width: number, chars: BoxChars, str: string): string {
	return `${chars.vertical} ${str +  " ".repeat(width - str.length)} ${chars.vertical}`
}

// Makes Bottom Line of Box
function bottomLine(width: number, chars: BoxChars): string {
	return `${chars.bottomLeft}${chars.horizontal.repeat(width + 2)}${chars.bottomRight}`
}


$("button.makeBox").addEventListener("click", () => {
	output.insertAdjacentHTML(
		'beforeend', `<pre>${box(
			input.value, 
			$('input[name="boxType"]:checked').value
		)}</pre>`
	)
})