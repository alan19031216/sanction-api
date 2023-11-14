type TextObject = {
    _text: string;
};

export function extractText(input: TextObject | TextObject[]): string[] {
    if (Array.isArray(input)) {
        // Case 2: Array of objects
        return input.map(item => item._text);
    } else {
        // Case 1: Single object
        return [input._text];
    }
}

export function extractDate(input: TextObject | TextObject[]): Date[] {
    if (Array.isArray(input)) {
        // Case 2: Array of objects
        return input.map(item => new Date(item._text));
    } else {
        // Case 1: Single object
        return [new Date(input._text)];
    }
}
