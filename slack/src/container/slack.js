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
    const [oldInput,setOldInput]=useState([])
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
                    let  patten=/^(\/appenpraise)\s(.+)/g;
                    let  tempvalue=event.target.value.trim()
                    let  flag=patten.test(tempvalue)
                    if(flag){
                        let  pattenOne=/^(\/appenpraise)\s@\w+\s(.+)/g;
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
                        let now = new Date();
                        let year = now.getFullYear(); //得到年份
                        let month = now.getMonth();//得到月份
                        let date = now.getDate();//得到日期
                        let day = now.getDay();//得到周几
                        let hour = now.getHours();//得到小时
                        let minu = now.getMinutes();//得到分钟
                        let sec = now.getSeconds();//得到秒
                        let end=` from ${props.name} ${year}-${month}-${date} ${hour}:${minu}:${sec}`
                        if(flagOne){
                            sendPraises({value:tempvalue.slice(tempvalue.indexOf("@"))+ end}).then(res=>{
                                handle()
                            })
                        }else{
                            sendPraises({value:tempvalue.slice("/appenpraise ".length) + end }).then(res=>{
                                handle()
                            })
                        }
                    }else{
                        const restore=(currentList)=>{
                            keyup.current.value=""
                            value.current=currentList
                            $("#text").scrollTop($("#text").scrollTop()+32);
                            keyup.current.focus();
                        }
                        switch(event.target.value.trim()) {
                            case "clear":
                            setList([])
                            restore([])
                               break;
                            default:
                                let currentList=value.current ? [...value.current] : []
                                currentList.push({
                                    value:"无效命令",
                                    key:Date.now()
                                })
                                setList(currentList)  
                                restore(currentList)
                       } 
                    }
                }
            });
        }
    },[disabled])

    const onChangeName=(event)=>{
        props.login(event.target.value)
    }

    return (
        <div>
            <div className="window" onClick={()=>{keyup.current && keyup.current.focus()}}>
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
            <p className="note">Note: you can input "clear" to clear screen . Others quick input command will be added in future!</p>
        </div> 
    )
}

export default Slack;