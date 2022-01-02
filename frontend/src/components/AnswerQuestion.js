import React, {useState} from 'react';
import logo from '../logo.png';
import user from '../user.png';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Container, Row, Col, Form, FormControl, Dropdown} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {getCookie} from "../cookies";
import axios from "axios";

function AnswerQuestion () {

    const history = useHistory();

    let questionId = 0  //variable for sumbitting on the right question Id

    //const auth = cookies.get('auth')
    if(getCookie('auth') === 'no' || getCookie('auth') === ''){
        history.push('/')
    }


    function logout() {
        console.log('cookie: ' + document.cookie)
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    function answer(text) {
        console.log('function answer says hi')
        console.log(questionId)
        const iduser = getCookie('iduser')
        console.log(iduser)

        axios.post(
            '/answer', {text, iduser, questionId}).then(response =>{
            console.log(response)
            const data = response.data.affectedRows
            if (data === 0) {
                alert('answer failed')
                console.log('answer failed')
            } else {
                alert('answer successful')
                console.log('answer successful')

            }
        })
    }

    class AnswerForm extends React.Component{
        constructor(props) {
            super(props);

            this.state = { text: ''}

            this.handleChangeText = this.handleChangeText.bind(this)

            this.handleSubmit = this.handleSubmit.bind(this)
        }


        handleChangeText(event){
            this.setState({text: event.target.value})
        }


        handleSubmit(event){
            if(!this.state.text.trim()){
                alert('empty answers are not any helpful')
            }
            else{
                answer(this.state.text)
                history.push('/answer')
            }
            event.preventDefault();
        }


        render() {
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <FormControl as="textarea" value={this.state.text} onChange={this.handleChangeText} placeholder="Your answer here..." style={{margin:"15px", height:"100px"}}/>
                    </Row>
                    <Row style={{margin:"0px"}}>
                        <Button type="submit" variant="light" className="border-dark">Submit</Button>
                        &nbsp; &nbsp;
                    </Row>
                </Form>
            )
        }
    }


    class Questions extends React.Component {
        constructor(props) {
            super(props);

            this.state = {questions: []}

            this.showAnswers = this.showAnswers.bind(this)
        }



        componentDidMount() {
            axios.post('/getQuestions').then(response => {
                //console.log(response.data)
                response.data.forEach(question =>{
                    question.answer = false
                    question.answersList = []
                })
                this.setState({questions: response.data})

                //console.log("questions after change")
                console.log(this.state.questions)

            })

            axios.post('/getAnswers').then(response => {
                console.log(response.data)

                response.data.forEach(answer => {
                    for(let i in this.state.questions){
                        if(this.state.questions[i].idquestion === answer.question_idquestion){
                            this.state.questions[i].answersList.push(answer)
                        }
                    }
                })

            })

            //this.state.question.answersList = []
            //console.log(this.state.questions)
        }



        showAnswers(id) {
            //console.log(id)
            for(let i in this.state.questions){
                if(this.state.questions[i].idquestion === id){
                    if(this.state.questions[i].answer === true){
                        this.state.questions[i].answer = false
                        this.forceUpdate()
                    }
                    else if(this.state.questions[i].answer === false){
                        this.state.questions[i].answer = true
                        this.forceUpdate()
                    }
                }
            }
        }



        render() {
            return(
                <div>
                    <p className="red-header" style={{borderRadius:"10px"}}><p className="white-banner font-weight-bold">Questions Overview</p></p>
                    {this.state.questions.map(question => <div onClick={() => {
                        const id = question.idquestion
                        this.showAnswers(id)
                        questionId = id}
                    } className="questions text-dark">
                        <p className="font-weight-bold" style={{fontSize:"20px"}}>
                            {question.title}
                        </p>

                        <p className="question-text">{question.text}</p>
                        <br/>
                        <p className="question-author">Author: {question.username} &nbsp; &nbsp; &nbsp; Email: {question.email}</p>
                        <p className="question-author" style={{float:"right"}}>Date: {question.timestamp.substring(0, 10) }</p>

                        <div style={{cursor:"auto"}} onClick={() => {
                            const id = question.idquestion
                            this.showAnswers(id)}}>

                        {question.answer &&
                            <br/>
                        }
                        {question.answer &&
                            <p className="font-weight-bold">Answers:</p>
                        }
                        {question.answer &&
                            <Container>{question.answersList.map(answer => <Row><div style={{margin:"10px"}} className="question-text">
                                {answer.text}
                                <br/>
                                <br/>
                                <p className="question-author">Author: {answer.username} &nbsp; &nbsp; &nbsp; Email: {answer.email}</p>
                                <p className="question-author" style={{float:"right"}}>&nbsp; &nbsp; &nbsp;Date: {answer.timestamp.substring(0, 10) }</p>
                            </div>
                                </Row>
                            )}</Container>
                        }
                        {question.answer &&
                            <AnswerForm/>
                        }
                        {question.answer &&
                            <br/>
                        }
                        {question.answer &&
                            <Button variant="danger" className="border-dark" onClick={() => {
                                const id = question.idquestion
                                this.showAnswers(id)}}>Nevermind</Button>
                        }
                        </div>

                    </div>)}
                    <div className="copyright">
                        <img
                            style={{float:'left'}}
                            src={logo}
                            alt=""
                            height="26px"
                            width="26px"
                        />
                        <p style={{float:'left'}}>&nbsp;&nbsp;Copyright &copy; 2021</p>
                        <p style={{float:'right'}}>made by Billys</p>
                    </div>
                </div>
            )
        }


    }

    return (
        <div className="App">
            <div className="App-header">
                <Container>
                    <Row>
                        <Col>
                            <Link className="nav-link text-dark text-decoration-none" to="/home" style={{marginTop:"5px"}}>
                                <img
                                    alt=""
                                    src={logo}
                                    className="App-logo"
                                />
                                <span  style={{marginLeft:"5px"}} className="font-weight-bold">@ask</span>
                                <span className="font-weight-bold" style={{color:"#e30000"}}>me</span>
                                <span className="font-weight-bold">anything</span>
                                <span className="font-weight-bold" style={{color:"#e30000"}}>2021</span>
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/">
                                <Button variant="danger" className="border-dark login-signup-buttons" onClick={logout}>Log out</Button>
                            </Link>
                            <Dropdown variant="light" className="border-dark" >
                                <Dropdown.Toggle variant="light" className="border-dark my-ask-button">
                                    <img
                                        alt=""
                                        src={user}
                                        width="20"
                                        height="20"
                                    />
                                    <span  style={{marginLeft:"5px"}} className="font-weight-bold my-ask-text">@myask</span>
                                    <span className="font-weight-bold my-ask-text" style={{color:"#e30000"}}>me</span>
                                    <span className="font-weight-bold my-ask-text">anything</span>
                                    <span className="font-weight-bold my-ask-text" style={{color:"#e30000"}}>2021</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="border-dark">
                                    <Dropdown.Item>Username: {getCookie('username')}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="red-header">
                <Container>
                    <Row className="font-weight-bold" style={{justifyContent:"center"}}>
                        <p className="white-banner">Your answers are valuable!</p>
                    </Row>
                </Container>
            </div>


            <Container className="restOfPage" style={{height:"100%"}}>
                {/*<div style={{border:"1px solid black", borderRadius:"10px", margin:"10px"}}>
                    <div className="font-weight-bold" style={{textAlign:"center", marginTop:"40px"}}>Search a question by title and keyword</div>
                <Form style={{display:"inline-block" ,width:"100%"}}>
                    <Row style={{ margin:"10px", marginTop:"25px"}}>
                        <FormControl placeholder="Keywords" />
                    </Row>
                    <Row style={{ margin:"10px"}}>
                        <FormControl placeholder="Question title"/>
                    </Row>
                    <div style={{float:"right"}}>
                    <Row>
                        <Button style={{ margin:"30px", width:"150px"}} type="submit" variant="light" className="border-dark">Search</Button>
                    </Row>
                    </div>

                </Form>
                </div>*/}

                <div style={{marginTop:"30px"}}>
                    <Questions/>
                </div>
            </Container>

        </div>
    )
}

export default AnswerQuestion;
