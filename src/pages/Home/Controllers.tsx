import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {CATEGORIES, PLATFORM_OPTIONS, SORT_OPTIONS} from "../../consts";
import {setCategories, setPlatformType, setSortType} from "../../redux/gamesSlice";
import {Card, Col, Row, Select, Space} from "antd";
import {FilterOutlined, SortAscendingOutlined} from "@ant-design/icons";

const Controllers: React.FC = () => {
    const dispatch = useAppDispatch();

    const categoryOptions = CATEGORIES.map((category) => ({
        value: category, label: category
    }));

    const sortType = useAppSelector((state) => state.games.sortType)
    const platformType = useAppSelector((state) => state.games.platformType)
    const categories = useAppSelector((state) => state.games.categories)

    return (
        <Card>
            <Space direction="vertical">
                <Space>
                    <FilterOutlined />
                    <Row gutter={[10, 10]} align={"middle"}>
                        <Col>
                            <Select
                                style={{ minWidth: '150px' }}
                                onChange={value => { dispatch(setPlatformType(value)) }}
                                options={PLATFORM_OPTIONS}
                                defaultValue={platformType}
                            >
                            </Select>
                        </Col>
                        <Col>
                            <Select
                                mode="multiple"
                                style={{ minWidth: '200px' }}
                                onChange={value => { dispatch(setCategories(value)) }}
                                options={categoryOptions}
                                defaultValue={[]}
                                placeholder={"Выберите жанр"}
                            >
                            </Select>
                        </Col>
                    </Row>
                </Space>

                <Space>
                    <Col><SortAscendingOutlined /></Col>
                    <Col>
                        <Select
                            onChange={value => { dispatch(setSortType(value)) }}
                            options={SORT_OPTIONS}
                            defaultValue={sortType}
                        >
                        </Select>
                    </Col>
                </Space>
            </Space>
        </Card>
    );
}

export default Controllers;