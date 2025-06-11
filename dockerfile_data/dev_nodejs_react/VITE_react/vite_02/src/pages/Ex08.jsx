import { useState } from 'react';

const TodoList = () => {
    const [indata, setIndata] = useState('');
    const [arr, setArr] = useState([]);

    const handleInput = () => { }
    const handleArr = () => { }

    return (
        <>
            <h1>8. Array를 이용한 ToDoList</h1>
            <label htmlFor="inin">배열요소 입력:</label>
            <input type="text" id="inin" /><hr />
            <button>추가</button>
            <button>삭제</button>
        </>
    )
}

export default TodoList