import "./Ex07.css";
import myStyle2 from "./Ex07.module.css";

const Css = () => {
    const myStyle1 = {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: 'red',
    };
    return (
        <>
            <h1>6.리액트에 Css 스타일 적용하기</h1>

            <div style={myStyle1}></div>
            <div style={{ ...myStyle1, backgroundColor: 'blue' }}></div>
            <div className="ex7-div"></div>
            <ul>
                <li><mark>적용 굿뜨</mark></li>
            </ul>
            <div className={myStyle2["ex7-div"]}></div>
            <ul>
                <li>저도 적용 댐ㅋㅋㅋ</li>
            </ul>
            <div className={myStyle2["ex7ex7"]}></div>
        </>
    )
}
export default Css;