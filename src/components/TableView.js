import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const RenderLineItem = (item, index, viewURL, tableHeaders) => {
    
    let history = useHistory();
    let { _id, ...itemViewData } = item;
    let viewData = {};
    Object.keys(itemViewData).map(key => {
        tableHeaders.map(heads=>{
            if (heads[key])
                viewData[key] = itemViewData[key];
        })
    })

    return (
        <tr key={index}>
            <td>{index + 1}</td>
            {Object.entries(viewData).map(k => <td>{k[1]}</td>)}
            <td>
                {viewURL ? <Button size="lg" onClick={() => { history.push(viewURL + _id); }}>
                    View
                </Button> : null}
            </td>
        </tr>
    )
}

const TableView = (props) => {
    debugger;
    let history = useHistory();
    return (
        <React.Fragment>
            {
                props.addEditApplicationUrl ? <Button size="lg" onClick={() => { history.push(props.addEditApplicationUrl + 0); }}>
                    Add
                </Button> : null
            }
            <Table condensed hover>
                <thead>
                    <tr>
                        <th></th>
                        {props.tableHeaders.map((header) => <th>{Object.values(header)}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {props.datalist.map((item, index) => RenderLineItem(item, index, props.addEditApplicationUrl, props.tableHeaders))}
                </tbody>
            </Table>
        </React.Fragment>
    );
}

export default TableView;