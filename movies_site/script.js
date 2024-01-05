const apikey = "api_key=d82f58483d59ae1a13735a389e7c7235";
const baseurl = 'https://api.themoviedb.org/3';
const theatre= baseurl + '/discover/movie?primary_release_date.gte=2022-09-15&primary_release_date.lte=2022-10-22&' + apikey;//movies in theatre
const apiurl = baseurl + '/discover/movie?sort_by=popularity.desc&' + apikey;//popular movies
const rated = baseurl + '/discover/movie?primary_release_year=2010&sort_by=vote_average.desc&' + apikey;
const imgurl = 'https://image.tmdb.org/t/p/w500';
const searchurl = baseurl + '/seacrh/movie?' + apikey;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

movie(theatre);

    function movie(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data.results)
                showmovie(data.results);
            })
    }
function showmovie(data) {
    main.innerHTML = '';

    data.forEach(mvi => {
        const { title, poster_path, vote_average, overview } = mvi;
        const movieE1 = document.createElement('div');
        movieE1.classList.add('mvi');
        movieE1.innerHTML = `
                    <img src="${imgurl + poster_path}" alt="${title}"/>
                    <div class="movie-info">
                        <h3>${title}</h3>
                        <span class="${getColor(vote_average)}">${vote_average}</span>
                    </div>
                    <div class="overview">
                        <h3>Overview</h3>
                        ${overview}
                    </div>
        `
            main.appendChild(movieE1);
})
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    
    if (searchTerm) {
        movie(searchurl+'&query='+searchTerm)
    }
})