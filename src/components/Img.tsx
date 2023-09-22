import React, {useEffect, useState} from 'react'
import {Col, Row, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

export interface IImg {
    src: string;
    ratio: [number, number];
}

const Img: React.FC<IImg> = (props) => {
    const [imageUrl, setImageUrl] = useState(props.src);

    useEffect(() => {
        setImageUrl('');
        const img: HTMLImageElement = new Image();
        img.src = props.src;
        img.onload = () => {
            setImageUrl(props.src);
        };
    }, [props.src])

    return (
        <div style={{aspectRatio: props.ratio.join(' / ')}}>
            {imageUrl
                ? <img alt="game preview" src={imageUrl} style={{width: "100%"}}/>
                : (
                    <Row justify="center" align="middle" style={{height: '100%'}}>
                        <Col>
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                        </Col>
                    </Row>
                )
            }
        </div>
    )
}

export default Img