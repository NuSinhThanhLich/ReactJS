import React from "react";

const Concept = (props) => {
    return (
        <ul id="concepts">
           {
            props.items.map((item) => (
                <li className="concept">
                    <img src={item.image} alt={item.title} />
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                </li>
            ))
           }
        </ul>
    )
};

export default Concept

