
const TeamCard = ({ team }) => {
  return (
    <div className="team-card">
      <h2>{team.teamName}</h2>
      <h3>Team Members:</h3>
      <ul>
        {team.teamMembers.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamCard;
