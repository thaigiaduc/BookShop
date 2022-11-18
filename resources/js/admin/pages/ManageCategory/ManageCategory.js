import './managecategory.css';
import Images from "../../../../assets";
import defaultBookCover from '../../../../assets/bookcover/defaultbook.png';
import {Link} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import servicesForManageCategory from '../../../Services/servicesForManageCategory';
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
import { Container, Row, Col } from 'react-bootstrap';
import {
    SettingOutlined,
    CloseOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ManageCategory = () => {
    const [categoryListData, setCategoryListData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [componentDisabled, setComponentDisabled] = useState(false);
    const [dataInsert, setDataInsert] = useState({
        category_name: "",
        category_desc: "",
    });
    const [checkCategoryNameIS, setCheckCategoryNameIS] = useState(false);
    const [messageCategoryNameIS, setMessageCategoryNameIS] = useState("");
    const [checkCategoryDescIS, setCheckCategoryDescIS] = useState(false);
    const [messageCategoryDescIS, setMessageCategoryDescIS] = useState("");
    const onFormLayoutChange = ({ disabled }) => {
        setComponentDisabled(disabled);
    };

    const showModal = () => {
        setOpen(true);
    };

    const showModalUpdate = () => {
        setOpenUpdate(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleCancelUpdate = () => {
        setOpenUpdate(false);
    };

    useEffect(() => {
        const fetchProductList = async () => {
            const categoryList = await servicesForManageCategory.getCategoryAdmin();
            setCategoryListData(categoryList);      
        };
      fetchProductList();
    }, []);
    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
        //   filters: [
        //     {
        //       text: 'Joe',
        //       value: 'Joe',
        //     },
        //     {
        //       text: 'Jim',
        //       value: 'Jim',
        //     },
        //     {
        //       text: 'Submenu',
        //       value: 'Submenu',
        //       children: [
        //         {
        //           text: 'Green',
        //           value: 'Green',
        //         },
        //         {
        //           text: 'Black',
        //           value: 'Black',
        //         },
        //       ],
        //     },
        //   ],
          // specify the condition of filtering result
          // here is that finding the name started with `value`
        //   onFilter: (value, record) => record.name.indexOf(value) === 0,
        //   sorter: (a, b) => a.name.length - b.name.length,
        //   sortDirections: ['descend'],
        },
        {
            title: 'Category Name',
            dataIndex: 'category_name',
        //   defaultSortOrder: 'descend',
        //   sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Category desc',
            dataIndex: 'category_desc',
          //   defaultSortOrder: 'descend',
          //   sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Update',
            dataIndex: 'update',
        //   filters: [
        //     {
        //       text: 'London',
        //       value: 'London',
        //     },
        //     {
        //       text: 'New York',
        //       value: 'New York',
        //     },
        //   ],
        //  onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
        //   filters: [
        //     {
        //       text: 'London',
        //       value: 'London',
        //     },
        //     {
        //       text: 'New York',
        //       value: 'New York',
        //     },
        //   ],
        //  onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
    ];
    const data = [];
    categoryListData.map((category) => {
        var dataItem = {
            key: category.id,
            id: category.id,
            category_name: category.category_name,
            category_desc: category.category_desc,
            update: 
                <Button type="text" icon={<SettingOutlined />} >
                </Button>,
            delete: 
                <Button type="text" icon={<CloseOutlined />}>
                </Button>,
        }
        data.push(dataItem);
    }); 

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const InsertCategory = async () => {
            try {
                // truyền object sang productAPI và nhận về response
                const c = await servicesForManageCategory.insertCategory({
                    category_name: dataInsert.category_name,
                    category_desc: dataInsert.category_desc,
                });
                if(c.status_code !== 422) {
                    alert('success');
                    window.location.reload();
                } else {
                    if(typeof c.data.category_name !== "undefined") {
                        setCheckCategoryNameIS(true);
                        setMessageCategoryNameIS(c.data.category_name[0]);        
                    } else {
                        setCheckCategoryNameIS(false);
                        setMessageCategoryNameIS("");     
                    }

                    if(typeof c.data.category_desc !== "undefined") {
                        setCheckCategoryDescIS(true);
                        setMessageCategoryDescIS(c.data.category_desc[0]);        
                    } else {
                        setCheckCategoryDescIS(false);
                        setMessageCategoryDescIS("");     
                    }
                    
                }        
            } catch (error) {
                console.log(error);
            }
        }
        InsertCategory();
    }

    function handle(e) {
        let newData ={...dataInsert}
        newData[e.target.id] = e.target.value;
        setDataInsert(newData);
    }

    return (
      <Container fluid>
        <Row>
            <Col xs lg={10}>
                <h2>Manage Category</h2>
            </Col>
            <Col xs lg={2}>
                <Button color="secondary" onClick={showModal}>Create new Category</Button>
                <Modal
                    title="Create New Category"
                    open={open}               
                    footer={null}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <Form
                        labelCol={{
                            span: 8,
                          }}
                          wrapperCol={{
                            span: 14,
                          }}
                          layout="horizontal"
                          onValuesChange={onFormLayoutChange}
                          disabled={componentDisabled}
                    >
                        <Form.Item label="Category_name">
                            <Input id="category_name" onChange={(e) => handle(e)} value={dataInsert.category_name} />
                            {
                                checkCategoryNameIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messageCategoryNameIS}
                                    </Alert> 
                                </small> : ""
                            }
                        </Form.Item>

                        <Form.Item label="Category_desc">
                            <TextArea rows={3} id="category_desc" onChange={(e) => handle(e)} value={dataInsert.category_desc} />
                            {
                                checkCategoryDescIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messageCategoryDescIS}
                                    </Alert> 
                                </small> : ""
                            }
                        </Form.Item>
                        <Button type="primary" onClick={handleCancel}>Cancle</Button>
                        <Button type="submit" onClick={(e) => handleSubmit(e)}>Submit</Button>
                    </Form>
                </Modal>

                <Modal
                    title="Update Information Book"
                    open={openUpdate}               
                    footer={null}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    
                </Modal>
            </Col>
        </Row>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Container>
    );
}

export default ManageCategory;