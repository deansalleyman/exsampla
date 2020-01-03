import React from 'react';
import './styles.css';

function handleClick(e) {
    e.preventDefault();
    //console.log('Click Me Clicked', e);

}
const MyComponent = (props) => (
    <div>
        <h1>Hello {props.name} from My Component</h1>
        <a href="#" onClick={handleClick}>
        Click me
        </a>
    </div>
);
export default MyComponent;
