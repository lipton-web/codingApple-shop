import axios from "axios";
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
// import "./Detail.scss"

function Detail(props){

	const [alert, setAlert] = useState(true);
	const [inputData, setInputData] = useState("");
	const [stock, setStock] = useState([...props.stock][0]);


	useEffect(() => {
		// 2초 후에 alert 창을 안보이게 하기
		const timer = setTimeout(() => {
			setAlert(false)
		}, 2000);
		console.log('hello');
		// setTimeout 쓸 때 주의점 - 타이머 해제 (근데 2초가 되기도 전에 Detail을 벗어나면 어떻게 될까요?)
		return () => {
			clearTimeout(timer)
		}
	},[alert]);

	// 지금은 별 문제없는 것 같지만 코드가 길어지거나 꼬이면
	// 남아있는 타이머 때문에 이상한 현상이 일어날 수 있습니다.	
	// 그래서 컴포넌트가 사라질 때 타이머를 없애는 코드도 추가해주는게 좋습니다.

	const history = useHistory();

	let { id } = useParams();

	// 다르게 정렬되어도 해당 상품 고유 아이디 페이지로 가도록 함.
	let findShoes = props.shoes.find(function(shoes) {
		return shoes.id == id
	})
	// let 찾은상품 = props.shoes.find(x => x.id == id);
	console.log("찾은상품",findShoes)

  return (
    <div className="container">
			<Box>
				<Title color="red">Detail</Title>
				<input onChange={(e)=>{ setInputData(e.target.value) }} />
				{inputData}
				{
					alert ? 
					<Alert>재고가 얼마 남지 않았습니다.</Alert> : null
				}
			</Box>
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt="shoes" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{findShoes.title}</h4>
          <p>{findShoes.content}</p>
          <p>{findShoes.price}</p>

					<Info stock={stock}></Info>

          <button className="btn btn-danger" onClick={() => {
						setStock(stock-1)
						}}>주문하기</button> 
          <button className="btn btn-danger" onClick={()=>{
						history.push('/');
					}}>뒤로가기</button> 
        </div>
      </div>
    </div> 
  )
}

function Info (props) {
	return (
		<p>재고 : {props.stock}</p>
	)
}

export default Detail;

const Box = styled.div`
	padding-top : 30px;
`;

const Alert = styled.div`
	background: #eeeeee;
	padding: 20px;
	border-radius: 5px;
	max-width: 500px;
	width: 100%;
	margin: auto;
`;

const Title = styled.div`
	font-size: 25px;
	color : ${props => props.color}
`;