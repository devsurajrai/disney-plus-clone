import React, { useEffect, useState } from "react";
import styled from "styled-components";

import db from "../firebase";

import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  // console.log(id);
  const [movie, setMovie] = useState("No Data Received Yet");
  useEffect(() => {
    db.collection("Movies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc) {
          if (doc.id === id) {
            setMovie(doc.data());
          }
        }
      });
    });
  }, []);
  console.log(movie);

  return (
    <Container>
      <Background>
        <img src={movie.BackgroundImg} alt="" />
      </Background>
      <ImageTitle>
        <img src={movie.TitleImg} alt="" />
      </ImageTitle>
      <Controls>
        <PlayButton>
          <img src="/images/play-icon-black.png" alt="" />
          <span>PLAY</span>
        </PlayButton>
        <TrailerButton>
          <img src="/images/play-icon-white.png" alt="" />
          <span>Trailer</span>
        </TrailerButton>
        <AddButton>
          <span>+</span>
        </AddButton>
        <GroupWatchButton>
          <img src="/images/group-icon.png " alt="" />
        </GroupWatchButton>
      </Controls>
      <SubTitle>
        {/* <span>{movie.Title}</span>
        <br /> */}
        <span>{movie.Genres}</span>
      </SubTitle>
      <Description>{movie.Description}</Description>
    </Container>
  );
}

export default Detail;

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  opacity: 0.8;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
const ImageTitle = styled.div`
  margin-top: 60px;
  height: 30vh;
  width: 35vw;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
  margin-top: 30px;
`;

const PlayButton = styled.button`
  border-radius: 4px;
  font-size: 15px;
  display: flex;
  align-items: center;
  height: 56px;
  background: rgb(249, 249, 249);
  border: none;
  padding: 0 24px;
  margin-right: 22px;
  letter-spacing: 1.8px;
  cursor: pointer;

  &:hover {
    background: rgb(198, 198, 198);
  }
`;
const TrailerButton = styled(PlayButton)`
  border: 2px solid rgb(249, 249, 249);
  background: rgba(0, 0, 0, 0.3);
  color: rgb(249, 249, 249);
  text-transform: uppercase;
  &:hover {
    background: rgb(198, 198, 198);
  }
`;
const AddButton = styled.button`
  display: flex;
  border-radius: 50px;
  width: 44px;
  height: 44px;
  background: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(249, 249, 249);
  margin-right: 16px;
  cursor: pointer;
  span {
    color: rgb(249, 249, 249);
    font-size: 30px;
  }
`;
const GroupWatchButton = styled(AddButton)`
  background: rgb(0, 0, 0);
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
`;
const Description = styled.p`
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
  max-width: 500px;
`;
