import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link , useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../firebase/config'
import {ToastContainer,toast} from 'react-toastify'
import Loader from "../components/Loader/Loader";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const loginUser = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
    const userCredential= await signInWithEmailAndPassword(auth, email, password)
    
    const user = userCredential.user;
    console.log(user)
    setIsLoading(false);
    toast.success("Đăng nhập thành công...")
    setTimeout(() => {navigate("/home")},500);
    
      } catch (error)  {
        setIsLoading(false);
        toast.error(error.message);
      }
    }
  
  


  return (
    <> <ToastContainer/>
     {isLoading && <Loader />}
    <Helmet title="Sig In">
      <CommonSection title="Sig In" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={loginUser}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Email"
                    required value = {email} onChange = {(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                   type="password"
                   placeholder="Password"
                   required value = {password} onChange = {(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <button type="submit" className="addToCart__btn">
                  Login
                </button>
        
                
              </form>
              <Link to="/register">
              Do not have an account? Sign up now
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  ;
  </>
  )
};

export default Login;