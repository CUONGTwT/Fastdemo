import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { auth } from "../firebase/config";
import { storage } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../custom-hooks/useAuth";

const Register = () => {
  const { setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      return toast.error("Password không giống nhau");
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          toast.error(error.massage);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // cập nhật user
            await updateProfile(user, {
              photoURL: downloadURL,
            });
            //user sẽ được lưu data vào firebase database có thể chỉnh xửa thông tin
            await setDoc(doc(db, "user", user.uid), {
              uid: user.uid,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
      console.log(user);
      setIsLoading(false);
      toast.success("Đăng kí thành công...");
      setCurrentUser(user)
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <Helmet title="Sig up ">
        <CommonSection title="Sig up" />
        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12" className="m-auto text-center">
                <form className="form mb-5" onSubmit={registerUser}>
                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={cPassword}
                      onChange={(e) => setCPassword(e.target.value)}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>

                  <button type="submit" className="addToCart__btn">
                    Sig Up
                  </button>
                </form>
                <Link to="/login">Do you already have an account? log in now</Link>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default Register;
