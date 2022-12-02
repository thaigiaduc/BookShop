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
    const [idUpdate, setIdUpdate] = useState(1);
    const [bookListData, setBookListData] = useState([]);
    const [bookDetailsData, setBookDetailsData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [allAuthor, setAllAuthor] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [allPublisher, setAllPublisher] = useState([]);
    const [componentDisabled, setComponentDisabled] = useState(false);
    // title update
    const [upBookTitle, setUpBookTitle] = useState("");
    // check lỗi insert
    /////////////////////////////////////////////////////////////////////
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
    ////////////////////////////////////////////////////////////////////
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
    const [dataUpdate, setDataUpdate] = useState({
        category_update: 1,
        author_update: 1,
        publisher_update: 1,
        category_name_update: "",
        author_name_update: "",
        publisher_name_update: "",
        book_title_update: "",
        book_summary_update: "",
        quantity_update: 1,
        book_price_update: "",
        upload_update: "",
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

    const handleModalUpdate = (id) => {
        setIdUpdate(id);
        setOpenUpdate(true);
    }

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

    useEffect(() => {
        const fetchProductDetails = async () => {
            const bookdetails = await servicesForManageBook.getDetails(idUpdate);
            setBookDetailsData(bookdetails);
            setDataUpdate({
                category_update: bookdetails[0].category_id,
                category_name_update: bookdetails[0].category_name,
                author_update: bookdetails[0].author_id,
                author_name_update: bookdetails[0].author_name,
                publisher_update: bookdetails[0].publisher_id,
                publisher_name_update: bookdetails[0].publisher_name,
                book_title_update: bookdetails[0].book_title,
                book_summary_update: bookdetails[0].book_summary,
                quantity_update: bookdetails[0].quantity,
                book_price_update: bookdetails[0].book_price,
                upload_update: bookdetails[0].book_cover_photo,
            })
        };
        fetchProductDetails();
    }, [idUpdate]);
    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Publisher',
            dataIndex: 'publisher',
        },
        {
            title: 'Book_title',
            dataIndex: 'book_title',
        },
        {
            title: 'Book_summary',
            dataIndex: 'book_summary',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Book_price',
            dataIndex: 'book_price',
        },
        {
            title: 'Book_cover_photo',
            dataIndex: 'book_cover_photo',
        },
        {
            title: 'Update',
            dataIndex: 'update',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
        },
    ];

    const data = [];
    if(bookListData.length > 0) {
        bookListData.map((book) => {
            var dataItem = {
                key: book.id,
                id: book.id,
                category: book.category_name,
                author: book.author_name,
                publisher: book.publisher_name,
                book_title: book.book_title,
                book_summary: book.book_summary,
                quantity: book.quantity,
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
    }

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

    function handleSubmitUpdate(e) {
        e.preventDefault();
        const UpdateBook = async () => {
            try {
                // truyền object sang productAPI và nhận về response
                const c = await servicesForManageBook.updateBook({
                    category_id: dataUpdate.category_update,
                    author_id: dataUpdate.author_update,
                    publisher_id: dataUpdate.publisher_update,
                    book_title: dataUpdate.book_title_update,
                    book_summary: dataUpdate.book_summary_update,
                    quantity: dataUpdate.quantity_update,
                    book_price: dataUpdate.book_price_update,
                    book_cover_photo: null,
                },idUpdate);
                if(c.status_code !== 422) {
                    alert('success');
                } else {
                    alert('failed');
                }        
            } catch (error) {
                console.log(error);
            }
        }
        UpdateBook();
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

    function handleUpdate(e) {
        let newData ={...dataUpdate}
        newData[e.target.id] = e.target.value;
        setDataUpdate(newData);
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
                                    <option key={index} value={item.id}>{item.author_name}</option>
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
                            <select className="form-select" id="category" onChange={(e) => handle(e)} value={dataInsert.category}>
                            {
                                allCategory.map((item,index) => (                                
                                    <option key={index} value={item.id}>{item.category_name}</option> 
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
                                    <option key={index} value={item.id}>{item.publisher_name}</option> 
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
                        <h5>ID: {idUpdate}</h5>
                        <Form.Item label="Book_title">
                            <Input id="book_title_update" onChange={(e) => handleUpdate(e)} value={dataUpdate.book_title_update} />
                        </Form.Item>

                        <Form.Item label="Book_summary">
                            <TextArea rows={3} id="book_summary_update" onChange={(e) => handleUpdate(e)} value={dataUpdate.book_summary_update} />
                        </Form.Item>

                        <Form.Item label="Quantity">
                            <Input id="quantity_update" onChange={(e) => handleUpdate(e)} value={dataUpdate.quantity_update} />
                        </Form.Item>

                        <Form.Item label="Book_price">
                            <Input id="book_price_update" onChange={(e) => handleUpdate(e)} value={dataUpdate.book_price_update} />
                        </Form.Item>

                        <Form.Item label="Author"> 
                            <select className="form-select" id="author_update" onChange={(e) => handleUpdate(e)} value={dataUpdate.author_update}>
                                <option onChange={(e) => handleUpdate(e)} defaultValue = {dataUpdate.author_update}>{dataUpdate.author_name_update}</option>
                            {
                                allAuthor.map((item,index) => (                                
                                    <option key={index} value={item.id}>{item.author_name}</option>
                                ))
                            }                    
                            </select>
                        </Form.Item>

                        <Form.Item label="Category"> 
                            <select className="form-select" id="category_update" onChange={(e) => handleUpdate(e)} value={dataUpdate.category_update}>
                                <option defaultValue = {dataUpdate.category_update}>{dataUpdate.category_name_update}</option>
                            {
                                allCategory.map((item,index) => (                                
                                    <option key={index} value={item.id}>{item.category_name}</option> 
                                ))
                            }                    
                            </select>  
                        </Form.Item>

                        <Form.Item label="Publisher">
                            <select className="form-select" id="publisher_update" onChange={(e) => handleUpdate(e)} value={dataUpdate.publisher_update}>
                            <option defaultValue = {dataUpdate.publisher_update}>{dataUpdate.publisher_name_update}</option>
                            {
                                allPublisher.map((item,index) => (                                
                                    <option key={index} value={item.id}>{item.publisher_name}</option> 
                                ))
                            }                    
                            </select> 
                        </Form.Item>

                        <Form.Item label="Book_cover_photo" valuePropName="fileList">
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                        </Form.Item>
                        <Button type="primary" onClick={handleCancelUpdate}>Cancel</Button>
                        <Button type="submit" onClick={(e) => handleSubmitUpdate(e)}>Update</Button>
                    </Form>
        </Modal>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Container>
    );
}

export default ManageBook;