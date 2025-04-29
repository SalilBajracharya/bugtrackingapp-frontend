import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { submitBugReport } from "../../features/bugs/bugSlice";
import toast from "react-hot-toast";

export const CreateBugModal = ({ isOpen, onClose, onSuccess }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.bugs);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [severityLevel, setSeverityLevel] = useState('Low');
    const [reproductionSteps, setReproductionSteps] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Dispatch the action
          const resultAction = await dispatch(submitBugReport({ title, description, severityLevel, reproductionSteps, file }));
      
          // Check if the action was fulfilled
          if (resultAction.type === submitBugReport.fulfilled.type) {
            toast.success('Bug report created successfully!');
            onClose();
            onSuccess?.();
          } else {
            throw new Error(resultAction.payload || 'Failed to create bug');
          }
        } catch (error) {
          toast.error(error.message);
        }
      };
      
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create Bug Report</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <select value={severityLevel} onChange={(e) => setSeverityLevel(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                    <textarea
                        placeholder="Reproduction Steps"
                        value={reproductionSteps}
                        onChange={(e) => setReproductionSteps(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}