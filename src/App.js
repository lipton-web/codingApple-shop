import React, { useEffect, useState } from 'react';
import "./App.css"
import { Link, Route, Switch } from 'react-router-dom';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import allshoes from './data';
import Detail from './Detail';
import axios from 'axios';


function App() {

  let [shoes, setShoes] = useState(allshoes);
  let [stock, setStock] = useState([10,11,12]);
  const [loding, setLoding] = useState(false);


  return (
    <div className="App">
      
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      

      <Switch>

        <Route exact path="/">
          <div className="header">
            <p>20% Season Off</p>
          </div>
          <div className="container">
            <div className="row">
            {
              shoes.map((shoes, idx)=>{
                return <Card shoes={shoes} idx={idx} key={idx} /> //shoes={p[idx]}
              })
            }
            </div>
            {
             loding ? <p>로딩중 ...</p> : null
            }
            {/* 더보기 버튼 눌렀을 때 기존꺼 + axios로 가져온거 보여주기 */}
            <button className="btn btn-primary" onClick={()=>{ 
              // 로딩중이라는 UI 띄움
              setLoding(true);
              axios.post('서버URL', { id: 'codingapple', pw : 1234}); // 요청보내기

              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((res)=>{
                // 로딩중이라는 UI 안보이게
                setLoding(false);
                // console.log(res.data)
                setShoes( [...shoes, ...res.data] );
              })
              .catch(()=>{
                // 로딩중이라는 UI 안보이게
                setLoding(false);
                console.log('실패했어요')
              })
            }}>더보기</button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes} stock={stock} setStock={setStock}/>
        </Route>

        <Route path="/:id">
          <div>아무거나</div>
        </Route>

      </Switch>

      {/* <div className="container">
        <div className="row">

        {
          shoes.map((shoes, idx)=>{
            return <Card shoes={shoes} idx={idx} key={idx} /> //shoes={p[idx]}
          })
        }

        </div>
      </div> */}
 
    </div>
  );
}


function Card(props) {
  return (
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.idx+1}.jpg`} alt="shoes" width="100%"/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
  </div>
  )
}

export default App;
