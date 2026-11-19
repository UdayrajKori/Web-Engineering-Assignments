import UserCard from "../components/UserCard.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { users } from "../data/users.js";

export default function Users() {
  const [search, setSearch] = useLocalStorage("user-search", "");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section>
      <h1>Users List</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}

      {filteredUsers.length === 0 && <p>No users found.</p>}
    </section>
  );
}
