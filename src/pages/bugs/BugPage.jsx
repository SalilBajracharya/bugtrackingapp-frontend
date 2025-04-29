import { useCallback, useEffect, useState } from "react";
import { fetchAllBugs, fetchBugsByUser } from "../../services/bug/bugService";
import BugTable from "./BugTable";
import { CreateBugModal } from "../../components/bugs/CreateBugModal";
import Header from "../../components/header/Header";
import { toast } from "react-hot-toast";  // Ensure toast is imported for error handling

const BugPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bugs, setBugs] = useState([]);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    useEffect(() => {
        const loadBugs = async () => {
            if (!token) {
                toast.error("User is not authenticated.");
                return;
            }

            try {
                let bugsData;
                if (role === "User") {
                    bugsData = await fetchBugsByUser(token);
                } else if (role === "Developer") {
                    bugsData = await fetchAllBugs(token);
                }

                setBugs(bugsData);
            } catch (error) {
                toast.error("Failed to load bugs.");
            }
        };

        loadBugs();
    }, [token, role]);

    const handleRefresh = async () => {
        try {
            let data;
            if (role === "User") {
                data = await fetchBugsByUser(token);
            } else if (role === "Developer") {
                data = await fetchAllBugs(token);
            }

            setBugs(data);
        } catch (error) {
            toast.error("Failed to refresh bugs.");
        }
    };

    return (
        <>
            <Header />
            <div className="bug-list-container">
                <h1>Bug Reports</h1>

                {role !== "Developer" && (
                    <button
                        className="create-bug-btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + Create Bug
                    </button>
                )}

                {bugs.length === 0 ? (
                    <p>No bugs reported yet.</p>
                ) : (
                <BugTable 
                    bugs={bugs} 
                    setBugs={setBugs}
                    fetchBugs={handleRefresh} 
                />
                )}

                <CreateBugModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                    }}
                    onSuccess={handleRefresh}
                />
            </div>
        </>
    );
};

export default BugPage;
