import "./Error.css"

const Error = props => {
    return (
        <div className="maxLengthError">{props.children}</div>
    );
}
export default Error;