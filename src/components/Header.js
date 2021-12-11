/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setSignOut,
} from "../features/user/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase";

function Header() {
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        navigate("/");
      } else navigate("/login");
    });
  }, []);

  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      console.log(result.user);
      let user = result.user;
      dispatch(
        setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      // navigate("/");
    });
  };
  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      navigate("/login");
    });
  };
  let navMenuIcons = [
    { name: "HOME", fileName: "home-icon.svg" },
    { name: "SEARCH", fileName: "search-icon.svg" },
    { name: "WATCHLIST", fileName: "watchlist-icon.svg" },
    { name: "ORIGINALS", fileName: "original-icon.svg" },
    { name: "MOVIES", fileName: "movie-icon.svg" },
    { name: "SERIES", fileName: "series-icon.svg" },
  ];

  return (
    <Nav>
      <Logo src="/images/logo.svg" />
      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <NavMenu>
          <MenuContainer>
            {navMenuIcons.map((item) => {
              if (item.name === "HOME") {
                return (
                  <a key={item.name}>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={"/"}
                    >
                      <img src={`/images/${item.fileName}`} alt="" />
                      <span>{item.name}</span>
                    </Link>
                  </a>
                );
              }
              return (
                <a key={item.name}>
                  <img src={`/images/${item.fileName}`} alt="" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </MenuContainer>

          <UserImg onClick={signOut} src={userPhoto} />
        </NavMenu>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.div`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0px 36px;
  overflow-x: hidden;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
    }
    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  cursor: pointer;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: black;
    border-color: transparent;
  }
`;

const LoginContainer = styled.div`
   {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }
`;
const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
