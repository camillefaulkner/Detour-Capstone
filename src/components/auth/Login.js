import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { Col } from "reactstrap";
import { getLogin } from "../ApiManager";
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return getLogin(email)
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("detour_user", JSON.stringify({
                        id: user.id,
                        manager: user.isManager
                    }))

                    navigate("/")
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
                            <label htmlFor="inputEmail"> email address </label>
                            <input type="email"
                                value={email}
                                onChange={evt => set(evt.target.value)}
                                className="form-control"
                                placeholder="email address"
                                required autoFocus />
                        </Col>
                    </fieldset>
                    <fieldset>
                        <button className="submit" type="submit">
                            sign in
                        </button>
                    </fieldset>

                    <section className="registerlink">
                        <Link to="/register">not a member yet?</Link>
                    </section>
                </div>
            </form>
        </main>
    )
}

