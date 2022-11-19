import './managebook.css';
import Images from "../../../../assets";
import defaultBookCover from '../../../../assets/bookcover/defaultbook.png';
import {Link} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import servicesForManageBook from '../../../Services/servicesForManageBook';
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
} from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ManageBook = () => {
    const [bookListData, setBookListData] = useState([]);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [allAuthor, setAllAuthor] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [allPublisher, setAllPublisher] = useState([]);
    const [defaultAuthor, setDefaultAuthor] = useState("");
    const [defaultCategory, setDefaultCategory] = useState("");
    const [defaultPublisher, setDefaultPublisher] = useState("");
    const [modalText, setModalText] = useState('Content of the modal');
    const [componentDisabled, setComponentDisabled] = useState(false);
    const onFormLayoutChange = ({ disabled }) => {
        setComponentDisabled(disabled);
    };
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    useEffect(() => {
        const fetchProductList = async () => {
            const bookList = await servicesForManageBook.getBookAdmin();
            const resultAuthors = await servicesForManageBook.getAuthor();
            const resultCategories = await servicesForManageBook.getCategory();
            const resultPublishers = await servicesForManageBook.getPublisher();
            setBookListData(bookList);
            setAllAuthor(resultAuthors.data);
            setAllCategory(resultCategories.data);
            setAllPublisher(resultPublishers.data);
            setDefaultAuthor(resultAuthors.data[0].author_name);
            setDefaultCategory(resultCategories.data[0].category_name);
            setDefaultPublisher(resultPublishers.data[0].publisher_name);
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
            title: 'Category',
            dataIndex: 'category',
        //   defaultSortOrder: 'descend',
        //   sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Author',
            dataIndex: 'author',
          //   defaultSortOrder: 'descend',
          //   sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Publisher',
            dataIndex: 'publisher',
          //   defaultSortOrder: 'descend',
          //   sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Book_title',
            dataIndex: 'book_title',
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
            title: 'Book_summary',
            dataIndex: 'book_summary',
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
            title: 'Book_price',
            dataIndex: 'book_price',
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
            title: 'Book_cover_photo',
            dataIndex: 'book_cover_photo',
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
    bookListData.map((book) => {
        var dataItem = {
            key: book.id,
            id: book.id,
            category: book.category_name,
            author: book.author_name,
            publisher: book.publisher_name,
            book_title: book.book_title,
            book_summary: book.book_summary,
            book_price: book.book_price,
            book_cover_photo: 
            <Image
                width={200}
                src={book.book_cover_photo ? Images[book.book_cover_photo]:Images['defaultBook']}
            />,   
            update: 
                <Button type="text" icon={<SettingOutlined />}>
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

    
    return (
      <Container fluid>
        <Row>
            <Col xs lg={10}>
                <h2>Manage Book</h2>
            </Col>
            <Col xs lg={2}>
                <Button color="secondary" onClick={showModal}>Create new Book</Button>
                <Modal
                    title="Create New Book"
                    open={open}               
                    footer={null}
                    confirmLoading={confirmLoading}
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
                        <Form.Item label="Book_title">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Book_summary">
                            <TextArea rows={3} />
                        </Form.Item>

                        <Form.Item label="Quantity">
                            <InputNumber min={1} max={50} defaultValue={1} />
                        </Form.Item>

                        <Form.Item label="Book_price">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Author">
                            <Select defaultValue={defaultAuthor}>
                            {
                                allAuthor.map((item,index) => (                                
                                    <Select.Option key={index} value={item.author_name}>{item.author_name}</Select.Option>  
                                ))
                            }
                            </Select>
                        </Form.Item>

                        <Form.Item label="Category">
                            <Select defaultValue={defaultCategory}>
                            {
                                allCategory.map((item,index) => (                                
                                    <Select.Option key={index} value={item.category_name}>{item.category_name}</Select.Option>  
                                ))
                            }
                            </Select>
                        </Form.Item>

                        <Form.Item label="Publisher">
                            <Select defaultValue={defaultPublisher}>
                            {
                                allPublisher.map((item,index) => (                                
                                    <Select.Option key={index} value={item.publisher_name}>{item.publisher_name}</Select.Option>  
                                ))
                            }
                            </Select>
                        </Form.Item>

                        <Form.Item label="Book_cover_photo" valuePropName="fileList">
                            <Upload action="/upload.do" listType="picture-card">
                                <div>
                                <PlusOutlined />
                                <div
                                    style={{
                                    marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Button type="primary" onClick={handleCancel}>Cancle</Button>
                        <Button type="submit" >Submit</Button>
                    </Form>
                </Modal>
            </Col>
        </Row>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Container>
    );
}

export default ManageBook;