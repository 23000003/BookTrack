import { useState } from "react"
import { useNavigate } from "react-router-dom";
import nopfp from '../assets/nopfp.png'

export default function ViewUserData(props){
   
    const {viewUserData, view, setView} = props

    const [tableTrigger, setTableTrigger] = useState(true);
    const [reportTrigger, setReportTrigger] = useState(false);
    const [displayTrigger, setDisplayTrigger] = useState(false);

    const [reportData, setReportData] = useState([])
    const navigate = useNavigate();

    return(
        <>
        <div className="outside" onClick={() => setView(!view)}></div>
            <div className='InApproval'>
                <div className="book-listed-by">
                    <h2>{tableTrigger ? "Items on Listed by" : "Reports on"} {viewUserData[0].account_name}</h2>
                    <button onClick={() => {
                        setTableTrigger(!tableTrigger), 
                        setReportTrigger(!reportTrigger)
                        }}>{tableTrigger ? "View Reports" : "View Data"}</button>
                    <button onClick={() =>
                        navigate(`/userProfile/${viewUserData[0].account_name}?Profile`, 
                        {state: {passDets: viewUserData[0]}})}
                    >View Display</button>
                </div>
                
                <div className="approval-attributes">
                    
                    {tableTrigger && (
                        <table>
                        <thead>
                            <tr>
                                <th>book_title</th>
                                <th>book_genre</th>
                                <th>imagetag</th>
                                <th>location</th>
                                <th>city</th>
                                <th>location_tag</th>
                                <th>book_type</th>
                                <th>file</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewUserData.length > 0 ? (
                                viewUserData.map((book) => (
                                    <tr key={book.id}>
                                        <td>
                                            <input
                                                type="text"
                                                className="table-input"
                                                value={book.book_title}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="table-input"
                                                value={book.book_genre}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="table-input"
                                                value={book.imagetag}
                                                style={{width: "800px"}}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="table-input"
                                                value={book.location}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="table-input"
                                                value={book.city}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="table-input"
                                                value={book.location_tag}
                                                style={{width: "1000px"}}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="table-input"
                                                value={book.book_type}
                                                readOnly
                                            />
                                        </td> 
                                        <td> 
                                            <input
                                                type="text"
                                                className="table-input"
                                                value={book.file}
                                                readOnly
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No books available for this user.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    )}

                    {reportTrigger && (
                        <div className="user-reports-bar">
                            <div className="user-content">
                                <div className="user-div-content">
                                    <img src={nopfp} alt="" />
                                    <h3>Account Name</h3>
                                </div>
                                <h3>Report Number #</h3>
                                <h3>Ordered: ago</h3>
                                <button>View Report</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}