import React, {useEffect} from 'react';
import PageLayout from "../../components/PageLayout/PageLayout";
import {Alert, Button, Card, Checkbox, Col, Collapse, Empty, Pagination, Row, Space, Spin, Statistic} from "antd";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchGames, Game, setPage, setPageSize} from "../../redux/gamesSlice";
import Title from "antd/es/typography/Title";
import {LikeOutlined, LinkOutlined, LoadingOutlined} from '@ant-design/icons';
import Controllers from "./Controllers";
import GameCard from "./GameCard";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {dec, fetchCards, inc} from "../../redux/cardSlice";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();

    const pickCard = (cards: any) => {
        if (!cards || !cards.length) return null

        const slice = [...cards].sort((a, b) => (+a.score - (+b.score))).slice(0, 50)
        const index = Math.floor(Math.random() * slice.length);
        return slice[index];
    }

    const cards = useAppSelector((state) => state.cards.cards);
    const [card, setCard] = React.useState<any>(null)

    const [currCorrect, setCurrCorrect] = React.useState<number>(0)
    const [currAll, setCurrAll] = React.useState<number>(0)

    useEffect(() => {
        if (cards && cards.length>10 && !card) {
            setCard(pickCard(cards))
            setStats(cards.filter(el => +el.score > 0).length)
        }
    }, [cards])

    const [answer, setAnswer] = React.useState<string[]>([])
    const [isCorrect, setIsCorrect] = React.useState<boolean|null>(null)

    const [stats, setStats] = React.useState<any>(0)

    useEffect(() => {
        dispatch(fetchCards())
    }, []);

    useEffect(() => {
        console.log('cards changed')
    }, [cards]);

    useEffect(() => {
        if (isCorrect && card.score === 0) {
            setStats(stats+1)
        }
    }, [isCorrect]);

    return (
        <PageLayout>
            {card && (
                <>
                    <Row gutter={16}>
                        <Col span={12}>

                        </Col>
                    </Row>
                    <Card title={(
                        <Row gutter={16}>
                            <Col span={12}>
                            <Statistic
                                title="Пройденные"
                                value={stats}
                                prefix={<LikeOutlined />}
                                suffix={`/ ${cards.length}`}
                                style={{margin: '10px'}}
                            />
                            </Col>
                            <Col span={12}>
                            {currAll > 0 && (
                                <Statistic
                                    title="Текущий процент"
                                    value={Math.round(currCorrect/currAll*100)}
                                    suffix={`%`}
                                    style={{margin: '10px'}}
                                />
                            )}
                            </Col>
                        </Row>
                    )} style={{marginTop: 100}}>
                        <p>
                            <div style={{display: "inline"}} className="content" dangerouslySetInnerHTML={{__html: card.question.replace(/!\[(.*?)\]\((.*)\)/, "</br><img src='$2' /></br>")}}></div>
                            <a href={card.url} style={{marginLeft: '10px'}}><LinkOutlined /></a>
                        </p>
                        <Checkbox.Group options={card.variants.map((v: any) => {
                            return {label: v, value: v}
                        })} onChange={(checkedValue) => {
                            setAnswer(checkedValue.map((v: any) => v.toString()))
                        }} value={answer} style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}/>

                        <br/>
                        <Space>
                            <Button onClick={() => {
                                const result = JSON.stringify(answer) === JSON.stringify(card.correct);
                                setIsCorrect(result)

                                const params = {
                                    id: card.id,
                                    score: card.score
                                }
                                dispatch(result ? inc(params) : dec(params))

                                setCurrAll(currAll+1)
                                setCurrCorrect(currCorrect + (result ? 1 : 0))
                            }}>Проверить</Button>
                            <Button onClick={() => {
                                setAnswer([])
                                setIsCorrect(null)
                                setCard(pickCard(cards))
                            }}>Дальше</Button>
                        </Space>

                        <br/>
                        <br/>
                        {isCorrect === true && (
                            <Alert message="Верно" type="success" showIcon />
                        )}
                        {isCorrect === false && (
                            <Alert message="Неверно" type="error" showIcon />
                        )}
                        <br/>
                        <Collapse>
                            <Collapse.Panel header="Explanation" key="1">
                                <p>{card.explanation}</p>
                                <p>{JSON.stringify(card.correct)}</p>
                                <p>score - {card.score}</p>
                            </Collapse.Panel>
                        </Collapse>
                    </Card>
                </>
            )}
            {!card && (
                <Empty />
            )}
        </PageLayout>
    );
}

export default Home;