import * as fs from 'fs'
export function readfile(filepath: string) {
    const data = fs.readFileSync(filepath, 'utf-8')
    return data
}

export function readJsondataforTestcase(filepath: string, testcasename: string) {
    const data = readfile(filepath)
    return data[testcasename]
}