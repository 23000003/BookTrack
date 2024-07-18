import '../styles/Admin.css'
import { useNavigate, Outlet } from 'react-router-dom';

export default function AdminPanel(){

    const navigate = useNavigate();

    return(
        <div className="admin-container">
            <div className="admin-background">
                <div className="Welcome">
                    <img src="https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/pfp.jpg?t=2024-05-29T05%3A50%3A57.482Z" alt=""/>
                    <h2>Hello Admin 1</h2>
                </div>
                <div className="admin-view">
                    <div className="view-container">
                        <div className="tab-labels">
                            <h2 onClick={() => navigate('/AdminPanel/ViewAccounts')}>Accounts</h2>
                            <hr />
                            <h2 onClick={() => navigate('/AdminPanel/PostApproval')}>Post Approval</h2>
                        </div>
                        <Outlet />
                    </div>
                    <div style={{ marginTop: '10%' }}></div>
                </div>
            </div>
        </div>
    );
}
