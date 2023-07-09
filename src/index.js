import React, { useEffect, useState } from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import './index.css';
import {Button, FloatButton, Form, Input, Modal} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const SubscribeModal = () => {
    const [form] = Form.useForm();
    const [isFetchingCode, setIsFetchingCode] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                startCountdown();
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [countdown]);


    const handleFetchCode = () => {
        if (countdown > 0) return;
        setIsFetchingCode(true);
        setTimeout(() => {
            setCountdown(60);
            setIsFetchingCode(false);
            startCountdown();
        }, 1000);
    };

    const startCountdown = () => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
        }, countdown * 1000);
    };

    const handleSubscribeClick = () => {
        Modal.info({
            title: '订阅',
            content: (
                <Form form={form}>
                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的邮箱',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="验证码"
                        name="verificationCode"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            disabled={isFetchingCode || countdown > 0}
                            onClick={handleFetchCode}
                        >
                            {countdown > 0 ? `${countdown}s后重新获取` : '获取验证码'}
                        </Button>
                    </Form.Item>
                </Form>
            ),
            okText: '确定',
            onOk: () => {
                form.validateFields().then((values) => {
                    if (values.email && values.verificationCode) {
                        console.log(values);
                    }else{

                    }
                });
            },
        });
    };

    return (
        <>
            <FloatButton
                icon={<QuestionCircleOutlined />}
                type="default"
                onClick={handleSubscribeClick}
            >
                订阅
            </FloatButton>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
        <SubscribeModal />
    </React.StrictMode>,
    document.getElementById('root')
);
