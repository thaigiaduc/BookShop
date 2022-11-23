import HomePage from './pages/Home/Home';
import ManageBook from './pages/ManageBook/ManageBook';
import React, { useState } from 'react';
import {Button} from 'react-bootstrap';
import 'antd/dist/antd.css';
import './index.css'
import { useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  BookOutlined,
  BarChartOutlined,
  ReconciliationOutlined,
  FormOutlined,
  DollarCircleOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Switch } from 'antd';
import {Routes, Route } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

function Admin() {
    document.title = "welcome to admin";
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState('dark');
    const [current, setCurrent] = useState('1');
    const changeTheme = (value) => {
      setTheme(value ? 'dark' : 'light');
    };
    const onClick = (e) => {
      console.log('click ', e);
      var i = e.key;
      switch (i) {
        case '1':
          navigate('/admin');
          break;
        case '2':
          console.log('2');
          break;
        case '3':
          navigate('/ManageBook');
          break;
        case 4:
          
          break;
        case 5:
          navigate('/ManageOrder');
          break;
        case 6:
          
          break;
        case 7:
          
          break;
        case 8:
          
          break;
        case 9:
          
          break;
        default:
          break;
      }
      setCurrent(e.key);
    };
    
  return (
    <Layout >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme={theme}
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick = {onClick}
          selectedKeys={[current]}
          style={{height: "900px"}}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Home',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Manage User',
            },
            {
              key: '3',
              icon: <BookOutlined />,
              label: 'Manage Book',
            },
            {
              key: '4',
              icon: <BarChartOutlined />,
              label: 'Statistic',
            },
            {
              key: '5',
              icon: <ReconciliationOutlined />,
              label: 'Manage Order',
            },
            {
              key: '6',
              icon: <FormOutlined />,
              label: 'Manage Category',
            },
            {
              key: '7',
              icon: <FormOutlined />,
              label: 'Manage Author',
            },
            {
              key: '8',
              icon: <FormOutlined />,
              label: 'Manage Publisher',
            },
            {
              key: '9',
              icon: <DollarCircleOutlined />,
              label: 'Manage Promotion',
            },
            
          ]}
        />
      </Sider>
      <Layout id="contentAdmin" className="site-layout" style={{padding: "60px 20px 0px 20px"}}>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        <Switch
          checked={theme === 'dark'}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <Button variant="light" style={{marginLeft: "1500px"}}>
          <UserOutlined />Log in
        </Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route index path="/" element={<HomePage />} />
            {/* <Route index path="/" element={<ManageBook />} /> */}
            {/* <Route path="shop">
                      <Route path=":id" element={<Product />} />
                      <Route index element={<Shop />} />
            </Route>
            <Route path="cart" element={<Cart />} />
            <Route path="about" element={<About />} /> */}
            {/* <Route path="*" element={<Error404 />} /> */}
          </Routes> 
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;