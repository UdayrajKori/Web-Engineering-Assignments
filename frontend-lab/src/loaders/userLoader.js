import { users } from "../data/users.js";

export function userLoader({ params }) {
  const user = users.find((user) => user.id === Number(params.id));

  if (!user) {
    throw new Response("User Not Found", {
      status: 404,
      statusText: "User Not Found",
    });
  }

  return user;
}
