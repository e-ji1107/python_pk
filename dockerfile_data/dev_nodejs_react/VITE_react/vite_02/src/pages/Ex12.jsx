// ex12.jsx
import React, { useState, useEffect } from 'react';
import myStyle from './ex12.module.css'; // 스타일 파일 임포트
import table from './Ex12.data'; // 데이터 임포트

const Table = () => {
    const [totalPrice, setTotalPrice] = useState(0); // 총 금액을 저장할 상태

    // useEffect를 사용하여 데이터를 처리하고 합계를 계산
    useEffect(() => {
        const total = table.reduce((acc, item) => acc + item.price + item.delivery_price, 0); // 가격 + 배송비 합산
        setTotalPrice(total); // 상태에 합계 저장
    }, []); // 빈 배열을 넣어 초기 렌더링 시 한 번만 실행되도록 설정

    return (
        <div className={myStyle['data-box']}>
            <h1>12. 데이터 임포트 후 실시간 연산</h1>
            <h2>총 금액: {totalPrice}원</h2>
            <table>
                <thead>
                    <tr>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>카테고리</th>
                        <th>배송비</th>
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    {table.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product_name}</td>
                            <td>{item.price}원</td>
                            <td>{item.category}</td>
                            <td>{item.delivery_price}원</td>
                            <td>{item.price + item.delivery_price}원</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
