import React,{ useState } from 'react';
// import ReactDOM from 'react-dom';
import Home from './pages/Home/Home';
import HeaderF from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Shop from './pages/Shop/Shop';
import About from './pages/About/About';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import PageTitle from './components/Page-Title/pageTitle';
import Product from './pages/Product/Product';
import Error404 from './pages/404/404';
import Profile from './pages/Profile/Profile';
import Order from './pages/Order/Order';
// import Login from './pages/Login/Login';
// import Register from './pages/Register/Register';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Admin from './admin/index';
import HomePage from './admin/pages/Home/Home';
import ManageBook from './admin/pages/ManageBook/ManageBook';
import ManageAuthor from './admin/pages/ManageAuthor/ManageAuthor';
import ManageCategory from './admin/pages/ManageCategory/ManageCategory';
import ManagePublisher from './admin/pages/ManagePublisher/ManagePublisher';
import ManageDiscount from './admin/pages/ManageDiscount/ManageDiscount';
import ManageOrder from './admin/pages/ManageOrder/ManageOrder';
import ManageUser from './admin/pages/ManageUser/ManageUser';
import {Button} from 'react-bootstrap';
import 'antd/dist/antd.css';
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
const { Header, Sider, Content } = Layout;

function App() {
  const test = window.location.href;
 
  const RouteClient = () => {
    return (
      <>
      <HeaderF />
        {/* Config Routes pages */}
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="shop">
            <Route path=":id" element={<Product />} />
            <Route index element={<Shop />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile/>}/>
          <Route path="order" element={<Order/>} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      <Footer />
      </>
    );
  }

  const RouteAdmin = () => {   
    const handleLogout = () => {
      navigate('/');
      window.location.reload();
    }
      document.title = "welcome to admin";
      const navigate = useNavigate();
      const [collapsed, setCollapsed] = useState(false);
      const [theme, setTheme] = useState('dark');
      const [current, setCurrent] = useState('1');
      const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
      };
      const onClick = (e) => {
        var i = e.key;
        switch (i) {
          case '1':
            navigate('/admin');
            break;
          case '2':
            navigate('/admin/ManageUser');
            break;
          case '3':
            navigate('/admin/ManageBook');
            break;
          case '4':
            navigate('/admin/ManageOrder');
            break;
          case '5':
            navigate('/admin/ManageCategory');
            break;
          case '6':
            navigate('/admin/ManageAuthor');
            break;
          case '7':
            navigate('/admin/ManagePublisher');
            break;
          case '8':
            navigate('/admin/ManageDiscount');
            break;
          default:
            break;
        }
        setCurrent(i);
      };
      
    return (
      <Layout >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme={theme}
            mode="inline"
            defaultSelectedKeys={['3']}
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
                icon: <ReconciliationOutlined />,
                label: 'Manage Order',
              },
              {
                key: '5',
                icon: <FormOutlined />,
                label: 'Manage Category',
              },
              {
                key: '6',
                icon: <FormOutlined />,
                label: 'Manage Author',
              },
              {
                key: '7',
                icon: <FormOutlined />,
                label: 'Manage Publisher',
              },
              {
                key: '8',
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
          <Button variant="light" style={{marginLeft: "1500px"}} onClick={handleLogout}>
            <UserOutlined />Log out
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
              <Route path="admin" element={<HomePage />} />
              <Route path="admin/ManageBook" element={<ManageBook />} />
              <Route path="admin/ManageAuthor" element={<ManageAuthor />} />
              <Route path="admin/ManageCategory" element={<ManageCategory />} />
              <Route path="admin/ManagePublisher" element={<ManagePublisher />} />
              <Route path="admin/ManageDiscount" element={<ManageDiscount />} />
              <Route path="admin/ManageOrder" element={<ManageOrder />} />
              <Route path="admin/ManageUser" element={<ManageUser />} />
            </Routes> 
          </Content>
        </Layout>
      </Layout>
    );
  }
  return (
      <div className="d-flex flex-column m-height-100"> 
        {
          test.indexOf('admin', 0) != -1 && sessionStorage.getItem('adminIsLogin')  ? <RouteAdmin /> : <RouteClient />
        }
      </div>
  );
}

export default App;