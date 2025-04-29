import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { fetchBugsByUser } from "../../services/bug/bugService"
import BugTable from "./BugTable";
import { CreateBugModal } from "../../components/bugs/CreateBugModal";
import Header from "../../components/header/Header";

const BugPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bugs, setBugs] = useState([]);

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    useEffect(() => {
        const loadBugs = async () => {
            if (token) {
                try {
                    const bugsData = await fetchBugsByUser(token);
                    setBugs(bugsData);
                } catch (error) {
                    toast.error('Failed to load bugs.');
                }
            } else {
                navigate("/login");
            }
        };

        loadBugs();
    }, [token]);

    const handleRefresh = async () => {
        try {
            const data = await fetchBugsByUser(token);
            setBugs(data);
        } catch (error) {
            toast.error("Failed to refresh bugs.");
        }
    }

    return (
        <>
            <Header />
            <div className="bug-list-container">
                <h1>Bug Reports</h1>

                {role !== "Developer" && (
                    <button
                        className="create-bug-btn"
                        onClick={() => setIsModalOpen(true)}
                    >+ Create Bug</button>
                )}
                <BugTable bugs={bugs} />

                <CreateBugModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={handleRefresh} />
            </div>
        </>
    )
}

export default BugPage;