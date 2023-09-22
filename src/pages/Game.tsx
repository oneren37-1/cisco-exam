import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";
import {fetchGame} from "../redux/gameSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import Title from "antd/es/typography/Title";
import {Alert, Card, Carousel, Col, Divider, Row, Spin, Table} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import Img from "../components/Img";

const Game: React.FC = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id === undefined) {
            navigate('/');
            return;
        }
        if (!content || content.id.toString() !== id) {
            const promise = dispatch(fetchGame(id));
            return () => {
                promise.abort()
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, navigate, id])

    const content = useAppSelector((state) => state.game.content);
    const loadingStatus = useAppSelector((state) => state.game.status);
    const error = useAppSelector((state) => state.game.error);

    const gameDetails = content ? [
        { prop: 'Жанр', val: content.genre },
        { prop: 'Издатель', val: content.publisher },
        { prop: 'Разработчик', val: content.developer },
        { prop: 'Дата выхода', val: new Date(content.release_date).toLocaleDateString() }
    ].map((el:any, i) => {
        el.key = i.toString();
        return el
    }) : [];

    const req = content?.minimum_system_requirements
    const requirements = req ? [
        { prop: 'ОС', val: req.os },
        { prop: 'Процессор', val: req.processor },
        { prop: 'Видеокарта', val: req.graphics },
        { prop: 'Память', val: req.memory },
        { prop: 'Диск', val: req.storage }
    ].map((el:any, i) => {
        el.key = i.toString();
        return el
    }) : [];

    const columns = [
        {
            title: 'Property',
            dataIndex: 'prop',
            key: 'prop',
        },
        {
            title: 'Value',
            dataIndex: 'val',
            key: 'val',
        }
    ];

    return (
        <PageLayout>
            {loadingStatus === "loading" && (
                <Row justify="center" style={{marginTop: '50px'}}>
                    <Col><Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} /></Col>
                </Row>
            )}
            {loadingStatus === "failed" && (
                <Row style={{marginTop: '50px'}}>
                    <Col><Alert message={error} type="error" /></Col>
                </Row>
            )}
            {loadingStatus === "loaded" && content && (
                <>
                    <Title>{content.title}</Title>
                    <Card
                        cover={<Img src={content.thumbnail} ratio={[365, 206]} />}
                    >
                        <Divider orientation="left">Общие сведения</Divider>
                        <Table
                            dataSource={gameDetails}
                            columns={columns}
                            pagination={false}
                            showHeader={false}
                        />
                        {content && content.minimum_system_requirements && (<>
                            <Divider orientation="left">Системные требования</Divider>
                            <Table
                                dataSource={requirements}
                                columns={columns}
                                pagination={false}
                                showHeader={false}
                            />
                        </>)}
                        <Divider orientation="left">Скриншоты</Divider>
                        <Carousel autoplay>
                            {content.screenshots.map((screenshot, index) => (
                                <div key={index}>
                                    <Img src={screenshot.image} ratio={[568, 319]} />
                                </div>
                            ))}
                        </Carousel>
                    </Card>
                </>
            )}
        </PageLayout>
    );
}

export default Game;