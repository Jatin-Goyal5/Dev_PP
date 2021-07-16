import React, { Component } from "react";
import Movies from "./Components/Movies/Movies.jsx";
import Header from "./Components/header/Header.jsx";
import Favourite from "./Components/Favourite/Favourite.jsx";
import MoviePage from "./Components/MoviePage/MoviePage.jsx";
import axios from "axios";
import { API_KEY, API_URL } from "./API/secret.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class App extends Component {
  state = {
    moviesData: [],
    currentMovie: "batman",
  };

  async componentDidMount() {
   

    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: this.state.currentMovie },
    });
    let moviesData = data.data.results;
    this.setState({
      moviesData: moviesData,
    });
  }

  setMovies = async (newMovieName) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: newMovieName },
    });

    let newMoviesData = data.data.results;
    this.setState({
      moviesData: newMoviesData,
      currentMovie: newMovieName,
    });
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Header setMovies={this.setMovies}></Header>

          <Switch>
            <Route path="/" exact>
              <Movies movies={this.state.moviesData}></Movies>
            </Route>

            <Route path="/fav" exact>
              <Favourite></Favourite>
            </Route>

            <Route path="/moviepage" exact component={MoviePage}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
