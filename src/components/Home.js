import React, {Component} from 'react'
//import {Link} from 'react-router-dom'
import {Switch, BrowserRouter, Route, Link} from "react-router-dom";
import fire from '../config/fire'
import { Layout, Menu, Icon, Button } from 'antd';
import 'antd/dist/antd.css';
import Usuarios from './Usuarios'
import Mapa from './Mapa'

//test map
//import Mapub from './Mapub'

const {
    Header, Content, Footer, Sider,
  } = Layout;

class Home extends Component{
    constructor(props)
    {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout()
    {
        fire.auth().signOut();
    }
    
  
    render(){
        
        return(
            <BrowserRouter>
                <Layout>
                    <Sider
                     style={{background:'#fff'}}
                     breakpoint="lg"
                     collapsedWidth="0"
                     onBreakpoint={(broken)=>{console.log(broken)}}
                     onCollapse={(collapsed,type)=>{console.log(collapsed,type)}}
                     
                        >
                        <div className="logo" />
                        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" >
                               <Link to='/'>
                                    <Icon type="user" />
                                    <span className="nav-text">Principal</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/mapa'>
                                    <Icon type="heat-map" />
                                    <span className="nav-text">Mapa</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="upload" />
                                <span className="nav-text">nav 3</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="bar-chart" />
                                <span className="nav-text">nav 4</span>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="cloud-o" />
                                <span className="nav-text">nav 5</span>
                            </Menu.Item>
                                <Menu.Item key="6">
                                <Icon type="appstore-o" />
                            <span className="nav-text">nav 6</span>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Icon type="team" />
                                <span className="nav-text">nav 7</span>
                            </Menu.Item>
                            <Menu.Item key="8">          
                                <Button className="logout_button" type="default" onClick={this.logout}>Salir</Button>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                        <Layout className="contain_main" >
                            <Header  style={{ background: '#FD074F', padding: 0 }} />
                            {/*style={{ margin: '24px 16px 0', overflow: 'initial' }}*/}
                            <Content >

                                <Switch>
                                    <Route exact path="/" component={Usuarios} />
                                    <Route exact path="/mapa" component={Mapa}/>                           
                                </Switch>
                            
                            </Content>
                        
                        </Layout>
                    </Layout>
                    </BrowserRouter>
        )
    }
    
}

export default Home;