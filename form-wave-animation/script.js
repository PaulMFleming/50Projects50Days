const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    // get the inner text Eg: Email
    label.innerHTML = label.innerText
    // split it into an array Eg: ["E", "m", "a", "i", "l"]
    .split('')
    // map into a new array where each letter has a <span> around it
    .map((letter, idx) => `<span style="transition-delay:${idx * 75}ms">${letter}</span>`)
    // convert back into a string
    .join('')
})