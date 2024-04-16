import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types';

const TableData = ({ filteredData }) => {
    return (
        <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>City</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan="6">No records found with the applied filters.</td>
                            </tr>
                        ) : (
                            filteredData.map(item => (
                                <tr key={item?.id}>
                                    <td>{item?.id}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.city}</td>
                                    <td>{item?.category}</td>
                                    <td>{item?.type}</td>
                                    <td>{item?.active}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
        </>
    )
}

TableData.propTypes = {
    filteredData: PropTypes.array.isRequired
};
export default TableData
