select=(q)=>document.querySelector(q)

process = () => {
    v = select('textarea').value
    n = v
        .split('\n')
        .map(x => x.trim())
        .filter(x => x)
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })) // case-insensitive sort

    rows = ''
    i = 1
    for (name of n) {
        rows += `<row><name-id>${i}</name-id><name-text>${name}</name-text></row>`
        i++
    }

    select('screen[step=input]').removeAttribute('show')
    select('screen[step=output]').setAttribute('show', '')
    select('list').innerText = ''
    select('list').insertAdjacentHTML('beforeend', rows)
}


save = () => {
    const rows = select('list').querySelectorAll('row')
    const lines = []

    rows.forEach(row => {
        const id = row.querySelector('name-id')?.innerText.trim()
        const name = row.querySelector('name-text')?.innerText.trim()
        if (id && name) {
            lines.push(`${id}. ${name}`)
        }
    })

    const total = lines.length
    const output = `${lines.join('\n')}\n\nTotal: ${total}`

    const b = new Blob([output], { type: 'text/plain' })
    const l = document.createElement('a')
    l.href = URL.createObjectURL(b)
    l.download = 'names.txt'
    l.click()
}
