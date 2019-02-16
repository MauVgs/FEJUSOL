import React,{Component} from 'react'
import {
    Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
    Table, Divider, Tag
  } from 'antd';
import Home from './Home'
//1.- Se carga el complemento de react
import fire from '../config/fire'
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
//2.- se crea la referencia a la base de datos
const ref = fire.database().ref('/DatosUsuarios');

class Usuarios extends Component{
    constructor(props)
    {
        super(props);
        this.state=({
            //Se guardan los elementos que va a guardar el estado para el envío del formulario
            name: '',
            email: '',
            pass: '',
            data:[]
        });
        //this.handleSave = this.handleSave.bind(this);
        //this.handleConsult = this.handleConsult.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirect = this.redirect.bind(this);
    }


    componentDidMount()
    {
        
        ref.on('value', snapshot =>{
            const data = [];
            data.pop();
            
            console.log(snapshot.val());
            snapshot.forEach(user =>{
                const {name,email, pass} = user.val();
                var k = user.key;
                data.push({
                    key: k,
                    snapshot,
                    name,
                    email,
                    pass
                })
                this.setState({data:data})
            }) 
        })
    }


    //Envía los datos a la DB
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values)=>{
            if(!err){
                console.log(values.nombre);
                this.state.name = values.nombre;
                ref.push({
                    name: this.state.nombre,
                    email: this.state.correo,
                    pass: this.state.contra
                })
            }
        })

    }

    redirect(e){
        e.preventDefault();
    }

    //
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    render(){
        const {getFieldDecorator} = this.props.form;
      
          
          const columns = [{
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
          }, {
            title: 'Contraseña',
            dataIndex: 'pass',
            key: 'pass',
          }];
        return(
            <React.Fragment>
                <Content>
                    <Form onSubmit={this.handleSubmit} className="login_form">
                        <Form.Item>
                            {getFieldDecorator('nombre', {
                                rules: [{ required: true, message: 'Ingresa tu nombre'}],
                            })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />} type="text" onChange={this.handleChange} name="nombre" placeholder="Nombre"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('correo', {
                                rules: [{ required: true, message: 'Ingresa tu correo'}],
                            })(
                            <Input prefix={<Icon type="email" style={{color: 'rgba(0,0,0,.25)'}} />} type="email" onChange={this.handleChange} name="correo" placeholder="Correo"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('contra', {
                                rules: [{ required: true, message: 'Ingresa tu contraseña'}],
                            })(
                            <Input prefix={<Icon type="password" style={{color: 'rgba(0,0,0,.25)'}} />} type="pass" onChange={this.handleChange} name="contra" placeholder="Contraseña"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="danger" htmlType="submit" onClick={this.handleSubmit} className="loggin_button">
                                Guardar
                            </Button>
                        </Form.Item>
                    </Form>
                    <Table dataSource={this.state.data} columns={columns} />
                </Content>
            </React.Fragment>
        );
    }
}

export default Form.create({name: 'login_form'})(Usuarios);