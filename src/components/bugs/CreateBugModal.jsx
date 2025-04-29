import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { submitBugReport, updateBugReportThunk } from "../../features/bugs/bugSlice";
import { fetchDevelopers } from "../../services/user/userService";
import toast from "react-hot-toast";

export const CreateBugModal = ({ isOpen, onClose, onSuccess, bug = null }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.bugs);

    const [title, setTitle] = useState(bug?.title || '');
    const [description, setDescription] = useState(bug?.description || '');
    const [severityLevel, setSeverityLevel] = useState(bug?.severityLevel || 'Low');
    const [status, setStatus] = useState(bug?.status || 'Open');
    const [developerId, setDeveloperId] = useState(bug?.developerId || '');
    const [reproductionSteps, setReproductionSteps] = useState(bug?.reproductionSteps || '');
    const [file, setFile] = useState(null);
    const [developers, setDevelopers] = useState([]);

    const role = localStorage.getItem("role");

    useEffect(() => {
        if (isOpen) {
            if (bug) {
                setTitle(bug.title || '');
                setDescription(bug.description || '');
                setSeverityLevel(bug.severityLevel || 'Low');
                setReproductionSteps(bug.reproductionSteps || '');
                setStatus(bug.status || 'Open');
                setDeveloperId(bug.developerId || '');
            } else {
                setTitle('');
                setDescription('');
                setSeverityLevel('Low');
                setReproductionSteps('');
                setStatus('Open');
                setDeveloperId('');
                setFile(null);
            }
        }
    }, [isOpen, bug]);

    useEffect(() => {
        if (isOpen && role === 'Developer') {
            fetchDevelopers()
                .then((data) => setDevelopers(data))
                .catch((err) => {
                    toast.error("Failed to load developers");
                    console.error(err);
                });
        }
    }, [isOpen, role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let resultAction;
            if (bug) {
                resultAction = await dispatch(updateBugReportThunk({
                    id: bug.id,
                    title,
                    description,
                    severityLevel,
                    status,
                    developerId,
                    reproductionSteps,
                    file
                }));
            } else {
                resultAction = await dispatch(submitBugReport({
                    title,
                    description,
                    severityLevel,
                    reproductionSteps,
                    file
                }));
            }

            if (
                resultAction.type === submitBugReport.fulfilled.type ||
                resultAction.type === updateBugReportThunk.fulfilled.type
            ) {
                toast.success(bug ? 'Bug updated successfully!' : 'Bug report created successfully!');
                onClose();
                onSuccess?.();
            } else {
                throw new Error(resultAction.payload || 'Failed to save bug');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{bug ? 'Edit Bug Report' : 'Create Bug Report'}</h2>
                <form onSubmit={handleSubmit}>
                    {(role !== "Developer") && (
                        <>
                            <div>
                                <label htmlFor="title">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="reproductionSteps">Reproduction Steps</label>
                                <textarea
                                    id="reproductionSteps"
                                    placeholder="Reproduction Steps"
                                    value={reproductionSteps}
                                    onChange={(e) => setReproductionSteps(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="file">File (optional)</label>
                                <input
                                    id="file"
                                    type="file"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label htmlFor="severityLevel">Severity Level</label>
                        <select
                            id="severityLevel"
                            value={severityLevel}
                            onChange={(e) => setSeverityLevel(e.target.value)}
                        >
                            <option value="0">Low</option>
                            <option value="1">Medium</option>
                            <option value="2">High</option>
                            <option value="3">Critical</option>
                        </select>
                    </div>

                    {role === "Developer" && (
                        <>
                            <div>
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="0">Open</option>
                                    <option value="1">In Progress</option>
                                    <option value="2">Resolved</option>
                                    <option value="3">Closed</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="developerId">Assign Developer</label>
                                <select
                                    id="developerId"
                                    value={developerId}
                                    onChange={(e) => setDeveloperId(e.target.value)}
                                >
                                    <option value="">-- Select Developer --</option>
                                    {developers.map((dev) => (
                                        <option key={dev.developerId} value={dev.developerId}>
                                            {dev.fullName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    <div className="frm-buttons">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button className="btn-close" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
