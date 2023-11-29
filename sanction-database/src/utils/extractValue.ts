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


interface AliasData {
    QUALITY: { _text: string };
    ALIAS_NAME: { _text: string };
    NOTE: { _text: string };
    DATE_OF_BIRTH: { _text: string }
}

interface ExtractedAlias {
    quality?: string;
    aliasName?: string;
    note?: string;
    dateOfBirth?: string;
}

export function extractAliasName(data: AliasData[] | AliasData): ExtractedAlias[] {
    const dataArray = Array.isArray(data) ? data : [data];

    const result: ExtractedAlias[] = dataArray.map(item => {
        let data: ExtractedAlias = {}
        if (item.QUALITY) {
            if (item.QUALITY._text) {
                data.quality = item.QUALITY._text
            }
        }
        if (item.ALIAS_NAME) {
            if (item.ALIAS_NAME._text) {
                data.aliasName = item.ALIAS_NAME._text
            }
        }
        if (item.NOTE) {
            if (item.NOTE._text) {
                data.note = item.NOTE._text
            }
        }
        if (item.DATE_OF_BIRTH) {
            if (item.DATE_OF_BIRTH._text) {
                data.dateOfBirth = item.DATE_OF_BIRTH._text
            }
        }

        return data;
    });

    return result.filter(alias => Object.keys(alias).length > 0);
}