let logo = "/src/assets/FlockLogo.png"
import "./Header.css"
export default function Header(){
    return(
        <>
            <header>
                        <div id="logo">
                        <img src={logo} alt="Flock's logo" />
                        <h1>Flock</h1>
                    </div>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Menu</li>
                        <li>Contact Us</li>
                    </ul>
                </nav>
            </header>
        </>
    )
}