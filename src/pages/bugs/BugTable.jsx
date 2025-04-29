import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { BugStatusEnum, SeverityEnum } from "../../enums/bugEnums";
import { ViewBugModal } from "../../components/bugs/ViewBugModal";
import { useState } from "react";
import { deleteBug } from "../../services/bug/bugService";
import toast from "react-hot-toast";
import { CreateBugModal } from "../../components/bugs/CreateBugModal";

const BugTable = ({ bugs, fetchBugs }) => {
    const [selectedBug, setSelectedBug] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [bugToEdit, setBugToEdit] = useState(null);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleView = (bug) => {
        setSelectedBug(bug);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBug(null);
    };

    const handleDelete = async (bug) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the bug: ${bug.title}?`);
        if (!confirmDelete) return;

        try {

            const result = await deleteBug(token, bug.id);
            if (result) {
                toast.success("Bug deleted successfully!");
                await fetchBugs();
            }
        } catch (error) {
            toast.error("Failed to delete bug.");
        }
    };

    const handleEdit = (bug) => {
        setBugToEdit(bug);
        setIsEditModalOpen(true);
    };

    return (
        <>
            <table className="bug-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Severity</th>
                        <th>Created By</th>
                        <th>Assigned To</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bugs.map((bug) => (
                        <tr key={bug.id}>
                            <td>{bug.title}</td>
                            <td>{bug.description}</td>
                            <td>{BugStatusEnum[bug.status] || "Unknown"}</td>
                            <td>{SeverityEnum[bug.severityLevel] || "Unknown"}</td>
                            <td>{bug.reporter}</td>
                            <td>{bug.developer}</td>
                            <td>
                                <FaEye className="icon view-icon" onClick={() => handleView(bug)} title="View" />
                                <FaEdit className="icon edit-icon" onClick={() => handleEdit(bug)} title="Edit" />
                                    {role !== "Developer" && (
                                <FaTrash className="icon delete-icon" onClick={() => handleDelete(bug)} title="Delete" />
                            )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ViewBugModal bug={selectedBug} isOpen={isModalOpen} onClose={handleCloseModal} />
            <CreateBugModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false); 
                    setBugToEdit(null); 
                }}
                onSuccess={fetchBugs} 
                bug={bugToEdit}
            />
        </>
    );
};

export default BugTable;
