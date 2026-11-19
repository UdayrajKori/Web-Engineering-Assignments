import { Link, useLoaderData } from "react-router-dom";

export default function UserDetail() {
  const user = useLoaderData();

  return (
    <section>
      <h1>User Details</h1>

      <h3>{user.name}</h3>
      <p>User ID: {user.id}</p>
      <p>Email: {user.email}</p>

      <Link to="/users">Back to Users</Link>
    </section>
  );
}
