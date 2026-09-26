function PdfUpload({selectedFile, onFileChange, onUpload, uploadStatus, isUploading }){
  return(
    <section className="card">
      <h2>Upload your PDF</h2>
      <p className="hint">Select a PDF file, then click upload</p>

      <div className="upload-now">
      <input type="file" 
              accept="application/pdf,.pdf"
              onChange={onFileChange} />
              
      <button type="button"
              onClick={onUpload}
              disabled={!selectedFile || isUploading} > 
        {isUploading ? "Uploading..." : "Upload PDF"}
      </button>
      </div>

      {selectedFile && (
        <p className="file-name">
          Selected file: <strong>{selectedFile.name}</strong>
          </p>
      )}

      {uploadStatus && (
        <p className={`status ${uploadStatus.type}`}>{uploadStatus.message}</p>
      )}

    </section>
  )
}

export default PdfUpload;