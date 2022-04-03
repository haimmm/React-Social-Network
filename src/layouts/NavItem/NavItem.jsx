import "./NavItem.css"

const NavItem = (props) => {
    return (
        <div className="navItem">{props.children}</div>
    );
}

export default NavItem;