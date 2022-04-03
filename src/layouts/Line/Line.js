import "./Line.css"

const Line = (props) => {
    return (
        <div className="line" style={{justifyContent:props.justify || "start"}}>{props.children}</div>
    );
}

export default Line;