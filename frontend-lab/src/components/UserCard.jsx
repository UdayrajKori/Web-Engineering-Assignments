import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <article>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>

      <Link to={`/users/${user.id}`}>View Details</Link>
    </article>
  );
}
