import "./Groups.css";

export default function Groups(params:{ groups:any[]}) {

    return (
        <div className="listgroups">
            <h2>Your Groups</h2>
            <div className="groups">
                {params.groups.map((group, index) => {
                    if (index > 3)
                        return;
                    return (
                        <div key={index} className="group">
                            <h3>{group.title}</h3>
                            <a className="btn" href={`/home/group/${group.id}`}>Zur Gruppe</a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
