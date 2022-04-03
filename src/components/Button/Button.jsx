import "./Button.css"

const Button = (props) => {
    return (
        <button className="btn" disabled={props.isDisabled} onClick={props.onClick} style={props.style}>{props.children}</button>
    );
}

export default Button;