import React, { useContext, useEffect, useRef, useState } from 'react';
import './chat.css';
import { Input, Spin } from 'antd';
import '../common.css'
import RightArrow from '../images/right-arrow-chat.png';
import RightArrowDone from '../images/right-arrow-done.png';
import ChatIcon from '../images/chat_icon.png';
import AiIcon from '../images/ai_icon.png';
import HumanIcon from '../images/human_icon.png';
import AIWriter from "react-aiwriter";

const Chat = () => {
  const windowHeight = window.innerHeight;
  document.documentElement.style.setProperty("--layoutHeight", `${windowHeight}px`);
  document.documentElement.style.setProperty("--chatAreaHeight", `${windowHeight - 109}px`);

  const [data, setData] = useState([])

  const [inputClicked, setInputClicked] = useState(false);
  const [question, setQuestion] = useState("");
  const [responseAnswer, setResponseAnswer] = useState("");
  const scrollableElementRef = useRef(null);
  const [loading, setLoading] = useState(false);


  const scrollToBottom = () => {
    if (scrollableElementRef.current) {
      scrollableElementRef.current.scrollTop = scrollableElementRef.current.scrollHeight;
    }
  }

  const onInputChange = (e) => {
    setQuestion(e);
  }
  useEffect(() => {
    if (question.length > 0) {
      setInputClicked(true);
    } else {
      setInputClicked(false);
    }
  }, [question])
  useEffect(() => {
    scrollToBottom();
  }, [data])

  const getChatResponse = async (question) => {
    setLoading(true);
    var formdata = new FormData();
    formdata.append("query", question);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/gpt", requestOptions)
      .then(response => response.text())
      .then(result => {
        var obj = {
          question: question,
          answer: result
        }
        setData([...data, obj]);
        setResponseAnswer(result);
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };

  const onSendButtonClicked = () => {
    getChatResponse(question)
    setQuestion("")
  }

  return (
    <div>
      <div className='top-bar'><div>Chat with Pdf </div> </div>
      <div className='content' ref={scrollableElementRef}>
        {data?.map((item) => (

          <div>
            <div className='question-content'>
              <img className='ai-icon' src={HumanIcon} alt="chat icon" />
              <div className='question-content-text'> {item.question}</div>
            </div>

            <div className='answer-content'>
              <img className='ai-icon' src={AiIcon} alt="chat icon" />
              <div className='answer-content-text'>
                <AIWriter>
                  {item.answer}
                </AIWriter>
              </div>
            </div>

          </div>
        ))}
        {(data.length == 0) ?
          <div className='empty-chat-content'>
            <img className='chat-icon' src={ChatIcon} alt="chat icon" />
          </div>
          : ""}
      </div>

      <div className='input-box'>
        <Input
          value={question}
          onChange={(e) => { onInputChange(e.target.value) }}
          autoSize={{
            minRows: 1,
            maxRows: 6,
          }} className='input-field' placeholder='Send a message'
          onPressEnter={onSendButtonClicked}
          suffix={
            loading ? <Spin /> : <div>{
              (inputClicked) ? <img className='arrow-chat-after-input' onClick={onSendButtonClicked} src={RightArrowDone}></img> : <img className='arrow-chat-before-input' src={RightArrow}></img>
            } </div>
          }
        /></div>
    </div>
  )
}

export default Chat