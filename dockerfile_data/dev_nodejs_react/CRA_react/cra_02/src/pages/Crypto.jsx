import { useState } from "react";
import CryptoJS from "crypto-js";  // 라이브러리 이름을 다른 이름으로 변경

const CryptoComponent = () => {  // 컴포넌트 이름을 변경
    const [inid, setInid] = useState('');
    const [inpw, setInpw] = useState('');
    const [skey, setSkey] = useState('');

    const [encrypt, setEncrypt] = useState(''); // 암호화
    const [decrypt, setDecrypt] = useState(''); // 복호화
    const [sha, setSha] = useState(''); //단방향

    const encryptFn = () => {
        const data = { id: inid, pw: inpw }; // 원하는 형태로 객체화
        const encData = CryptoJS.AES.encrypt(JSON.stringify(data), skey).toString(); // skey 와 함께 암호화
        setEncrypt(encData);
    }

    const decryptFn = () => {
        try {
            const bytes = CryptoJS.AES.decrypt(encrypt, skey); // encrypt 데이터와 skey로 복호화
            const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); // UTF-8로 변환
            setDecrypt(decrypted);  // 복호화된 데이터를 state로 설정
        } catch (error) {
            console.log("복호화 오류", error);
            alert("복호화 오류");
        } finally {
            alert("암호키 관리 주의");
        }
    }

    const sha256Fn = () => {
        const data = { id: inid, pw: inpw };
        const encData = CryptoJS.SHA256(JSON.stringify(data)).toString(); // SHA-256 해시 생성
        setEncrypt(encData); // 단방향 암호화 결과를 encrypt 상태에 저장
    }
    // 핸들러
    const handleIdChange = e => setInid(e.target.value);
    const handlePwChange = e => setInpw(e.target.value);
    const handleSkeyChange = e => setSkey(e.target.value);

    return (
        <>
            <h1>2. 암호화, 복호화, 단방향</h1>
            <div>
                ID : <input type="text" onChange={handleIdChange} value={inid} />
            </div>
            <div>
                PW : <input type="password" onChange={handlePwChange} value={inpw} />
            </div>
            <div>
                암호화 키 : <input type="password" onChange={handleSkeyChange} value={skey} />
            </div>
            <button onClick={encryptFn} disabled={!(inid && inpw && skey)}>암호화 동작</button>
            <hr />
            <div>암호화 전: {(inid && inpw) && JSON.stringify({ id: inid, pw: inpw })} </div><hr />
            <div>{!!encrypt && `암호화 후: ${encrypt} /글자수 ${encrypt.length}`}</div><hr />

            <div>복호화 암호키
                <input type="password" onChange={handleSkeyChange} value={skey} />
            </div>
            <button onClick={decryptFn}>복호화 동작</button>
            <div>{!!decrypt && JSON.stringify(decrypt)}</div>
            <div>{`복호화된 데이터: ID는 ${decrypt.id}이고, Password는 ${decrypt.pw}입니다.`}</div>
            <hr />
            <button>단방향 암호화하기</button>
            <h3>{sha && `SHA256 암호화 : ${sha}(길이:${sha.length})`}</h3>
        </>
    );
}

export default CryptoComponent;
