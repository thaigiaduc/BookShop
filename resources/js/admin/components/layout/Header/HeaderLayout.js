import "./headerLayout.css";
import React, { useState } from 'react';
import {Button} from 'react-bootstrap';
import 'antd/dist/antd.css';
import HomePage from '../../../pages/Home/Home';
import ManageBook from '../../../pages/ManageBook/ManageBook';
import ManageOrder from '../../../pages/ManageOrder/ManageOrder';
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
const { Header, Sider, Content } = Layout;
function HeaderLayout() {
    
}

  
export default HeaderLayout;