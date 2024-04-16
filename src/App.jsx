import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import initialData from './data';

const App = () => {
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState(initialData);
    const [filters, setFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [headings, setHeadings] = useState([]);
    useEffect(() => {
        const newFilters = {};
        const newHeadings = new Set();
        data.forEach(item => {
            
            Object.keys(item).forEach(key => {
                
                if (!newFilters[key]) {
                    newFilters[key] = {};
                }
                newFilters[key][item[key]] = true;
                newHeadings.add(key);
            });
        });
       
        setFilters(newFilters);
        setHeadings(Array.from(newHeadings));
       
    }, [data]);
    const handleFilterChange = (e, filterType, value) => {
        const isChecked = e.target.checked;
        setFilters(prevFilters => ({
            ...prevFilters, [filterType]: {
                ...prevFilters[filterType], [value]: isChecked
            }
        }));
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const filteredData = data.filter(item => {
        return Object.keys(item).every(key => {
            const filterValue = filters[key] ? filters[key][item[key]] : true;
            const itemValue = item.name ? String(item.name) : String(item.mall);
            const lowerItemValue = itemValue.toLowerCase();

            return filterValue && (searchTerm === '' || (lowerItemValue.includes(searchTerm.toLowerCase())));
        });
    });

    return (
        <Container>
            <Row className='mt-5'>
                <Col>
                    <Form>
                        <Row>
                            {headings.filter((heading, index) => index !== 0 && index !== 1).map((heading, index) => (
                                <Col md={3} key={index}>
                                    <Form.Group controlId={`filter${heading}`}>
                                        <Form.Label>{heading}</Form.Label>
                                        {filters[heading] && Object.keys(filters[heading]).map((filter, filterIndex) => (
                                            <Form.Check
                                                key={filterIndex}
                                                type="switch"
                                                id={`${heading}-${filter}`}
                                                label={filter}
                                                checked={filters[heading][filter]}
                                                onChange={e => handleFilterChange(e, heading, filter)}
                                            />
                                        ))}
                                    </Form.Group>
                                </Col>
                            ))}
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
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {headings.map((heading, index) => (
                                    <th key={index}>{heading}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={headings.length}>No records found with the applied filters.</td>
                                </tr>
                            ) : (
                                filteredData.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                        {headings.map((heading, headingIndex) => (
                                            <td key={headingIndex}>{item[heading]}</td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};
export default App;