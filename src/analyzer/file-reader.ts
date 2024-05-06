export const readFile = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (r) => {
            if (r.target?.result) {
                resolve(r.target.result.toString())
            } else {
                reject(new Error('Failed to read file.'))
            }
        }

        reader.readAsText(file)
    })
}
