import React, { Component } from 'react';
import {Input} from 'antd'
import Pubsub from 'pubsub-js'
import md from '../MD'
import {downloadString} from '../../utils'
import 'highlight.js/styles/atom-one-light.css'
import '../../assets/css/fluent.css'
import './style.css'



export default class Body extends Component {
    state = {
        value: '',// 输入区域的文本
        lastValues: [],//历史输入的文本，用来撤销操作：ctrl+z
        htmlString: '',// 转换后的HTML
        shift: false,//是否按下shift
        ctrl: true//是否按下ctrl
    }

    onChange = ({ target: { value } }) => {
        this.setState({ value });//设置新的输入
        this.setHtmlString(value)// 渲染
    };

    setHtmlString = (text)=>{
        const htmlString =  md.render(text)
        this.setState({htmlString})
    }

    componentDidMount(){
        // 定时器，每两秒保存一下历史记录 
        this.timer = setInterval(()=>{
            const {lastValues, value} = this.state
            if(lastValues[lastValues.length-1]!==value){// 最近一次历史记录与当前不同时
                this.setState({lastValues: [...lastValues, value]})
            }
        }, 2000)

        Pubsub.subscribe('addStyles', (_, {char1, char2, wrap})=>{
            this.addStyles(char1, char2, wrap)
        })

        Pubsub.subscribe('download', ()=>{
            this.download()
        })
    }

    // 键盘按下事件
    handleKeydown = (event)=>{
        const {keyCode} = event
        const {shift, ctrl} = this.state
            
        if(keyCode===17) this.setState({ctrl: true}) // 按住ctrl键
        if(keyCode===16) this.setState({shift: true})// 按住shift键

        if(shift && ctrl){// 同时按下ctrl和shift
            
            if(keyCode===73){// ctrl+shift+i，插入图片
                event.preventDefault();
                this.addStyles('![ ]( )', '', false)
            }
            if(keyCode===75){// ctrl+shift+k，插入代码块
                event.preventDefault();
                this.addStyles('```\n\n', '```', false)
            }
        }else if(ctrl){// 只按下了ctrl键
            if(keyCode===66){//按下ctrl+b，加粗
                this.addStyles('**', '**')
            }else if(keyCode===73){// 按下ctrl+i，斜体
                this.addStyles('*', '*')
            }else if(keyCode===90){//按下ctrl+z
                const {lastValues} = this.state
                const length = lastValues.length// 历史记录的数组长度
                if(length!==0){
                    const value = lastValues[length-1]
                    this.setState({value, lastValues:[...lastValues.slice(0, length-1)]})
                }
            }
        }
     
        if(keyCode===9){// tab键为4个空格
            event.preventDefault();
            this.addStyles('  ', '  ')
        }    
    }

    // 键盘弹起事件
    handleKeydup = (event)=>{
        const {keyCode} = event
        if(keyCode===16){// 松开shift
            this.setState({shift: false})
        }else if(keyCode===17){// 松开ctrl
            this.setState({ctrl: false})
        }
    }

    componentWillUnmount(){
        clearInterval(this.timer)// 清除定时器
        Pubsub.unsubscribe('addStyles')
        Pubsub.unsubscribe('download')
    }


    // 添加粗体，斜体等, wrap是否包裹,
    //  wrap=true时就在光标处添加*或者用*包裹选中的内容，
    // 否则wrap=false 且 未选中内容时,直接插入char
    addStyles = (char1, char2, wrap=true)=>{
        let {value} = this.state
        const {selectionStart, selectionEnd} = this.editNode.resizableTextArea.textArea
        if(wrap){
            value = selectionStart===selectionEnd? 
            value.slice(0, selectionStart)+char1+char2+value.slice(selectionEnd):
            value.slice(0, selectionStart)+char1+value.slice(selectionStart, selectionEnd)+char2+value.slice(selectionEnd)
        }else if(!wrap && selectionStart===selectionEnd){// 直接在光标处添加char字符
            value = value.slice(0, selectionStart)+char1+char2+value.slice(selectionEnd)
        }
             
        this.setState({value})
        this.editNode.resizableTextArea.textArea.focus()// 点击工具栏按钮后也能focus输入区域
   }
    
   // 下载文件
    download = ()=>{
        downloadString(this.state.value)
    }

    // 拖进以打开文件，同时拖拽多个文件时，只打开第一个
    dropFile = (event)=>{
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        const reader = new FileReader();

        reader.readAsText(file, "utf-8");
        reader.onload = ()=>{
            this.setState({value: ''.concat(reader.result)})
        }
    }                                                                                                                                                                                                                                                                                                                

    render(){
        const {value, htmlString} = this.state

        return (
            <div id='editor-body'>
                <Input.TextArea id='editor' ref={el => this.editNode=el}
                    onKeyDown={this.handleKeydown} onKeyUp={this.handleKeydup}
                    value={value} 
                    onChange={this.onChange}
                    autoSize={{ minRows: 24}}
                    bordered={false}
                    onDrop={this.dropFile}
                    onDragOver={(e)=>e.preventDefault()}
                />

                <div id='preview' dangerouslySetInnerHTML={{__html: htmlString}} />
            </div>
        )
    } 
}
