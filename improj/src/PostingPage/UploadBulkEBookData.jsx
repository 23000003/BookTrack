import { Link } from 'react-router-dom';
import '../styles/upload.css';
import { useEffect, useState } from 'react';
import UploadBulkData from './BulkUploadHook';
import ImageStyle from '../components/ImageStyle';

export default function BulkEBookUploadData() {
    const { 
        SelectFiles, 
        handleUpload, 
        MyImages, 
        images,
        MyEbookFiles,
        ebookFiles,
        uploadLoading
     } = UploadBulkData();

    useEffect(() => {
        document.body.style.backgroundColor = '#e9e8e8';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    useEffect(() =>{
        document.body.style.overflow = uploadLoading ?  'hidden' : 'auto';
    },[uploadLoading])

    return (
        <>
            <div className="upload-container">
                <Link to='/e-books'>
                    <button className="back-but">
                        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
                            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.08367
                            9c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5
                            .996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996
                            574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.9920
                            21-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 
                            604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z">
                            </path></svg>
                        <span>Back</span>
                    </button>   
                </Link>
                <div className="upload-container-content">
                    <h2 className='upload-tagline'>WHAT E-BOOKS ARE YOU SELLING?</h2>
                    <hr style={{ width: "50%", marginTop: "50px" }} />

                    <div className='post-button-choices'>
                        <Link to='/uploadEBooks'><button className='not-chosen' style={{ marginRight: "15px" }}>Single Post</button></Link>
                        <button className='chosen'>Bulk Post</button>
                    </div>
                    <h2 style={{ textDecoration: "underline", marginTop: "35px" }}>GUIDE</h2>

                    <div className='example-input'>
                        <div className="book-upload-data">
                            <h2 style={{ marginTop: "35px" }}>Download this CSV file and input all Tables required *</h2>
                            <a href="/e-books.csv" download="e-books.csv" style={{ width: "83px" }}>
                                E-books.csv
                            </a>
                            <h2>Do Note: In the given examples below"</h2>
                            <a href="/example.csv" download="example.csv">
                                example.csv
                            </a>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <h3>imgtag: (NOTE: Please make your image name Unique, use UID generator)</h3>
                            <p>https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/e-books/"Your Image Name" + png</p>
                            <p>ex. https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/e-books/Ikigai.png</p>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <h3>File:</h3>
                            <p>"Your File Name" + pdf</p>
                            <p>ex. Ikigai.pdf</p>
                        </div>
                    </div>

                    <div className="image-upload">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h2>Upload CSV</h2>
                            <span id="Cancel-Image">X</span>
                        </div>

                        <input 
                            name="text" 
                            type="file"
                            onChange={SelectFiles}
                            accept='.csv'
                        />

                        <h2>Upload Images</h2>
                        <input 
                            name="text" 
                            type="file"
                            onChange={MyImages}
                            multiple
                        />

                        <div>
                            {images.length > 0 && images.map((file, index) => (
                                <div key={index}>
                                    <p>{file.name}</p>
                                </div>
                            ))}
                        </div>

                        <h2>Upload E-Book Files</h2>
                        <input 
                            name="text" 
                            type="file"
                            onChange={MyEbookFiles}
                            multiple
                        />

                        <div>
                            {ebookFiles.length > 0 && ebookFiles.map((file, index) => (
                                <div key={index}>
                                    <p>{file.name}</p>
                                </div>
                            ))}
                        </div>
                        
                        {uploadLoading && (
                           <>
                            <div className='upload-loader'></div>
                            <div className='loading center-loader'>
                                <div className='loader'></div>
                            </div>
                            </>
                        )}

                    </div>
                    <button className="Post-Button" onClick={() => handleUpload("e-books")}>POST</button>
                    <div style={{ marginBottom: "10%" }}></div>
                </div>
            </div>
        </>
    );
}
