import React from 'react';
import {Link} from "react-router-dom";

import logoMD from './freetogame-logo.png';
import logoXS from './logo-s.png';
import style from './PageHeader.module.scss';
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

const PageHeader: React.FC = () => {
    const screens = useBreakpoint();

    return (
        <div className={style.header}>
            <Link to={'/'} className={style.logo}>
                <img src={ screens.sm ? logoMD : logoXS } alt="Free to Game"/>
            </Link>
        </div>
    );
}

export default PageHeader;