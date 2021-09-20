const main = document.querySelector('.main');


fetch(series_list_http + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    data.genres.forEach(item => {
        fetchSeriesListByGenres(item.id, item.name);
    })
});

const fetchSeriesListByGenres = (id, genres) => {
    fetch(series_genres_http + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1
    }))
    .then(res => res.json())
    .then(data => {
        makeCategoryElement(`${genres}_series`, data.results);
    })
    .catch(err =>  console.log(err));
}

const makeCategoryElement = (category, data) => {
    main.innerHTML += `
    <div class="series-list">
        <button class="pre-btn"><img src="img/pre.png" alt=""></button>
        <h1 class="series-category">${category.split("_").join(" ")}</h1>
        <div class="series-container" id="${category}">
        </div>
        <button class="nxt-btn"><img src="img/nxt.png" alt=""></button>
    </div>
    `;
    makeCards(category, data);
}

const makeCards = (id, data) => {
    const seriesContainer = document.getElementById(id);
    data.forEach((item, i) => {
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        }

        seriesContainer.innerHTML += `
        <div class="series" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="series-title">${item.title}</p>
        </div>
        `;

        if(i == data.length - 1){
            setTimeout(() => {
                setupScrolling();
            }, 100);
        }
    })
}
