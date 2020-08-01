// @ts-check

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

const boxChars: BoxCharsObj = {
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
const pad = {
	left: (str: string, width: number) => str +  " ".repeat(width - str.length)
}

const $ = (selector: string, elem: Queryable = document): any => elem.querySelector(selector)

var output: HTMLElement      = $("pre#output")
var input:  HTMLInputElement = $("textarea#boxContent")


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

function box({boxStr, type, center = false, lineWidth = -1}: boxOptions): string {
	let strArr    = []
	if (lineWidth <= 0) {
		lineWidth = maxWidth(boxStr)
	}
	let chars = boxChars[type]
	
	strArr.push(
		topLine(lineWidth, chars)
	)
	boxStr.split("\n").forEach(line => strArr.push(
		middleLine(lineWidth, chars, line)
	))
	strArr.push(
		bottomLine(lineWidth, chars)
	)
	
	return strArr.join("<br>")
}

const topLine    = (width : number, chars : BoxChars) : string => `${chars.topLeft}${chars.horizontal.repeat(width + 2)}${chars.topRight}`
const middleLine = (width : number, chars : BoxChars, str : string) : string => `${chars.vertical} ${pad.left(str, width)} ${chars.vertical}`
const bottomLine = (width : number, chars : BoxChars) : string => `${chars.bottomLeft}${chars.horizontal.repeat(width + 2)}${chars.bottomRight}`


$("button.makeBox").addEventListener("click", () => {
	let radio: HTMLInputElement = $('input[name="boxType"]:checked')
	output.insertAdjacentHTML(
		'beforeend', `<pre>${box({
			boxStr: input.value, 
			type: radio.value,
			lineWidth: 0,
			center: true,
		})}</pre>`
	)
})

$(`label[for="single"] pre`).innerText = singleBox
$(`label[for="double"] pre`).innerText = doubleBox
input.value = `multiline
sample
text`