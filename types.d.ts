interface Queryable {
	querySelector: (selectors: string) => any;
}

interface BoxChars {
    readonly topLeft:  string,
    readonly topRight: string,

	readonly bottomLeft:  string,
    readonly bottomRight: string,
    
	readonly vertical:   string,
	readonly horizontal: string,
}

interface BoxCharsObj {
    readonly single: BoxChars, 
    readonly double: BoxChars,
}

interface boxOptions {
	boxStr: string, 
	type: string, 
	center: boolean, 
	lineWidth: number,
}