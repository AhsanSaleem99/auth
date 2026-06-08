import connectDB from "@/lib/db";
import getSession from "@/lib/getsession";
import User from "@/models/User";

import { redirect } from "next/navigation";

const getallUsers = async () => {
  await connectDB();
  return await User.find({});
};
const users = await getallUsers();
// console.log("Users in settings page:", users);

const Settings = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user || user.role !== "admin") {
    redirect("/private/dashboard");
  }

  const deleteUser = async (formData: FormData) => {
    "use server";
    const userId = formData.get("userId") as string;
    await connectDB();
    await User.findByIdAndDelete(userId);
    getallUsers();
  };

  return (
    <div className="p-8 bg-neutral-800 min-h-screen text-neutral-100">
      <div className="p-8">
        <h1 className="text-xl font-bold mb-4">Settings</h1>
        <p>Manage user account settings here</p>
      </div>
      <div className="p-8 bg-neutral-900 rounded-xl shadow">
        <table className="p-8 w-full">
          <thead>
            <tr className="text-left">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Here we will render the users and delete them */}
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-t border-neutral-700">
                  <td className="py-2 font-semibold text-neutral-100">
                    {user.firstName}
                  </td>
                  <td className="py-2">{user.lastName}</td>
                  <td className="py-2">
                    <form action={deleteUser}>
                      <input
                        type="hidden"
                        name="userId"
                        value={user._id.toString()}
                      />
                      <button
                        type="submit"
                        className="px-2 py-1 text-sm bg-red-600 hover:bg-red-700 rounded cursor-pointer"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
