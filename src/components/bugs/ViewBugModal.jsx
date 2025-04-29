import React from "react";
import "./bug.css";

export const ViewBugModal = ({ bug, isOpen, onClose }) => {
    if (!isOpen || !bug) return null;

    const fileUrl = bug.filePath 
    ? `${import.meta.env.VITE_FILE_PATH}${bug.filePath}` 
    : null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Bug Details</h2>
                <p><strong>Title:</strong> {bug.title}</p>
                <p><strong>Description:</strong> {bug.description}</p>
                <p><strong>Severity:</strong> {bug.severityLevel}</p>
                <p><strong>Status:</strong> {bug.status}</p>
                <p><strong>Reproduction Steps:</strong> {bug.reproductionSteps}</p>
                <p><strong>Reporter:</strong> {bug.reporter}</p>
                <p><strong>Assigned Developer:</strong> {bug.developer || 'Not Assigned'}</p>
                <p><strong>Created Date:</strong> {new Date(bug.createdDate).toLocaleString()}</p>

                {fileUrl && (
                    <div className="image-container">
                        <img src={fileUrl} alt="Bug Screenshot" />
                    </div>
                )}

                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
