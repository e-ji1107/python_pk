import { useState } from 'react';

const [name, setName] = useState('');
const [gender, setGender] = useState('남자');

const changeName = (event) => setName(event.target.value)
const changeGender = (event) => setGender(event.target.value)
const handleSubmit = (event) => {
    alert(`등록하신 분의 이름: ${name}, 성별: ${gender}`);
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

}

const SendForm = () => {
    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">이름</label>
                <input type="text" />
                <hr />
                <label htmlFor="">성별</label>
                <select name="" id="">
                    <option value="남자">남자</option>
                    <option value="여자">여자</option>
                </select>
                <input type="submit" value="제출" />
            </form>
        </>
    )

}
export default SendForm