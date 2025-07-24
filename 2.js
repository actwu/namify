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
