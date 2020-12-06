
/*
document.addEventListener("DOMContentLoaded", function() { ` 
    
  });
  */

  /*$(document).ready(() => {
      $("#searchForm").on("submit", (e) => {
        let searchQuery = $("#searchQuery").val();
        getMovies(searchQuery)
        e.preventDefault();
      });
  });
  */

  /*let searchButton = document.getElementById("searchButton");*/
  let displayMovie = document.getElementById("displayMovie");
  let apiKey = "e6b6fe9c"

  function getMovies(e) {
    let searchQuery = $("#searchQuery").val();
      axios.get("https://www.omdbapi.com/?i=tt3896198&apikey=" + apiKey + "&s=" + searchQuery)
      .then((response) => {
          let output = "";
          console.log(response);
          let movies = response.data.Search;

          movies.map((movie) => {
              output += `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="thumbnail">
                        <img src="${movie.Poster}" alt="" class="" onclick="movieSelected('${movie.imdbID}')">
                    </div>
                    <h5>${movie.Title}(${movie.Year})</h5>
                    </div>
              `
              //movie details button <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="movie.html" target="_blank">Movie details</a>
          });
          //displayMovie.innerHTML = output;
          $("#displayMovie").html(output);
          e.preventDefault()

      })
      .catch(err => {
          console.log(err)
          handleError();
        });
  }

  searchButton.addEventListener("click", getMovies);


  /*let singleMovie = document.getElementById("singleMovie"); */

  function handleError() {
    window.location ="error.html";
    return false
  }

  function movieSelected(id) {
      sessionStorage.setItem("imdbID", id);
      window.location ="movie.html";
      return false;
  }

  function getMovie() {
      let movieId = sessionStorage.getItem("imdbID");

      axios.get("https://www.omdbapi.com/?apikey=e6b6fe9c&i=" + movieId)
      .then((response) => {
          console.log(response);
          let movie = response.data;

          let output = `

            <div class="row">
                <div class="col-md-12 col-lg-4">
                    <img src="${movie.Poster}">
                </div>
                <div class="col-md-12 col-lg-8 rounded">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item">Genre: ${movie.Genre}</li>
                        <li class="list-group-item">Language: ${movie.Language}</li>
                        <li class="list-group-item">Runtime: ${movie.Runtime}</li>
                        <li class="list-group-item">Actors: ${movie.Actors}</li>
                        <li class="list-group-item">Rating: ${movie.imdbRating} (${movie.imdbVotes} votes)</li>
                        <br>
                        <br>
                        <h3>Plot</p>
                        <p>${movie.Plot}</p>
                    </ul>
                </div>
            </div>

            <div class="row">
            </div>
          
          `
        $("#movie").html(output);
      })
      .catch(err => {
          console.log(err)
          handleError();
        
    });
  }
