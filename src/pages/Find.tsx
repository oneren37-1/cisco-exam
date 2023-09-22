import React from 'react';
import PageLayout from "../components/PageLayout/PageLayout";
import {Button, Card, Empty, Input} from "antd";
import data from '../all.json';
import {LinkOutlined} from "@ant-design/icons";

const Find: React.FC = () => {
    const [search, setSearch] = React.useState<string>('');
    const [cards, setCards] = React.useState<any[]>([]);

    const [suggest, setSuggest] = React.useState<string[]>([])

    React.useEffect(() => {
        console.log(suggest)
    }, [suggest])

    React.useEffect(() => {
        if (search.length < 3) return;
        const suggestions: any = {}

        const filtered = data.filter(el => {
            let r = false;

            if (el.question.toLowerCase().includes(search.toLowerCase())) {
                const cutted = el.question.toLowerCase().substr(el.question.toLowerCase().indexOf(search.toLowerCase()) + search.length)
                const newSuggestion = cutted.substr(0, Math.max(cutted.indexOf(' '), 0)).trim()
                suggestions[newSuggestion] = suggestions[newSuggestion] ? suggestions[newSuggestion]+1 : 1;
                r = true
            }

            return el.variants.some((answer:any) => {
                if (answer.toLowerCase().includes(search.toLowerCase())) {
                    const cutted = answer.toLowerCase().substr(answer.toLowerCase().indexOf(search.toLowerCase()) + search.length)
                    const newSuggestion = cutted.substr(0, Math.max(cutted.indexOf(' '), 0)).trim()
                    suggestions[newSuggestion] = suggestions[newSuggestion] ? suggestions[newSuggestion]+1 : 1;
                    return true
                }
            }) || r
        });
        const s = Object.keys(suggestions).filter(e => e)
        s.sort((a, b) => suggestions[b] - suggestions[a])
        setSuggest(s)
        setCards(filtered);
    }, [search]);

    return (
        <PageLayout>
            <Input.Search
                placeholder="search"
                // enterButton="Search"
                size="large"
                onSearch={value => {
                    setSearch(value)
                }}
                onChange={e => {
                    setSearch(e.target.value)
                }}
                style={{
                    marginTop: '50px'
                }}
                value={search}
            />

            <div>
                {suggest.slice(0, 15).map(el => (
                    <Button
                        onClick={() => setSearch(search + el + ' ')}
                    >{el}</Button>
                ))}
            </div>

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