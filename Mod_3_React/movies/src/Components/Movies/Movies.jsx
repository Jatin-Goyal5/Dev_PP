import React, { Component } from 'react';
import Movie from '../Movie/Movie';
import '../Movies/Movies.css';
class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div className="movies" >
            {
                this.props.movies.map((data)=>{
                    return <Movie key={data.id} movie={data}></Movie>
                })
            }

        </div>
        );
    }
}
 
export default Movies;

