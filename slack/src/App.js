import './App.css';
import Slack from "./container/slack"
import Appenpraises from "./container/appenpraises"
import { BrowserRouter, Route ,Switch ,Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, notification } from 'antd';
import 'antd/dist/antd.css';

function App() {
  const [name,saveName]=useState("")
  useEffect(()=>{
    if(window.socket){
      window.socket.on('someBodyCallYou',function(data){ // 监听服务端的消息“msg”
        console.info(data)
        notification.open({
          message: 'Notification Title',
          description:data,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      });
  }
  },[])
  const login=(name)=>{
    console.info(name)
    saveName(name)
  }
  return (
    <div>
      <BrowserRouter>
      <Link to='/'>
          <span>Home</span>
      </Link>
      {" "}
      <Link to='/appenpraise'>
          <span>Appenpraises</span>
      </Link>
      <Switch>
          <Route path='/' exact  render={(props) => {
                return <Slack {...props} login={login} name={name}/>
            }}></Route>
          <Route path='/appenpraise' exact component={Appenpraises}></Route>
      </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;
