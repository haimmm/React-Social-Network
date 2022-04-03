import "./Nav.css"
import { Line } from "layouts";

const Nav = (props) => {
    return (
        <nav className="nav">
            <Line>{props.children}</Line>
        </nav>
    );
}

export default Nav;