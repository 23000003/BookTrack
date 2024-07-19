import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ConvertDate from "../Supabase/TimeConverter";
import supabase from "../Supabase/Supabase";
import noreport from "../assets/no_report.jpg"

export default function ViewUserData(props){
   
    const {viewUserData, view, setView, user} = props

    const [tableTrigger, setTableTrigger] = useState(true);
    const [reportTrigger, setReportTrigger] = useState(false);
    const [displayReport, setDisplayReport] = useState(false);
    const [viewContentReport, setViewContentReport] = useState({});
    const [reportData, setReportData] = useState([])

    const navigate = useNavigate();

    console.log(viewUserData)

    useEffect(() =>{
        const fetchReport = async () =>{
            const {data, error} = await supabase.from('reports')
            .select(`*, reportedby(*)`)
            .eq('reportedto', user)

            if(error){
                console.log(error);
            }else{
                setReportData(data);
                console.log(data);
            }
        }
        fetchReport();
    },[user])

    return(
        <>
        <div className="outside" onClick={() => setView(!view)}></div>
            <div className='InApproval'>
                <div className="book-listed-by">
                    <h2>{tableTrigger ? "Items on Listed by" : "Reports on"} {user}</h2>
                    <button onClick={() => {
                        setTableTrigger(!tableTrigger), 
                        setReportTrigger(!reportTrigger)
                        }}>{tableTrigger ? "View Reports" : "View Data"}</button>
                    {viewUserData.length > 0 && (
                        <button onClick={() =>
                            navigate(`/userProfile/${viewUserData[0].account_name}?Profile`, 
                            {state: {passDets: viewUserData[0]}})}
                        >View Display</button>
                    )}
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
                                    <td colSpan="8">No books available for this user.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    )}

                    {reportTrigger && (
                        <>
                        {reportData.length > 0 ? (
                            reportData.map((report, index) => (
                                <div className="user-reports-bar">
                                    <div className="user-content">
                                        <div className="user-div-content">
                                            <h3 style={{marginRight: "10px"}}>By: </h3>
                                            <img src={report.reportedby.profile} alt="" />
                                            <h3>{report.reportedby.account_name}</h3>
                                        </div>
                                        <h3>Report Number #{report.id}</h3>
                                        <h3>Reported: {ConvertDate(report.time)} ago</h3>
                                        <button onClick={() => {setDisplayReport(true), setViewContentReport(report)}}>View Report</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-reports">
                                <img src={noreport}/>
                                <h3>No reports have been made ...</h3>
                            </div>
                        )}
                        </>
                        
                    )}

                {displayReport && (
                    <>
                    <div className="exposure" onClick={() => setDisplayReport(false)}></div>
                    <div className="Sell-container report">
                        <div className='report-1st'>
                            <h3>Report</h3>
                        </div>
                        <hr />
                        <div className='report-2nd view-report-2nd'>
                            <h3>Subject: *</h3>
                            <input type="text" placeholder={viewContentReport.subject} disabled/>
                            <h3>Content: *</h3>
                            <textarea type="text" placeholder={viewContentReport.content} disabled/>
                        </div>
                    </div>
                    </>
                )}

                </div>
            </div>
        </>
    )
}