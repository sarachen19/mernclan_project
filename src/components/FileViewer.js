import FileViewer from "react-file-viewer";

const onError = e => {
    console.log(e, "error in file-viewer");
};

const FileView = (props) => {
    return (
        <FileViewer fileType={props.fileType} filePath={props.filePath} onError={onError} />
    );
}

export default FileView;