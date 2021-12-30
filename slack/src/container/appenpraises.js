import "../style/slack.css";
import React, { useState, useEffect , useRef} from 'react';
import { List, Avatar} from 'antd';
function Appenpraises() {
    const [list,setList]=useState([])
    useEffect(()=>{
        // appenpraises().then((res)=>{
        //     console.info(res)
        //     setList(res.data)
        // })

        // 此时会触发后台的connect事件
        if(window.socket){
            window.socket.emit('update', {toSay:false})
            window.socket.on('allMessage',function(data){ // 监听服务端的消息“msg”
                console.info(data)
                setList(data)
            });
        }
    },[])
    const random=()=>{
        return <Avatar src="https://joeschmoe.io/api/v1/random" />
    }
    return (
        <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item,index) => (
            <List.Item>
                <List.Item.Meta
                avatar={/@\w+\s(.+)/g.test(item.value) ? random() :<div style={{width:"32px",height:"32px",borderRadius:"50%",background:"#e3e3e3",textAlign:"center",lineHeight:"32px"}}>ALL</div>}
                title={<a href="https://ant.design">第 {index+1} 条消息</a>}
                description={item.value}
                />
            </List.Item>
            )}
        />
    )
}

export default Appenpraises;