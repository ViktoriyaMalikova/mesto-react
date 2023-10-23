import logo from '../images/header/header__logo.svg'

function Header() {
    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="Логотип" />
        </header>
    )
}

export default Header;