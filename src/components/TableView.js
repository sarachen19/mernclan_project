import Table from 'react-bootstrap/Table';

const renderLineItem = (item, index) => {
    return (
        <tr key={index}>
            <td>{index + 1}</td>
            {Object.entries(item).map(k => <td>{k[1]}</td>)}
        </tr>
    )
}

const TableView = (props) => {
    return (
        <Table condensed hover>
            <thead>
                <tr>
                    <th></th>
                    {props.tableHeaders.map((header) => <th>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.datalist.map(renderLineItem)}
            </tbody>
        </Table>
    );
}

export default TableView;