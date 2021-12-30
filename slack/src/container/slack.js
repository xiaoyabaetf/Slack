import "../style/slack.css";
import {useEffect, useRef,useState,Fragment} from "react";
import $ from  'jquery'
import {sendPraises} from "../services/service"


function Slack(props) {///appenpraise @John did something great! Congratulations to him!
    const keyup=useRef(null);
    const value=useRef("")
    const name=useRef("")
    const [list,setList]=useState([]);
    const [disabled,setDisabled]=useState(false)
    useEffect(()=>{
            if(props.name){
                setDisabled(true)
            }else{
                name.current.focus();
            }
                name.current.addEventListener("keyup", function(event) {
                    if(event.keyCode==13){
                        if(window.socket){
                            window.socket.emit('login', {name:event.target.value})//更新列表
                            window.socket.on("login",(res)=>{
                                console.info(res)
                                if(res.status=="success"){
                                    setDisabled(true)
                                    props.login(event.target.value)
                                }
                            })
                        }
                    }
                });
    },[])

    useEffect(()=>{
        if(keyup.current){
            keyup.current.focus();
            keyup.current.addEventListener("keyup", function(event) {
                if(event.keyCode==13){
                    let  patten=/\/appenpraise\s(.+)/g;
                    let  tempvalue=event.target.value.trim()
                    let  flag=patten.test(tempvalue)
                    if(flag){
                        let  pattenOne=/\/appenpraise\s@\w+\s(.+)/g;
                        let flagOne=pattenOne.test(tempvalue)
                        const handle=function(){
                            let currentList=value.current ? [...value.current] : []
                            currentList.push({
                                value:event.target.value,
                                key:Date.now()
                            })
                            if(window.socket){
                                window.socket.emit('update', {toSay:true})//更新列表
                            }
                            setList(currentList)
                            keyup.current.value=""
                            value.current=currentList
                            $("#text").scrollTop($("#text").scrollTop()+32);
                            keyup.current.focus();
                        }
                        if(flagOne){
                            sendPraises({value:tempvalue.slice(tempvalue.indexOf("@"))}).then(res=>{
                                handle()
                            })
                        }else{
                            sendPraises({value:tempvalue.slice("/appenpraise ".length)}).then(res=>{
                                handle()
                            })
                        }
                    }else{
                            let currentList=value.current ? [...value.current] : []
                            currentList.push({
                                value:"无效命令",
                                key:Date.now()
                            })
                            setList(currentList)
                            keyup.current.value=""
                            value.current=currentList
                            $("#text").scrollTop($("#text").scrollTop()+32);
                            keyup.current.focus();
                    }
                }
            });
        }
    },[disabled])

    const onChangeName=(event)=>{
        props.login(event.target.value)
    }

    return (
        <div className="window">
            <div className="title">
                <img src="css/1.jpg" />
                <span>Wechat Dos</span>
            </div>
            <div id="text">
                <ul>
                    <li>Welcome to Slack</li>
                    <li>please input your username:</li>
                    <input type="text" name="name" id='name'  ref={name} disabled={disabled}  autoComplete="off" value={props.name} onChange={onChangeName}/>
                    {disabled ?  <li>You can send command for example: /appenpraise did something great! Congratulations to everyone! , if you want send to one person ,then you can input like this : /appenpraise @person did something great! Congratulations to him! </li> :""}
                    {   
                            list.map((li)=>{
                                return <li key={li.key}>
                                        {li.value}
                                </li>
                            })
                    }
                </ul>
                {disabled ?<input type="text" name="" id='in'  ref={keyup}  autoComplete="off" />:""}
            </div>
        </div>
    )
}

export default Slack;