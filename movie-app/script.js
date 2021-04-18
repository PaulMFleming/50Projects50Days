const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7fb0d67f1b3d6f5bb77ae14709d2a521&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=7fb0d67f1b3d6f5bb77ae14709d2a521&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

// define async function getMovies
async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}


// populate DOM with relevant info
function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {
            title,
            poster_path,
            vote_average,
            overview
        } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}"
                alt="${title}">
            <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
        <h3>Overview</h3>
            ${overview}
            </div>
        `

        main.appendChild(movieEl)
    })
}


// decide on color for rating
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}


// search API for relevant search term
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})