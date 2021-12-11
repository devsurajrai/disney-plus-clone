import React from "react";
import styled from "styled-components";
import { selectMovies } from "../features/movie/movieSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Movies() {
  const moviesDB = useSelector(selectMovies);

  //for removing duplicate data from the movie array fetched from firestore
  let removeDuplicates = (originalDB) => {
    let db = [...originalDB];
    let noDuplicatesDB = [];
    let cache = {};
    for (let i = 0; i < db.length; i++) {
      if (!cache[db[i].CardImg]) {
        cache[db[i].CardImg] = db[i];
        noDuplicatesDB.push(cache[db[i].CardImg]);
      }
    }
    return noDuplicatesDB;
  };
  let movies = removeDuplicates(moviesDB);

  //for getting movie types from  the movie data

  let getMoviesTypes = () => {
    let moviesCollection = [...movies];
    let types = [];
    moviesCollection.forEach((movie) => {
      if (!types.includes(movie.type)) {
        types.push(movie.type);
      }
    });
    return types;
  };
  let types = getMoviesTypes();

  return (
    <Container>
      {movies &&
        types.map((type, index) => {
          return (
            <div key={index}>
              <h3>{type.toUpperCase()}</h3>
              <Content>
                {movies.map((movie) => {
                  if (movie.type === type) {
                    return (
                      <Wrap key={movie.id} path={movie.id}>
                        <Link to={`/detail/${movie.id}`}>
                          <img src={movie.CardImg} alt="" />
                        </Link>
                      </Wrap>
                    );
                  }
                })}
              </Content>
            </div>
          );
        })}
    </Container>
  );
}

export default Movies;

const Container = styled.div``;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 20px 0px;
`;
const Wrap = styled.div`
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: 0px 26px 30px -10px rgb(0 0 0 / 69%),
    0px 16px 10px -10px rgb(0 0 0 / 73%);
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 26px 30px -10px rgb(0 0 0 / 69%);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;
