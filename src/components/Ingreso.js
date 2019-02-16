import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import fire from '../config/fire'
import {
    Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
  } from 'antd';
import Avatar from 'react-avatar';
import 'antd/dist/antd.css';
import Home from '../components/Home'
import image from '../images/Ellipse.png'
import { Z_BLOCK } from 'zlib';
class Ingreso extends Component{
    constructor(props) {
        super(props);
        //this.ingreso = this.ingreso.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
        this.redirect = this.redirect.bind(this);
        this.state={
            email: '',
            password:'',
            redirect: false 
        }
    }

    handleChange(e){
       
        this.setState({[e.target.name]: e.target.value});
    }
    redirect(e)
    {
        e.preventDefault();
        const { redirect } = this.state;
        if (redirect) {
          return <Home/>;
        }
   
        return <Ingreso/>;
    }
    handleSumbit = (e) =>{
        e.preventDefault();
        
        this.props.form.validateFields((err,values)=>{
            if(!err)
            {
                console.log(values.email);
                this.state.email = values.email;
                this.state.password = values.password;
                fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
                    console.log(u)
                }).catch((error)=>{
                    console.log(error);
                })
            }
            else{
                console.log("error");
            }
        })
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <div className="Login">
                <Avatar  name="Foo Bar" size="150" round={true} src={image}/>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Ingresa tu correo' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email"   onChange={this.handleChange} name="email" placeholder="Correo" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Ingresa tu contraseña' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"   onChange={this.handleChange} name="password" placeholder="Contraseña" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="danger" htmlType="submit" onClick={this.handleSumbit} className="login-form-button">
                            Ingresar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}


//ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
export default Form.create({ name: 'normal_login' })(Ingreso);;