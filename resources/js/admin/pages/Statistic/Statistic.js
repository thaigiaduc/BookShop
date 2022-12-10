import {Link} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import serviceForStatistic from '../../../Services/serviceForStatistic';
import { 
    Table, 
    Image, 
    Modal, 
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload, } from 'antd';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import {
    SettingOutlined,
    CloseOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Statistic = () => {
    const [allStatistic, setAllStatistic] = useState([]);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [componentDisabled, setComponentDisabled] = useState(false);
    const [showBookStatistic, setShowBookStatistic] = useState(false);
    const [allOrderItems, setAllOrderItems] = useState([]);
    const [statistic, setStatistic] = useState('user');
    const [filterType, setFilterType] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [filterTypeName, setFilterTypeName] = useState('');
    const [filterValueName, setFilterValueName] = useState('');
    var show=[1,2,3,4,5,6,7,8,9,10];
    const onFormLayoutChange = ({ disabled }) => {
        setComponentDisabled(disabled);
    };


    useEffect(() => {
        const fetchProductList = async () => {
            if(filterValue!=''){
            const allStatistic = await serviceForStatistic.getStatistic(statistic, filterType, filterValue);
            setAllStatistic(allStatistic.data);
            }
            else {
                const allStatistic = await serviceForStatistic.getStatistic(statistic, '', '');
                setAllStatistic(allStatistic.data);
            }
        };
        fetchProductList();
    }, [statistic, filterValue]);
    const columns = [
        {
          title: 'user',
          dataIndex: 'user',
        },
        {
            title: 'orders',
            dataIndex: 'orders',
        },
        {
            title: 'amount',
            dataIndex: 'amount',
        },
        {
            title: 'awaiting accept',
            dataIndex: 'order_status_1',
        },
        {
            title: 'accepted',
            dataIndex: 'order_status_2',
        },
        {
            title: 'shipped',
            dataIndex: 'order_status_3',
        },
        {
            title: 'cancelled',
            dataIndex: 'order_status_4',
        }, 
    ];
    const columns2 = [
        {
            title: 'book',
            dataIndex: 'book',
          },
          {
              title: 'quantity',
              dataIndex: 'quantity',
          },
          {
              title: 'amount',
              dataIndex: 'amount',
          },
          {
              title: 'awaiting accept',
              dataIndex: 'order_status_1',
          },
          {
              title: 'accepted',
              dataIndex: 'order_status_2',
          },
          {
              title: 'shipped',
              dataIndex: 'order_status_3',
          },
          {
              title: 'cancelled',
              dataIndex: 'order_status_4',
          }, 
    ];
    const data = [];
    if(!showBookStatistic)
    allStatistic.map((user) => {
        let order_status_1=0;
        let order_status_2=0;
        let order_status_3=0;
        let order_status_4=0;
        user.count_order_status.map((orderStatus)=>{
            switch(orderStatus.order_status){
                case 1:{
                    order_status_1 = orderStatus.count_order_status;
                    break;
                }
                case 2:{
                    order_status_2 = orderStatus.count_order_status;
                    break;
                }
                case 3:{
                    order_status_3 = orderStatus.count_order_status;
                    break;
                }
                case 4:{
                    order_status_4 = orderStatus.count_order_status;
                    break;
                }
            }
        });
        var dataItem = {
            key: user.id,
            id: user.id,
            user: user.email,
            orders: user.order_bill,
            status: user.order_status,
            amount: user.order_amount,
            order_status_1: order_status_1,
            order_status_2: order_status_2,
            order_status_3: order_status_3,
            order_status_4: order_status_4,
        }
        data.push(dataItem);
    }); 
    else {
        allStatistic.map((book) => {
            let order_status_1=0;
            let order_status_2=0;
            let order_status_3=0;
            let order_status_4=0;
            book.count_order_status.map((orderStatus)=>{
                switch(orderStatus.order_status){
                    case 1:{
                        order_status_1 = orderStatus.count_order_status;
                        break;
                    }
                    case 2:{
                        order_status_2 = orderStatus.count_order_status;
                        break;
                    }
                    case 3:{
                        order_status_3 = orderStatus.count_order_status;
                        break;
                    }
                    case 4:{
                        order_status_4 = orderStatus.count_order_status;
                        break;
                    }
                }
            });
            var dataItem = {
                key: book.book_id,
                book: book.book_title,
                quantity: book.quantity,
                amount: book.amount,
                order_status_1: order_status_1,
                order_status_2: order_status_2,
                order_status_3: order_status_3,
                order_status_4: order_status_4,
            }
            data.push(dataItem);
        }); 
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const showDropdown = () =>{
        if(filterType == 1){
            return (
            <Col xs lg={3}>
            <Dropdown>
            <Dropdown.Toggle variant="secondary">
                {filterValueName ? filterValueName: 'Select Month'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>handleFilterValue(1,'January')}  eventKey="1">January</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(2,'February')}  eventKey="2">February</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(3,'March')} eventKey="3">March</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(4,'April')} eventKey="4">April</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(5,'May')} eventKey="5">May</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(6,'June')} eventKey="6">June</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(7,'July')} eventKey="7">July</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(8,'August')} eventKey="8">August</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(9,'September')} eventKey="9">September</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(10,'October')} eventKey="10">October</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(11,'November')} eventKey="11">November</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(12,'December')} eventKey="12">December</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </Col>
        );
        }
        if(filterType == 2){
            return (
        <Col xs lg={3}>
        <Dropdown>
        <Dropdown.Toggle variant="secondary">
        {filterValueName ? filterValueName: 'Select Quarter'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>handleFilterValue(1,'First')}  eventKey="1">First</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(2,'Second')}  eventKey="2">Second</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(3,'Third')} eventKey="3">Third</Dropdown.Item>
              <Dropdown.Item onClick={()=>handleFilterValue(4,'Fourth')} eventKey="4">Fourth</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </Col>
            );
        }
        if(filterType == 3){
            return (
    <Col xs lg={3}>
        <Dropdown>
        <Dropdown.Toggle variant="secondary" >
                 {filterValueName ? filterValueName: 'Select Year'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {show.map((value)=>{
                let showValue = 2017+value;
                return(
                    <Dropdown.Item onClick={()=>handleFilterValue(showValue,showValue)} eventKey="4">{showValue}</Dropdown.Item>
                );  
              })}
            </Dropdown.Menu>
        </Dropdown>
    </Col>
            );
        }
    }
    const handleShow = (statisticType) =>{
        if(statisticType==1){
        setStatistic('user');
        setShowBookStatistic(false);
        }
        else{
        setStatistic('book');
        setShowBookStatistic(true);
        }
    } 
    const handleFilterType = (filter)=>{
        switch(filter){
            case 1:{
                setFilterType(1);
                setFilterValue('');
                setFilterValueName('');
                setFilterTypeName('Filter By Month');
                break;
            }
            case 2:{
                setFilterType(2);
                setFilterValue('');
                setFilterValueName('');
                setFilterTypeName('Filter By Quarter');
                break;
            }
            case 3:{
                setFilterType(3);
                setFilterValue('');
                setFilterValueName('');
                setFilterTypeName('Filter By Year');
                break;
            }
        }
    }
    const handleFilterValue= (filter,name)=>{
        setFilterValue(filter);
        setFilterValueName(name);

    }
    return (
      <Container fluid>
        <Row>
            <Col xs lg={2}>
                <h2>Statistic</h2>
            </Col>
            <Col xs lg={2}>
                <Dropdown>
                <Dropdown.Toggle variant="secondary">
                         {statistic}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>handleShow(1)}  eventKey="1">User</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handleShow(2)}  eventKey="2">Book</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col xs lg={2}>
                <Dropdown>
                <Dropdown.Toggle variant="secondary">
                         {filterTypeName ? filterTypeName:'Select Filter Type'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>handleFilterType(1)}  eventKey="1">Month</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handleFilterType(2)}  eventKey="2">Quarter</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handleFilterType(3)} eventKey="3">Year</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            {showDropdown()}
         </Row>
        <Table columns={showBookStatistic ? columns2 : columns} dataSource={data} onChange={onChange} />
      </Container>
    );
}

export default Statistic;