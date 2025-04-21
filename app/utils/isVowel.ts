export default function isVowel(char?: string) {
    return !!char && ['a', 'e', 'i', 'o', 'u'].includes(char)
}
