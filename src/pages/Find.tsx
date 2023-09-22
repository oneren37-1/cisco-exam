import React from 'react';
import PageLayout from "../components/PageLayout/PageLayout";
import {Card, Empty, Input} from "antd";
import data from '../all.json';
import {LinkOutlined} from "@ant-design/icons";

const Find: React.FC = () => {

    const [search, setSearch] = React.useState<string>('');
    const [cards, setCards] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (search.length < 3) return;

        const filtered = data.filter(el => {
            return el.question.toLowerCase().includes(search.toLowerCase())
                || el.variants.some((answer:any) => answer.toLowerCase().includes(search.toLowerCase()))
        });
        setCards(filtered);
    }, [search]);

    return (
        <PageLayout>
            <Input.Search
                placeholder="search"
                enterButton="Search"
                size="large"
                onSearch={value => setSearch(value)}
                onChange={e => setSearch(e.target.value)}
                style={{
                    marginTop: '50px'
                }}
            />

            {cards.length > 0 && cards.slice(0, 10).map(el => (
                <Card key={el.id} style={{
                    marginTop: '10px',
                    marginBottom: '10px'
                }}>
                    <p>
                        <div style={{display: "inline"}} className="content" dangerouslySetInnerHTML={{__html: el.question.replace(/!\[(.*?)\]\((.*)\)/, "</br><img width='100%' src='$2' /></br>")}}></div>
                    </p>
                    <ul>
                        {el.variants.map((answer:any, i:number) => (
                            <li
                                key={i}
                                style={{
                                    backgroundColor: el.correct.includes(answer) ? 'rgba(0, 255, 0, 0.2)' : ''
                                }}
                            >{answer}</li>
                        ))}
                    </ul>
                </Card>
            ))}

            {!cards && (
                <Empty />
            )}
        </PageLayout>
    );
}

export default Find;