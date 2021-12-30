import "../style/slack.css";
import {useEffect, useRef,useState} from "react";
import { Avatar, Image } from 'antd';

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
    return (
        <div className="Appenpraises">
            {
                list.length ? <ul>
                    {
                     list.map(i=>{
                            return (
                                <li>
                                    {/@\w+\s(.+)/g.test(i.value)? <Avatar
                                            src={
                                                <Image
                                                src="https://joeschmoe.io/api/v1/random"
                                                style={{
                                                    width: 32,
                                                }}
                                                />
                                            }
                                            />:""}
                                    {i.value}
                                </li>
                            )
                        })
                    }
                </ul>:""
            }
        </div>
    )
}

export default Appenpraises;