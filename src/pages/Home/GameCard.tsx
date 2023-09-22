import React from 'react';
import Title from "antd/es/typography/Title";
import {Card, Row, Typography} from "antd";
import {Link} from "react-router-dom";
import Img from "../../components/Img";

export interface IGameCard {
    id: number;
    title: string;
    thumbnail: string;
    game_url: string;
    genre: string;
    release_date: string;
    publisher: string;
}

const GameCard: React.FC<IGameCard> = (props) => {
    return (
        <Link to={`/game/${props.id}`}>
            <Card
                hoverable
                cover={<Img src={props.thumbnail} ratio={[365, 206]} />}
            >
                <Title level={5} style={{margin: 0}}>{props.title}</Title>
                <Typography.Text type="secondary" > {props.genre}</Typography.Text>
                <Row justify="space-between" align="middle">
                    <Typography.Text>{props.publisher}</Typography.Text>
                    <Typography.Text type="secondary">
                        {new Date(props.release_date).toLocaleDateString()}
                    </Typography.Text>
                </Row>
            </Card>
        </Link>
    );
}

export default GameCard;