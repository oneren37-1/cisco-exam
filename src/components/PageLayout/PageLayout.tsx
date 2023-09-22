import React from 'react';
import {Layout} from 'antd';
import PageHeader from "../PageHeader/PageHeader";
import style from './PageLayout.module.scss';

interface IPageLayoutProps {
    children: React.ReactNode
}

const PageLayout: React.FC<IPageLayoutProps> = ({ children }) => {
    return (
        <Layout className={style.container}>
            {/*<Layout.Header className={style.header}><PageHeader /></Layout.Header>*/}
            <Layout.Content>
                <div className={style.content}>
                    { children }
                </div>
            </Layout.Content>
        </Layout>
    );
}

export default PageLayout;