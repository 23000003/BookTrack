import { Link } from 'react-router-dom';
import '../styles/upload.css'
import { useEffect, useRef } from 'react';
import useUploadHook from './UploadHook';
import ImageStyle from '../components/ImageStyle';


export default function UploadEBookData(){

    const visible = useRef(null);
    const cancelVisible = useRef(null);
    const fileInput = useRef(null);

    useEffect(() => {
        document.body.style.backgroundColor = '#e9e8e8';
        window.scrollTo({top: 0});
        return () => {
            document.body.style.backgroundColor = ''; 
        };
    }, []);

    const PreviewImage = (e) =>{
        const file = e.target.files[0];
        setImage(file);
    }


    const {
        setTitle,
        setPrice,
        setGenre,
        setAuthor,
        setDescription,
        setImage,
        UploadBook,
        uploadLoading,
        setEbookFile,
        ebookFile,
        image
    } = useUploadHook();
    


    return(
        <>
        <div className="upload-container">
            <Link to = '/e-books'>
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
                <h2 className='upload-tagline'>WHAT E - BOOK ARE YOU SELLING?</h2>
                <hr style={{width: "50%", marginTop: "50px"}}/>

                <div className='post-button-choices' >
                    <button className='chosen' style={{marginRight: "15px"}}>Single Post</button>
                    <Link to='/bulkEbookUpload'><button className='not-chosen'>Bulk Post</button></Link>
                </div>

                <div className="book-upload-data">

                    <label htmlFor="Title-Input">Title *</label>
                    <input type="text" name="" 
                        id="Title-Input" 
                        maxLength="19" 
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    
                    <label htmlFor="Price-Input">Price *</label>
                    <input type="text" name="" 
                        id="Price-Input" 
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <label htmlFor="Genre-Select">Genre *</label>
                    <select name="" id="Genre-Select" onChange={(e) => setGenre(e.target.value)}>
                        <option selected>-</option>
                        <option value="1">Novel</option>
                        <option value="2">Manga</option>
                        <option value="3">Self-Help</option>
                        <option value="4">Fiction</option>
                        <option value="5">Science</option>
                        <option value="6">Romance</option> 
                        <option value="7">Others</option>     
                    </select>
                    <label htmlFor="Author-Input">Author *</label>
                    <input type="text" name="" 
                        id="Author-Input" 
                        onChange={(e) => setAuthor(e.target.value)}
                    />

                    <label htmlFor="Description-Input">Description *</label>
                    <textarea type="text" id="Description-Input" 
                        style={{height: "100px"}}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>

                </div>
        
                <div className="image-upload">
                    
                                    
                    <h2>Upload Image</h2>
                    <label for="file-input8" class="custom-file-upload" style={{marginTop: "15px"}}>
                            Choose Image
                    </label>
                    <input className="input" name="text" 
                        id="file-input8" 
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        ref={fileInput}    
                    />

                    {image !== null && (
                        <p>{image.name}</p>
                    )}

                    <h2 style={{marginTop: "35px"}}>Upload E-Book Files</h2>
                    <label for="file-input5" class="custom-file-upload" style={{marginTop: "15px"}}>
                            Choose Files
                    </label>
                    <input 
                        id='file-input5'
                        name="text" 
                        type="file"
                        onChange={(e) => setEbookFile(e.target.files[0])}
                    />
                    {ebookFile !== null && (
                        <p>{ebookFile.name}</p>
                    )}
                </div>
                {uploadLoading && (
                    <>
                    <div className='upload-loader'></div>
                    <div className='loading center-loader'>
                        <div className='loader'></div>
                    </div>
                    </>
                )}
                <button className="Post-Button" onClick={() => UploadBook("e-book")}>POST</button>
                <div style={{marginBottom: "10%"}}></div>
            </div>
        </div>
        </>
    );
}