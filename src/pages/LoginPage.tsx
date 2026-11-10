import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { applyToken, TOKEN_KEY } from '../api'
import { resetFilter } from '../slices/drugDosesSlice'
import { setAuthError, setAuthLoading, signIn } from '../slices/authSlice'
import { useAppDispatch, useAppSelector } from '../store'

const LoginPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { isAuthenticated, login: currentLogin, loading, error } = useAppSelector((state) => state.auth)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        document.title = 'Вход'
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(setAuthLoading(true))

        try {
            const response = await axios.post('/api/users/login', { login, password })

            localStorage.setItem(TOKEN_KEY, response.data.access_token)
            applyToken(response.data.access_token)

            dispatch(signIn({ login: response.data.login }))
            dispatch(resetFilter())
            navigate('/drug_doses')
        } catch {
            dispatch(setAuthError('Неверный логин или пароль'))
        }
    }

    if (isAuthenticated) {
        return (
            <div className="screen">
                <header className="screen-header">
                    <h1 className="screen-title">Вход</h1>
                    <p className="screen-subtitle">Вы вошли как {currentLogin}</p>
                </header>
                <p className="empty-note">Чтобы сменить пользователя, нажмите «Выход» в нижней панели.</p>
            </div>
        )
    }

    return (
        <div className="screen">
            <header className="screen-header">
                <h1 className="screen-title">Вход</h1>
                <p className="screen-subtitle">Врачи и фармакологи ведут каталог доз препаратов</p>
            </header>

            <Form className="draft-form" onSubmit={handleSubmit}>
                <section className="draft-section">
                    <Form.Label className="draft-label" htmlFor="login">Логин</Form.Label>
                    <Form.Control
                        className="draft-input"
                        id="login"
                        type="text"
                        value={login}
                        onChange={(event) => setLogin(event.target.value)}
                        required
                    />

                    <Form.Label className="draft-label" htmlFor="password">Пароль</Form.Label>
                    <Form.Control
                        className="draft-input"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </section>

                {error && <p className="draft-error">{error}</p>}

                <Button className="dose-filter-button" type="submit" disabled={loading}>Войти</Button>
            </Form>
        </div>
    )
}

export default LoginPage
