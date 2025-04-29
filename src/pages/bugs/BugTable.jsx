const BugTable = ({bugs}) => {

    if(bugs.length === 0)
    {
        return <p>No bugs reported yet.</p>
    }

    return (
        <table className="bug-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Assignee</th>
                </tr>
            </thead>
            <tbody>
                {bugs.map((bug) => (
                    <tr key={bug.id}>
                        <td>{bug.title}</td>
                        <td>{bug.description}</td>
                        <td>{bug.status}</td>
                        <td>{bug.Developer}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default BugTable;