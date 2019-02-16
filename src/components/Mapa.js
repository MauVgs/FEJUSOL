import React,{Component} from 'react'
import { Layout, Menu, Icon, Table,Dropdown,Button,Input } from 'antd';
import Highlighter from 'react-highlight-words';
import Home from './Home'
import MapGL, {NavigationControl, Marker, Popup} from 'react-map-gl';
import { Link } from 'react-router-dom';
import fire from '../config/fire'
import Geocode from "react-geocode";
import '../App.css';
import CityPin from '../map_comp/pin'
const { Header, Content, Footer, Sider } = Layout;

const TOKEN ='pk.eyJ1IjoiYWRyaWFubXB4IiwiYSI6ImNqcnB4ZXhwNTFqMjA0NG11aXUxZjF5M20ifQ.pqgn9_RV4GsmclEZNnkA3w';
//const ref = fire.database().ref('/ubicaciones').child('01')
const ref = fire.database().ref('/ubicaciones');

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
  };
//elementos de tabla

const datas = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  }];
//

/*const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      console.log(selectedRows[0]);
      
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };*/


  


class Mapa extends Component{
    
      
  
      _onViewportChange = viewport => this.setState({viewport});
    
      _onSettingsChange = (name, value) => {
        this.setState({
          settings: {...this.state.settings, [name]: value}
        });
      };

      onClick = ({ key }) => {
        console.log(`Click on item ${key}`);
        /*
          Paracho: @19.6466899,-102.0538073,15z
        */
        switch(key)
        {
          case "Paracho":
              this.setState(prevState => ({
                viewport: {
                    ...prevState.viewport,
                    latitude: 19.6466899,
                    longitude: -102.0538073,
                    zoom: 14,
                }
            }))  
            this.setState({
              place:'Paracho'
            })
            break;
          case "Uruapan":
              this.setState(prevState=>({
                viewport:{
                  ...prevState.viewport,
                  latitude:19.406448,
                  longitude:-102.043045,
                  zoom: 14,
                }
              }))
              this.setState({
                place:'Uruapan'
              })
              break;
        
        }
      };

      menu = (
        <Menu onClick={this.onClick}>
              <Menu.Item key="Paracho">Paracho</Menu.Item>
              <Menu.Item key="Uruapan">Uruapan</Menu.Item>
              <Menu.Item key="Patzcuaro">Patzcuaro</Menu.Item>
        </Menu>
      )
    
      constructor(props)
      {
          super(props);
          this.onClick = this.onClick.bind(this);
          //this.clusterMarker = this.clusterMarker.bind(this);
          //this.menu = this.menu.bind(this);
          this.state = {
            
            viewport: {
              width:"50wh",
              height:"60vh",
              latitude: 0,
              longitude: 0,
              zoom: 10,
              bearing: 0,
              pitch: 0
            },
            settings: {
              invertZoom: false,
              invertPan: false,
              longPress: false
            },
            data: [],
            data_table: [],
            selectedRowKeys: [],
            place:'Ubicaciones',
            popupInfo:null,
            direccion:null,
            searchText:''
          }
          
      } 


      //Busqueda en tabla
      getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Buscar
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Limpiar
            </Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      })    


      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      }
    
      handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
      }
      //

      
      
      onSelectChange = (selectedRowKeys, selectedRows) =>{
        this.setState({selectedRowKeys});
        //console.log(selectedRows);
        //obj[Object.keys(obj)[0]]; //returns 'someVal'
        const object = [];
        //const {latitude, longitude} = selectedRows;
        //console.log(selectedRows[0]);
        const latitud = JSON.stringify(selectedRows,['latitude']);
        const Longuitud = JSON.stringify(selectedRows,['longitude']);
        const lat = JSON.parse(latitud);
        const lng = JSON.parse(Longuitud);

        
        //console.log(typeof(lat));
        if(Object.keys(lat).length !== 0 && lat.constructor !== Object && Object.keys(lng).length !== 0 && lng.constructor !== Object){
          const lg = lng[0].longitude;
          const lt = lat[0].latitude;
          //Proyecto Survey
          console.log(lg);
          console.log(lt);

          this.setState(prevState => ({
            viewport: {
                ...prevState.viewport,
                latitude: lt,
                longitude: lg,
                zoom: 15,
            }
          }))  

          
          Geocode.setApiKey("AIzaSyDS2781EdV7kPn87zjv7WNt6vEaoAZjkY4");
          
          Geocode.enableDebug();
        
          
          Geocode.fromLatLng(lt, lg).then(
            response => {
              const address = response.results[0].formatted_address;
              this.setState({
                direccion: address
              })
              console.log(address);
            },
            error => {
              console.error(error);
            }
          );
          
        }
      }
      


    

    

    componentDidMount() {
        console.log("DIDMOUNT");
  
        ref.on('value',snapshot=>{
            const data = []; 
            data.pop();
            console.log(snapshot.val());
            var key = snapshot.key;
            snapshot.forEach(user=>{
              var k = user.key;
              //console.log(user.val());
              const {latitude,longitude} = user.val();
              data.push({
                key: k,
                snapshot,
                latitude,
                longitude
              })
              this.setState({data:data});
              
            }) 
        })
      
      //console.log(data);
    }
   
    


    _renderPopup() {
      const {popupInfo} = this.state;
      const direccion = this.state.direccion;
      return popupInfo && (

        
        <Popup tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => 
            this.setState({popupInfo: null}
          )} >
          <h1>{popupInfo.key}</h1>
          <p>{direccion}</p>
        </Popup>
      );
    }

    //diseño anterior de columnas
    /**const columns = [{
        title:'Nombre',
        dataIndex:'key',
        render:text=><a href="javascript:;">{text}</a>,
        ...this.getColumnSearchProps('key'),
      },
        {
          title: 'Latitud',
          dataIndex: 'latitude',
          //render: text => <a href="javascript:;">{text}</a>,
        }, {
          title: 'Longuitud',
          dataIndex: 'longitude',
        }]; */
    
    render(){
      const columns = [{
        title:'Nombre',
        dataIndex:'key',
        render:text=><a href="javascript:;">{text}</a>,
        ...this.getColumnSearchProps('key'),
      }];
      
        const {viewport, settings,selectedRowKeys} = this.state;
        const rowSelection={
          selectedRowKeys,
          onChange: this.onSelectChange,
          hideDefaultSelections: true,
          selections:[{
            key:'all-data',
            text: 'Select All Data',
            onSelect: ()=>{
              this.setState({
                selectedRowKeys: [...Array(45).keys()],
              })
              
            }
          }, {
            key: 'odd',
            text: 'Select Odd Row',
            onSelect:(changableRowKeys) =>{
              let newSelectedRowKeys=[];
              newSelectedRowKeys=changableRowKeys.filter((key,index)=>{
                if(index %2 !== 0){
                  return false;
                }
                return true;
              })
              this.setState({selectedRowKeys:newSelectedRowKeys});
            },
          },{
            key:'even',
            text:'Select Even Row',
            onSelect:(changableRowKeys)=>{
              let newSelectedRowKeys=[];
              newSelectedRowKeys=changableRowKeys.filter((key,index)=>{
                if(index%2 !== 0){
                  return true;
                }
                return false;
              })
              this.setState({selectedRowKeys:newSelectedRowKeys})
            },
          }],
          onSelection:this.onSelection,
        };
        return(
            <React.Fragment>
                <Content>
                    <Content>
                      <MapGL className="Maps"
                          {...viewport}
                          mapStyle="mapbox://styles/mapbox/streets-v8"
                          invertZoom={settings.invertZoom}
                          invertPan={settings.invertPan}
                          onPress={settings.longPress ? () => window.alert('pressed') : null}
                          onViewportChange={this._onViewportChange}
                          mapboxApiAccessToken={TOKEN} >
                          <div className="nav" style={navStyle}>
                              <NavigationControl onViewportChange={(viewport) => this.setState({ viewport })} />
                          </div>
                          {/*<div>{mark.key}</div>*/}
                          
                            {this.state.data.map(mark =>
                                <Marker 
                                    key={`marker-${mark.key}`}
                                    longitude={mark.longitude}
                                    latitude={mark.latitude} >
                                    <CityPin size={20} onClick={() => 
                                      
                                      this.setState({popupInfo: mark}
                                    )} />
                                </Marker>
                            )}
                           {this._renderPopup()}
                          
                      </MapGL>
                    </Content>
                        {/*<div className="listado"style={{ padding: 0, background: '#fff', textAlign: 'center' }}> */} 
                    <Content>
                      <Dropdown className="drop" overlay={this.menu} placement="bottomCenter">
                          <Button className="button_drop">{this.state.place}</Button>
                      </Dropdown>
                      
                      <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
                    </Content>
                    {/*</div>*/}
                </Content>
            </React.Fragment>
        );
    }
}

export default Mapa;