import { UserCreateForm } from "@/app/components/users/CreateForm";
import { UserCreateMessage } from "../components/users/UserCreateMessage";
import { UsersGetResponse } from "@/lib/ts/user";
import UsersTable from "../components/users/UsersTable";
import { revalidateTag } from "next/cache";
import ProtectedAdmin from "../components/secure/ProtectedAdmin";
const fetchUsers = async () => {
  try {
    const result = await fetch(`${process.env.URL}/api/users`, {
      next: { tags: ["Users"] },
    });
    if (!result.ok) {
      throw new Error("Failed to fetch");
    }

    return result;
  } catch (error) {
    throw error;
  }
};
export default async function Page() {
  const data = await fetchUsers();
  const users: UsersGetResponse = await data.json();
  return (
    <ProtectedAdmin>
      <h1>Пользователи</h1>
      <UserCreateMessage />
      <UsersTable data={users} />
    </ProtectedAdmin>
  );
}
