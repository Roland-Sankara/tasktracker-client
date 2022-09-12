import './index.css';

const Todo = ({text, handler, done, remove}) => {
    return (
        <div className="todo">
            <input type={"checkbox"} checked={done} onClick={handler}/>
            <label>{text}</label>
            <i className="fa-solid fa-xmark" onClick={remove}></i>
        </div>
    )
}

export default Todo;