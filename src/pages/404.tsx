import React from 'react';
import {Button, Result} from 'antd';
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Извините, страница, которую вы ищете, не существует"
            extra={<Button type="primary"><Link to={'/'}>На главную</Link></Button>}
        />
    );
};

export default NotFoundPage;