//`

document.addEventListener("DOMContentLoaded", function(e) { 
    document.getElementById("searchForm").addEventListener("submit", (e) => {
        let searchQuery = document.getElementById("searchQuery").value;
        getMovies(searchQuery);
        e.preventDefault();
    })
  });


  //let searchButton = document.getElementById("searchButton");
  let displayMovie = document.getElementById("displayMovie");

  function getMovies(searchQuery) {
      //let searchQuery = document.getElementById("searchQuery").value;
      axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=e6b6fe9c&s=" + searchQuery)
      .then((response) => {
          let output = "";
          console.log(response);
          let movies = response.data.Search;

          movies.map((movie) => {
              output += `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="thumbnail">
                        <img src="${movie.Poster}" alt="" class="">
                    </div>
                    <h5>${movie.Title}(${movie.Year})</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#" target="_blank">Movie details</a>
                    </div>
              `
          });
          displayMovie.innerHTML = output;

      })
      .catch(err => console.log(err));
  }

  //searchButton.addEventListener("click", getMovies);


  function movieSelected(id) {
      sessionStorage.setItem("imdbID", id);
      window.location ="movie.html";
      return false;
  }

  function getMovie() {
      let movieId = sessionStorage.getItem("imdbID");

      axios.get("http://www.omdbapi.com/?apikey=e6b6fe9c&i=" + movieId)
      .then((response) => {

          console.log(response);
      })
      .catch(err => console.log(err));
  }