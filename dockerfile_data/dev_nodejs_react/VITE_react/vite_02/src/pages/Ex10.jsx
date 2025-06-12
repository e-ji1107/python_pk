import { useState, useEffect } from "react";
const FetchData = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("5초 정도 로딩 !!! ")
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(res => res.json())
                .then(result => {
                    setData(result)
                    console.log("데이터 받아옴 !")
                })
                .catch(err => console.error("⚠️ 에러발생 !! : " + err))
        }, 5000)
        return () => {
            clearTimeout(timer)  // 이걸 정리해줘야 다른 페이지에 갈 때 동작 안 함 !!
            console.log("언마운트 타이머 정리 !!")
        }

    }, [])

    return (
        <>
            <h1>10. 데이터 가져오기 및 표현</h1>
            {data.length === 0 ? (<div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>) :
                <ol>
                    {data.map(v => {
                        return <li key={v.id}>{v.title}</li>;
                    })}
                </ol>

            }

        </>
    )
}

export default FetchData