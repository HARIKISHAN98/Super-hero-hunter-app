// its make a favourites movie array if its not exist in local storage
if (localStorage.getItem("favouritesList") == null) {
    localStorage.setItem("favouritesList", JSON.stringify([]));
}

async function fetchMoviesFromApi(url, value) {
    const response = await fetch(`${url + value}`);
    const meals = await response.json();
    return meals;
}

// its show's all movies card in main acording to search input value
async function showMovieList() {
    let inputValue = document.getElementById("my-search").value;
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let url = `https://superheroapi.com/api.php/3071624346492008/search/`
    let html = "";
    // let movies = fetchMoviesFromApi(url, inputValue);
    let response = await fetch(url + inputValue);
    let result = await response.json();
    let movies = result.results;
    // console.log(inputValue);
    console.log(movies);

    for (let movie of movies) {
        let isFav = false;
        let id = movie.id;
        // console.log(id);
        if (movie) {
            for (let index = 0; index < arr.length; index++) {
                if (arr[index] == id) {
                    isFav = true;
                }
            }
            if (isFav) {
                html += `
            <div id="card" class="card mb-3" style="width: 20rem;">
                <img src="${movie.image.url
                    }" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${movie.name}</h5>
                    <div class="d-flex justify-content-between mt-5">
                        <button type="button" class="btn btn-outline-light" onclick="showMovieDetails('${id}')">More Details</button>
                        <button id="main${id}" class="btn btn-outline-light active" onclick="addRemoveToFavList('${id}')" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                    </div>
                </div>
            </div>
            `;
            } else {
                html += `
                    <div id="card" class="card mb-3" style="width: 20rem;">
                        <img src="${movie.image.url
                    }" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${movie.name}</h5>
                            <div class="d-flex justify-content-between mt-5">
                                <button type="button" class="btn btn-outline-light" onclick="showMovieDetails('${id}')">More Details</button>
                                <button id="main${id}" class="btn btn-outline-light" onclick="addRemoveToFavList('${id}')" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                            </div>
                        </div>
                    </div>
                    `;
            }
        } else {
            html += `
                <div class="page-wrap d-flex flex-row align-items-center">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-12 text-center">
                                <span class="display-1 d-block">404</span>
                                <div class="mb-4 lead">
                                    The movie you are looking for was not found.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
        }
        let movieListItem = document.querySelectorAll("#card");
        // console.log(movieListItem);
        // movieListItem.dataset.id = movie.id;
        document.getElementById("main").innerHTML = html;
    }
} 
//its shows full movie details in main
async function showMovieDetails(id) {
    let url = ( `https://superheroapi.com/api.php/3071624346492008/${id}`);
    let html = "";

    const response = await fetch(`${url}`);
    let result = await response.json();
    console.log(result);
    let movies = result;
    // for(let movie of movies){
    if(result.response === 'success'){    
        html += `
        <div class = "movie-poster">
            <img src = "${(movies.image.url != "N/A") ? movies.image.url : "image_not_found.png"}" alt = "movie poster">
        </div>
        <div class = "movie-info">
            <h3 class = "movie-title">${movies.name}</h3>
            <h4>Power States</h4>
            <ul class = "movie-misc-info">
                <li class = "year">Intelligence: ${movies.powerstats.intelligence}</li>
                <li class = "rated">Strength: ${movies.powerstats.strength}</li>
                <li class = "released">Speed: ${movies.powerstats.speed}</li>
                <li class = "year">Durability: ${movies.powerstats.durability}</li>
                <li class = "rated">Power: ${movies.powerstats.power}</li>
                <li class = "released">Combat: ${movies.powerstats.combat}</li>
            </ul>
            <h4>Details</h4>
            <p class = "genre"><b>Base:</b> ${movies.work.base}</p>
            <p class = "writer"><b>Publisher:</b> ${movies.biography.publisher}</p>
            <p class = "actors"><b>Alignment: </b>${movies.biography.alignment}</p>
            <p class = "genre"><b>Aliases:</b> ${movies.biography.aliases}</p>
            <p class = "writer"><b>Place-of-birth:</b> ${movies.biography["place-of-birth"]}</p>
            <p class = "actors"><b>Occupation: </b>${movies.work.occupation}</p>
         </div>
        `
            ;
    }
    document.getElementById("main").innerHTML = html;
}



// its shows all favourites movies in favourites body
async function showFavMovieList() {
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    console.log(arr);
    let html = "";
    if (arr.length == 0) {
        html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                No movie added in your favourites list.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    } else {
        for (let index = 0; index < arr.length; index++) {
            let url = ( `https://superheroapi.com/api.php/3071624346492008/${arr[index]}`);
            const response = await fetch(`${url}`);
            let result = await response.json();
            let movie = result;
            if(movie.response === 'success'){
                html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${movie.image.url}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${movie.name}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-outline-light" onclick="showMovieDetails('${movie.id}')">More Details</button>
                            <button id="main${movie.id}" class="btn btn-outline-light active" onclick="addRemoveToFavList('${movie.id}')" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
        }
    }

} 
document.getElementById("favourites-body").innerHTML = html;
}


//its adds and remove movies to favourites list
function addRemoveToFavList(id) {
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let contain = false;
    for (let index = 0; index < arr.length; index++) {
        if (id == arr[index]) {
            contain = true;
        }
    }
    if (contain) {
        let number = arr.indexOf(id);
        arr.splice(number, 1);
        alert("your movie removed from your favourites list");
    } else {
        arr.push(id);
        alert("your movie add your favourites list");
    }
    localStorage.setItem("favouritesList", JSON.stringify(arr));
    showMovieList();
    showFavMovieList();
}

