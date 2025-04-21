const regex = /\s[\\?:!]/g
function replace(match: string) {
    // eslint-disable-next-line no-irregular-whitespace
    return ` ${match.trim()}`
}

function searchReplaceInDom(
    element: Node,
    pattern: RegExp,
    replacement: (match: string) => string,
) {
    for (const node of element.childNodes) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                searchReplaceInDom(node, pattern, replacement)
                break
            case Node.TEXT_NODE:
                if (node.textContent) {
                    node.textContent = node.textContent.replace(pattern, replacement)
                }
                break
            case Node.DOCUMENT_NODE:
                searchReplaceInDom(node, pattern, replacement)
        }
    }
}

function typoFixInString(input: string) {
    return input.replace(regex, replace)
}
function typoFixInElement(element: Element) {
    return searchReplaceInDom(element, regex, replace)
}

export function typoFix(element: Element): void
export function typoFix(input: string): string
export function typoFix(target: string | Element): string | void {
    if (typeof target === 'string') {
        return typoFixInString(target)
    }
    else {
        return typoFixInElement(target)
    }
}
