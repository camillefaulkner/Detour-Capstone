import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { Button, Col } from "reactstrap";
import { getLogin } from "../ApiManager";
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const [pass, setPass ]= useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: email,
            password: pass
        }

        return getLogin(user)
            .then(data => {
                if (data.valid) {
                    localStorage.setItem("dt_token", data.token)
                    localStorage.setItem("dt_manager", data.manager)
                    localStorage.setItem("dt_currentuser", data.current_user)
                    navigate("/map")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    const logo = require('./images/detourLogo.png');

    return (
        <main className="login">
            <form className="loginform" onSubmit={handleLogin}>
                <div>
                    <img className="signinlogo" src={logo} />
                </div>
                <div>
                    <h3 className="title">please sign in</h3>
                    <fieldset>
                        <Col md={4}>
                            <label htmlFor="inputEmail"> username </label>
                            <input type="text"
                                value={email}
                                onChange={evt => set(evt.target.value)}
                                className="form-control"
                                required autoFocus />
                        </Col>
                    </fieldset>

                    <fieldset>
                        <Col md={4}>
                            <label htmlFor="inputEmail"> password </label>
                            <input type="password"
                                value={pass}
                                onChange={evt => setPass(evt.target.value)}
                                className="form-control"
                                required />
                        </Col>
                    </fieldset>
                    <fieldset>
                        <Button className="submit" type="submit">
                            sign in
                        </Button>
                    </fieldset>

                    <section className="registerlink">
                        <Link to="/register">not a member yet?</Link>
                    </section>
                </div>
            </form>
        </main>
    )
}

