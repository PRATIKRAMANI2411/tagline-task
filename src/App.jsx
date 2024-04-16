import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import TableData from './components/TableData';

const initialData = [
    {
        "id": 1,
        "name": "foo",
        "city": "dallas",
        "category": "one",
        "type": "A",
        "active": "FALSE"
    },
    {
        "id": 2,
        "name": "bar",
        "city": "dallas",
        "category": "one",
        "type": "B",
        "active": "FALSE"
    },
    {
        "id": 3,
        "name": "jim",
        "city": "san francisco",
        "category": "one",
        "type": "B",
        "active": "TRUE"
    },
    {
        "id": 4,
        "name": "jane",
        "city": "denver",
        "category": "two",
        "type": "C",
        "active": "FALSE"
    },
];

const App = () => {
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState(initialData);
    const [filters, setFilters] = useState({ city: {}, category: {}, type: {}, active: {} });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const newFilters = { city: {}, category: {}, type: {}, active: {} };
        data.forEach(item => {
            newFilters.city[item.city] = true;
            newFilters.category[item.category] = true;
            newFilters.type[item.type] = true;
            newFilters.active[item.active] = true;
        });
        setFilters(newFilters);
    }, [data]);

    const handleFilterChange = (e, filterType, value) => {
        const isChecked = e.target.checked;
        setFilters(prevFilters => ({
            ...prevFilters, [filterType]: { ...prevFilters[filterType], [value]: isChecked }
        }));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data.filter(item => {
        const cityFilter = filters.city[item.city];
        const categoryFilter = filters.category[item.category];
        const typeFilter = filters.type[item.type];
        const activeFilter = filters.active[item.active];
        const nameFilter = item?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        return cityFilter && categoryFilter && typeFilter && activeFilter && nameFilter;
    });

    return (
        <Container>
            <Row className='mt-5'>
                <Col>
                    <Form>
                        <Row>
                            <Col md={3}>
                                <Form.Group controlId="filterCity">
                                    <Form.Label>City</Form.Label>
                                    {Object.keys(filters.city).map(city => (
                                        <Form.Check
                                            key={city}
                                            type="switch"
                                            id={`city-${city}`}
                                            label={city}
                                            checked={filters.city[city]}
                                            onChange={e => handleFilterChange(e, 'city', city)}
                                        />
                                    ))}
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="filterCategory">
                                    <Form.Label>Category</Form.Label>
                                    {Object.keys(filters.category).map(category => (
                                        <Form.Check
                                            key={category}
                                            type="switch"
                                            id={`category-${category}`}
                                            label={category}
                                            checked={filters.category[category]}
                                            onChange={e => handleFilterChange(e, 'category', category)}
                                        />
                                    ))}
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="filterType">
                                    <Form.Label>Type</Form.Label>
                                    {Object.keys(filters.type).map(type => (
                                        <Form.Check
                                            key={type}
                                            type="switch"
                                            id={`type-${type}`}
                                            label={type}
                                            checked={filters.type[type]}
                                            onChange={e => handleFilterChange(e, 'type', type)}
                                        />
                                    ))}
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="filterActive">
                                    <Form.Label>Active</Form.Label>
                                    {Object.keys(filters.active).map(active => (
                                        <Form.Check
                                            key={active}
                                            type="switch"
                                            id={`active-${active}`}
                                            label={active}
                                            checked={filters.active[active]}
                                            onChange={e => handleFilterChange(e, 'active', active)}
                                        />
                                    ))}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="filterName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search by name"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <TableData filteredData={filteredData} />
                </Col>
            </Row>
        </Container>
    );
};

export default App;
