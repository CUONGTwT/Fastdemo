import React, { useRef, useEffect, useState } from "react";
import useAuth from '../../custom-hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from "../../firebase/config"
import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.jpg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import userIcon from '../../assets/images/user-icon.png'
// import { cartUiActions } from "../../store/shopping-cart/CartUiSlice";
import Loader from '../Loader/Loader'
import "../../styles/header.css";
import { toast, ToastContainer } from "react-toastify";
import toggleCart from "../toggle";
const nav__links = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "My Order",
    path: "/cart ",
  },

];

const Header = () => {
  const profileActionRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const { currentUser } = useAuth()
  console.log("user : ", currentUser)

  const headerRef = useRef(null);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const reduxState = useSelector((state) => state);
  console.log(reduxState);



  // const dispatch = useDispatch();

  // const toggleCart = () => {
  //   dispatch(cartUiActions.toggle());
  // };


  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => window.removeEventListener("scroll");
  }, []);
  const tonggleProfileActions = () => profileActionRef.current.classList.toggle('show_profileActions')
  // logOut => home
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setIsLoading(false)
        toast.success('Đăng xuất thành công')
        setTimeout(() => { navigate("/") }, 500);
      })
      .catch(error => {
        toast.error(error.message)

      })
  }
  return (
    <div> <ToastContainer />
      {isLoading && <Loader />}
      <header className="header" ref={headerRef}>
        <Container>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <Link to='/home'>
                <img src={logo} alt="logo" />
                <h5>Fast Now</h5>
              </Link>
            </div>

            {/* ======== menu ====== */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <NavLink
                    to={item.path}
                    key={index}
                    className={(navClass) =>
                      navClass.isActive ? "active__menu" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* nav  right icons */}
            <div className="nav__right d-flex align-items-center gap-3">
              <span className="cart__icon" onClick={toggleCart}>
                <i class="ri-shopping-basket-line"></i>
                <span className="cart__badge">{totalQuantity}</span>
              </span>

              <div className="profile" >
                <img // if logged in, return photoUrl otherwise return icon
                  src={currentUser ? currentUser.photoURL : userIcon} alt="avatar"
                  onClick={tonggleProfileActions} />
              </div>
              <div className="profile_actions"
                ref={profileActionRef}
                onClick={tonggleProfileActions}>
                { //If you can log in, you will be able to log out
                  currentUser ? (<span style={{ cursor: "pointer" }} onClick={logOut}>Logout</span>) : <div>
                    <Link to="/login">Login</Link>
                  </div>
                }
              </div>
              <span className="mobile__menu" onClick={toggleMenu}>
                <i class="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Container>
      </header>
    </div>
  )

};

export default Header;
