import Form from 'react-bootstrap/Form';

const FileUpload = (props) => {
    return (
        <Form>
            <div className="mb-3">
                <Form.File
                    id="custom-file-translate-scss"
                    label="Custom file input"
                    lang="en"
                    onChange={(e) => { props.fileChangeHandler(e) }}
                    custom
                />

            </div>
        </Form>
    )
}

export default FileUpload;