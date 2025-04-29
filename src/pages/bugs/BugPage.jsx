import { useCallback, useEffect, useState } from "react";
import { fetchAllBugs, fetchBugsByUser } from "../../services/bug/bugService";
import BugTable from "./BugTable";
import { CreateBugModal } from "../../components/bugs/CreateBugModal";
import Header from "../../components/header/Header";
import { toast } from "react-hot-toast";

const BugPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bugs, setBugs] = useState([]);
    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("");
    const [status, setStatus] = useState(""); 
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
                    bugsData = await fetchBugsByUser(token, search, severity, status);
                } else if (role === "Developer") {
                    bugsData = await fetchAllBugs(token, search, severity, status);
                }

                setBugs(bugsData);
            } catch (error) {
                toast.error("Failed to load bugs.");
            }
        };

        loadBugs();
    }, [token, role, search, severity, status]);

    const handleRefresh = async () => {
        try {
            let data;
            if (role === "User") {
                data = await fetchBugsByUser(token, search, severity, status);
            } else if (role === "Developer") {
                data = await fetchAllBugs(token, search, severity, status);
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

                <div className="filter-wrapper">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search Bugs"
                        value={search}  // Fixed variable here
                        onChange={(e) => setSearch(e.target.value)}  // Fixed variable here
                    />

                    <select
                        className="select-dropdown"
                        value={severity}  // Fixed variable here
                        onChange={(e) => setSeverity(e.target.value)}  // Fixed variable here
                    >
                        <option value="">Severity Level</option>
                        <option value="0">Low</option>
                        <option value="1">Medium</option>
                        <option value="2">High</option>
                        <option value="3">Critical</option>
                    </select>

                    <select
                        className="status-dropdown"
                        value={status}  // Fixed variable here
                        onChange={(e) => setStatus(e.target.value)}  // Fixed variable here
                    >
                        <option value="">Status</option>
                        <option value="0">Open</option>
                        <option value="1">In Progress</option>
                        <option value="2">Resolved</option>
                        <option value="3">Closed</option>
                    </select>
                </div>

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
