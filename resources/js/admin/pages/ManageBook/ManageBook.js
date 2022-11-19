import './managebook.css';
import Images from "../../../../assets";
import defaultBookCover from '../../../../assets/bookcover/defaultbook.png';
import {Link} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
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
    UploadOutlined,
} from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ManageBook = () => {
    const [bookListData, setBookListData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [allAuthor, setAllAuthor] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [allPublisher, setAllPublisher] = useState([]);
    const [componentDisabled, setComponentDisabled] = useState(false);
    const [checkCategoryIS, setCheckCategoryIS] = useState(false);
    const [messageCategoryIS, setMessageCategoryIS] = useState("");
    const [checkAuthorIS, setCheckAuthorIS] = useState(false);
    const [messageAuthorIS, setMessageAuthorIS] = useState("");
    const [checkPublisherIS, setCheckPublisherIS] = useState(false);
    const [messagePublisherIS, setMessagePublisherIS] = useState("");
    const [checkBookTitleIS, setCheckBookTitleIS] = useState(false);
    const [messageBookTitleIS, setMessageBookTitleIS] = useState("");
    const [checkBookSummaryIS, setCheckBookSummaryIS] = useState(false);
    const [messageBookSummaryIS, setMessageBookSummaryIS] = useState("");
    const [checkQuantityIS, setCheckQuantityIS] = useState(false);
    const [messageQuantityIS, setMessageQuantityIS] = useState("");
    const [checkBookPriceIS, setCheckBookPriceIS] = useState(false);
    const [messageBookPriceIS, setMessageBookPriceIS] = useState("");
    const [dataInsert, setDataInsert] = useState({
        category: 1,
        author: 1,
        publisher: 1,
        book_title: "",
        book_summary: "",
        quantity: "",
        book_price: "",
        upload: "",

    });
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
            const bookList = await servicesForManageBook.getBookAdmin();
            const resultAuthors = await servicesForManageBook.getAuthor();
            const resultCategories = await servicesForManageBook.getCategory();
            const resultPublishers = await servicesForManageBook.getPublisher();
            setBookListData(bookList);
            setAllAuthor(resultAuthors.data);
            setAllCategory(resultCategories.data);
            setAllPublisher(resultPublishers.data);
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

    const ModalUpdate = (id) => {
        return (
            <Modal
                title="Update Information Book"
                open={openUpdate}               
                footer={null}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>ahihi</p>
            </Modal>
        );
    }
    const handleModalUpdate = (id) => {
        console.log(id);
        setOpenUpdate(true);
        console.log(openUpdate);
        <ModalUpdate id={id} />
    }
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
                <Button type="text" onClick={() => handleModalUpdate(book.id)} icon={<SettingOutlined />} >
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
        const InsertBook = async () => {
            try {
                // truyền object sang productAPI và nhận về response
                const c = await servicesForManageBook.insertBook({
                    category_id: dataInsert.category,
                    author_id: dataInsert.author,
                    publisher_id: dataInsert.publisher,
                    book_title: dataInsert.book_title,
                    book_summary: dataInsert.book_summary,
                    quantity: dataInsert.quantity,
                    book_price: dataInsert.book_price,
                    book_cover_photo: null,
                });
                if(c.status_code !== 422) {
                    alert('success');
                } else {
                    if(typeof c.data.category_id !== "undefined") {
                        setCheckCategoryIS(true);
                        setMessageCategoryIS(c.data.category_id[0]);        
                    } else {
                        setCheckCategoryIS(false);
                        setMessageCategoryIS("");     
                    }

                    if(typeof c.data.author_id !== "undefined") {
                        setCheckAuthorIS(true);
                        setMessageAuthorIS(c.data.author_id[0]); 
                    } else {
                        setCheckCategoryIS(false);
                        setMessageCategoryIS(""); 
                    }

                    if(typeof c.data.publisher_id !== "undefined") {
                        setCheckPublisherIS(true);
                        setMessagePublisherIS(c.data.publisher_id[0]);        
                    } else {
                        setCheckPublisherIS(false);
                        setMessagePublisherIS(""); 
                    }
                    
                    if(typeof c.data.book_title !== "undefined") {
                        setCheckBookTitleIS(true);
                        setMessageBookTitleIS(c.data.book_title[0]);        
                    } else {
                        setCheckBookTitleIS(false);
                        setMessageBookTitleIS("");     
                    }

                    if(typeof c.data.book_summary !== "undefined") {
                        setCheckBookSummaryIS(true);
                        setMessageBookSummaryIS(c.data.book_summary[0]);        
                    } else {
                        setCheckBookSummaryIS(false);
                        setMessageBookSummaryIS("");     
                    }

                    if(typeof c.data.quantity !== "undefined") {
                        setCheckQuantityIS(true);
                        setMessageQuantityIS(c.data.quantity[0]);        
                    } else {
                        setCheckQuantityIS(false);
                        setMessageQuantityIS("");     
                    }

                    if(typeof c.data.book_price !== "undefined") {
                        setCheckBookPriceIS(true);
                        setMessageBookPriceIS(c.data.book_price[0]);        
                    } else {
                        setCheckBookPriceIS(false);
                        setMessageBookPriceIS("");     
                    }
                }        
            } catch (error) {
                console.log(error);
            }
        }
        InsertBook();
    }

    const props = {
        action: '../../../../assets',
        listType: 'picture',
        beforeUpload(file) {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const img = document.createElement('img');
              img.src = reader.result;
              img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                ctx.fillStyle = 'red';
                ctx.textBaseline = 'middle';
                ctx.font = '33px Arial';
                ctx.fillText('Ant Design', 20, 20);
                canvas.toBlob((result) => resolve(result));
              };
            };
          });
        },
    };

    function handle(e) {
        let newData ={...dataInsert}
        newData[e.target.id] = e.target.value;
        setDataInsert(newData);
    }

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
                        <Form.Item label="Book_title">
                            <Input id="book_title" onChange={(e) => handle(e)} value={dataInsert.book_title} />
                            {
                                checkBookTitleIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messageBookTitleIS}
                                    </Alert> 
                                </small> : ""
                            }
                        </Form.Item>
                        <Form.Item label="Book_summary">
                            <TextArea rows={3} id="book_summary" onChange={(e) => handle(e)} value={dataInsert.book_summary} />
                            {
                                checkBookSummaryIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messageBookSummaryIS}
                                    </Alert> 
                                </small> : ""
                            }
                        </Form.Item>

                        <Form.Item label="Quantity">
                            <Input id="quantity" onChange={(e) => handle(e)} value={dataInsert.quantity} />
                            {
                                checkQuantityIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messageQuantityIS}
                                    </Alert> 
                                </small> : ""
                            }
                        </Form.Item>

                        <Form.Item label="Book_price">
                            <Input id="book_price" onChange={(e) => handle(e)} value={dataInsert.book_price} />
                            {
                                checkBookPriceIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messageBookPriceIS}
                                    </Alert> 
                                </small> : ""
                            }
                        </Form.Item>

                        <Form.Item label="Author"> 
                            <select className="form-select" id="author" onChange={(e) => handle(e)} value={dataInsert.author}>
                            {
                                allAuthor.map((item,index) => (                                
                                    <option key={index} value={item.author_id}>{item.author_name}</option>
                                ))
                            }                    
                            </select>
                            {
                                checkAuthorIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messageAuthorIS}
                                    </Alert> 
                                </small> : ""
                            }
                        </Form.Item>

                        <Form.Item label="Category"> 
                            <select className="form-select" id="category" onChange={(e) => handle(e)} value={dataInsert.cactegory}>
                            {
                                allCategory.map((item,index) => (                                
                                    <option key={index} value={item.category_id}>{item.category_name}</option> 
                                ))
                            }                    
                            </select>  
                            {
                                checkCategoryIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messageCategoryIS}
                                    </Alert> 
                                </small> : ""
                            }     
                        </Form.Item>

                        <Form.Item label="Publisher">
                            <select className="form-select" id="publisher" onChange={(e) => handle(e)} value={dataInsert.publisher}>
                            {
                                allPublisher.map((item,index) => (                                
                                    <option key={index} value={item.publisher_id}>{item.publisher_name}</option> 
                                ))
                            }                    
                            </select> 
                            {
                                checkPublisherIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messagePublisherIS}
                                    </Alert> 
                                </small> : ""
                            }
                        </Form.Item>

                        <Form.Item label="Book_cover_photo" valuePropName="fileList">
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                        </Form.Item>
                        <Button type="primary" onClick={handleCancel}>Cancle</Button>
                        <Button type="submit" onClick={(e) => handleSubmit(e)}>Submit</Button>
                    </Form>
                </Modal>
            </Col>
        </Row>
        <Modal
                title="Update Information Book"
                open={openUpdate}               
                footer={null}
                confirmLoading={confirmLoading}
                onCancel={handleCancelUpdate}
            >
                <p>ahihi</p>
            </Modal>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Container>
    );
}

export default ManageBook;