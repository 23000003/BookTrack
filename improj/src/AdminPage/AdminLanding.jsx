import '../styles/Admin.css'

export default function AdminPanel(){

    return(
        <div className="admin-container">
            <div className="admin-background">
                <div className="Welcome">
                    <img src="https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/pfp.jpg?t=2024-05-29T05%3A50%3A57.482Z" alt=""/>
                    <h2>Hello Admin 1</h2>
                </div>
                <div className="Data">
                    
                    <div className="Data-Card">
                        <div style={{margin: '2em', width: '100%'}}>
                            <div className="Data-Card-Child1">                        
                                <h2 style={{fontSize: '22px'}}>Number of Books On Sale</h2>
                            </div>
                            <div className="Data-Card-Child2">
                                <h2>100</h2>
                            </div>
                        </div>
                    </div>

                    <div className="Data-Card">
                        <div style={{margin: '2em', width: '100%'}}>
                            <div className0="Data-Card-Child1">                        
                                <h2 style={{fontSize: '22px'}}>Number of Books On Sale</h2>
                            </div>
                            <div className="Data-Card-Child2">
                                <h2>100</h2>
                            </div>
                        </div>
                    </div>

                    <div className="Data-Card">
                        <div style={{margin: '2em', width: '100%'}}>
                            <div className="Data-Card-Child1">                        
                                <h2 style={{fontSize: '22px'}}>Number of Books On Sale</h2>
                            </div>
                            <div className="Data-Card-Child2">
                                <h2>100</h2>
                            </div>
                        </div>
                    </div>

                    <div className="Data-Card">
                        <div style={{margin: '2em', width: '100%'}}>
                            <div className="Data-Card-Child1">                        
                                <h2 style={{fontSize: '22px'}}>Number of Books On Sale</h2>
                            </div>
                            <div className="Data-Card-Child2">
                                <h2>100</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="admin-view">
                    <div className="view-container">
                        <div className="tab-labels">
                            <h2>Accounts</h2>
                            <hr/>
                            <h2>Post Approval</h2>
                        </div>
                        <div className="account-data">
                            <h2>Accounts</h2>
                            <h2 style={{marginLeft: '25%'}}>No. Of Books On Sale</h2>
                            <h2 style={{marginLeft: '20%'}}>Total Transactions</h2>
                        </div>
                        <div class="Accounts-container">
                            <div class="Accounts">
                                <img src="https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/pfp.jpg?t=2024-05-29T05%3A50%3A57.482Z" alt=""/>
                                <h4 style={{marginLeft: '3%'}}>Account Name</h4>
                                <p style={{marginLeft: '23%'}}>5</p>
                                <p style={{marginLeft: '30%'}}>5</p>
                                <button className="View-button">View</button>
                            </div>
                            <hr/>
                        </div>
                    </div>
                    <div style={{marginTop: '10%'}}></div>
                </div>
            </div>
        </div>
    );
}