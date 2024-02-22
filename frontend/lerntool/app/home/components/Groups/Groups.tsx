import "./Groups.css";

export default function Groups(params:{ groups:any[]}) {
    return (
        <div className="listgroups">
            <h2>Your Groups</h2>
            <div className="groups">
                {params.groups.map((group, index) => {
                    return (
                        <div key={index} className="event">
                            <h3>{group.title}</h3>
                            <a className="btn" href={`/home/group/${group.id}`}> To Group</a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
