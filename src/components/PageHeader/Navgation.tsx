import {Navbar, Nav, Container} from 'react-bootstrap';
import React, {useRef, useState} from "react";
import { Upload, Button, Image, Form, Input, message } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import vegaEmbed from 'vega-embed';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../PageHeader/Navgation.css';
import {Vega} from "react-vega";

function Navgation() {
    const [fileList, setFileList] = useState([]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [jsonData, setJsonData] = useState('');
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [spec, setSpec] = useState(null);
    const handlePreview = async (file: UploadFile) => {
        const reader = new FileReader();
        reader.onload = e => {
            // @ts-ignore
            setImagePreviewUrl(e.target.result);
        };
        // @ts-ignore
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        // @ts-ignore
        formData.append('file', fileList[0].originFileObj); // Assuming fileList[0] is the file to upload

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', { // Corrected URL
                method: 'POST',
                body: formData,
                credentials: 'same-origin',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("start to vegaEmbed")
            setSpec(data.json_data);
            console.log("stop to vegaEmbed")
            setJsonData(JSON.stringify(data.json_data, null, 2));
            setIsContentVisible(true);
        } catch (error) {
            // @ts-ignore
            message.error('Upload failed: ' + error.message);
        }
    };
    const handleChange = ({ fileList }: any) => setFileList(fileList);

    const handleSave = () => {
        const newSpecification = JSON.parse(jsonData);
        vegaEmbed('#vis', newSpecification);
    };

    return (
        <>
            <div className="header">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Chart2Code</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="#link">Sign In</Nav.Link>
                                <Nav.Link href="#link">Sign Up</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <header id="header">
                    <div className="container d-flex flex-column align-items-center">
                        <h1>Welcome to Chart2Code!</h1>
                        <h2>Automatically convert your diagrams to code</h2>
                        <div>
                            <Form onFinish={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                                <Form.Item className='selectFile'>
                                    <Upload
                                        beforeUpload={() => false}
                                        fileList={fileList}
                                        onChange={handleChange}
                                        onPreview={handlePreview}
                                    >
                                        <Button icon={<UploadOutlined />}>Select File</Button>
                                    </Upload>
                                </Form.Item>
                                <Form.Item className='uploadButton'>
                                    <Button type="primary" htmlType="submit">Upload</Button>
                                </Form.Item>
                            </Form>
                            {/*{imagePreviewUrl && <Image src={imagePreviewUrl} alt="Uploaded image" />}*/}
                        </div>
                        <div>
                            {spec && (
                                <div className='chart' >
                                    { spec && <Vega spec={spec} style={{ flex: 0.5 }} />}
                                    {isContentVisible && (
                                        <div className="container">
                                            <div id="vis"></div>
                                            <div className="row">
                                                <div className="col">
                                                    <Input.TextArea
                                                        rows={10}
                                                        value={jsonData}
                                                        onChange={e => setJsonData(e.target.value)}
                                                        className='schema'
                                                    />
                                                    <Button onClick={handleSave}>Change Figure</Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
}

export default Navgation;
