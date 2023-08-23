import './Card.css';

const Card = (props) => {
    const classes = 'card ' + props.className;
    return (
        <div className={classes}>{props.children}</div>
        // Create warp tag like div
    )
}

export default Card