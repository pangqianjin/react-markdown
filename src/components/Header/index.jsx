import { Button} from 'antd';
import PubSub from 'pubsub-js'
import {GithubOutlined} from '@ant-design/icons'
import React, { Component } from 'react';
import './style.css'



class Header extends Component {

    save = ()=>{
       PubSub.publish('download')
    }


    addStyles = (char1, char2, wrap=true)=>{
        return ()=>{
            PubSub.publish('addStyles', {char1, char2, wrap})
        }   
    }

    clearAll = ()=>{
        PubSub.publish('clearAll')
    }

    render() {
        return (
            <div id='header'>
                <Button onClick={this.save} type='primary'>保存</Button>
                <Button onClick={this.clearAll} type='primary'>清空</Button>
                <Button onClick={this.addStyles('**', '**')}>加粗</Button>
                <Button onClick={this.addStyles('*', '*')}>斜体</Button>
                <Button onClick={this.addStyles('<u> ', ' </u>')}>下划线</Button>
                <Button onClick={this.addStyles('```\n\n', '```', false)}>代码块</Button>
                <Button onClick={this.addStyles('<!-- ', ' -->')}>注释</Button>
                <Button onClick={this.addStyles('![ ]( )', '', false)}>插入图片</Button>
                <Button onClick={this.addStyles('[ ]( )', '', false)}>超链接</Button>
                <a href='https://github.com/pangqianjin'>
                    <GithubOutlined style={{fontSize:'30px',margin: '0.25em'}} />
                </a>  
            </div>
        );
    }
}

export default Header;