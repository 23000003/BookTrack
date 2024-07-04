import { Link } from 'react-router-dom';
import '../styles/upload.css'
import { useEffect } from 'react';

export default function BulkUploadData(){

    useEffect(() => {
        document.body.style.backgroundColor = '#e9e8e8';

        return () => {
            document.body.style.backgroundColor = '';
        };
        
    }, []);

    return(
        <>
        <div className="upload-container">
        <Link to = '/books'>
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
            <h2 className='upload-tagline'>WHAT BOOKS ARE YOU SELLING?</h2>
            <hr style={{width: "50%", marginTop: "50px"}}/>

            <div className='post-button-choices' >
                <Link to='/uploadBooks'><button className='not-chosen' style={{marginRight: "15px"}}>Single Post</button></Link>
                <button className='chosen'>Bulk Post</button>
            </div>
            <h2 style={{textDecoration: "underline", marginTop: "35px"}}>GUIDE</h2>
            
            <div className='example-input'>
                <div className="book-upload-data">
                    <h2 style={{marginTop: "35px"}}>Download this CSV file and input all Tables required *</h2>
                    <a href="/books.csv" download="books.csv">
                        books.csv
                    </a>
                    <h2>Do Note: In the given examples below"</h2>
                    <a href="/example.csv" download="example.csv">
                        example.csv
                    </a>
                </div>
                <div style={{marginTop: "20px"}}>
                    <h3>imgtag:</h3>
                    <p>https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/books/"Your Image Name" + png</p>
                    <p>ex. https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/books/Ikigai.png</p>
                </div>
                <div style={{marginTop: "20px"}}>
                    <h3>Locationtag: "Your Google Map Location Link"</h3>
                </div>
            </div>
    
            <div className="image-upload">
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <h2>Upload Image</h2>
                    <span id="Cancel-Image">X</span>
                </div>
                <img src="" alt="" id="image-preview"/>
                <label for="file" className="labelFile"><span>
                    <svg
                        xml:space="preserve"
                        viewBox="0 0 184.69 184.69"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xmlns="http://www.w3.org/2000/svg"
                        id="Capa_1"
                        version="1.1"
                        width="60px"
                        height="60px"
                        >
                    <g>
                        <g>
                        <g>
                            <path
                            d="M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813
                                C102.609,16.43,88.713,7.576,73.087,7.576c-22.117,0-40.112,17.994-40.112,40.115c0,0.913,0.036,1.854,0.118,2.834
                                C14.004,54.875,0,72.11,0,91.959c0,23.456,19.082,42.535,42.538,42.535h33.623v-7.025H42.538
                                c-19.583,0-35.509-15.929-35.509-35.509c0-17.526,13.084-32.621,30.442-35.105c0.931-0.132,1.768-0.633,2.326-1.392
                                c0.555-0.755,0.795-1.704,0.644-2.63c-0.297-1.904-0.447-3.582-0.447-5.139c0-18.249,14.852-33.094,33.094-33.094
                                c13.703,0,25.789,8.26,30.803,21.04c0.63,1.621,2.351,2.534,4.058,2.14c15.425-3.568,29.919,3.883,36.604,17.168
                                c0.508,1.027,1.503,1.736,2.641,1.897c17.368,2.473,30.481,17.569,30.481,35.112c0,19.58-15.937,35.509-35.52,35.509H97.391
                                v7.025h44.761c23.459,0,42.538-19.079,42.538-42.535C184.69,71.545,169.884,53.901,149.968,50.186z"
                            style={{fill: "#010002"}}
                            ></path>
                        </g>
                        <g>
                            <path
                            d="M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541,65.078
                                c-0.701-0.698-1.614-1.045-2.534-1.045l-0.064,0.011c-0.018,0-0.036-0.011-0.054-0.011c-0.931,0-1.85,0.361-2.534,1.045
                                L63.31,85.127c-1.403,1.403-1.403,3.672,0,5.075c1.403,1.406,3.672,1.406,5.075,0L82.296,76.29v97.227
                                c0,1.99,1.603,3.597,3.593,3.597c1.979,0,3.59-1.607,3.59-3.597V76.165l14.033,14.036
                                C104.91,91.608,107.183,91.608,108.586,90.201z"
                            style={{fill: "#010002"}}
                            ></path>
                        </g>
                        </g>
                    </g></svg></span>
                <p>Select a PNG File</p></label>

                <input className="input" name="text" id="file" type="file"/>
            
            
            </div>
            <button className="Post-Button">POST</button>
            <div style={{marginBottom: "10%"}}></div>
        </div>
    </div>
        </>
    );
}