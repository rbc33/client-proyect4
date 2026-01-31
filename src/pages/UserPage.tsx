import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API_URL from "../utils";

interface formBodyProps {
    _id: string;
    name: string;
    password?: string;
}

function UserPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [userName, setUserName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    if (password && password !== repPassword) {
      toast.error("Passwords don't match");
      return;
    }

    let formBody: formBodyProps = { _id: user!._id, name: userName, password: password };
    if (!password) {
        formBody = { _id: user!._id, name: userName };
    }


    fetch(`${API_URL}/auth/user/${user!._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify(formBody),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("User updated successfully");
        }
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex h-screen items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-4">
            User Profile
          </h2>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                value={userName}
                className="input input-bordered w-full"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">New Password</span>
              </label>
              <input
                id="password"
                value={password}
                className="input input-bordered w-full"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave empty to keep current"
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="reppassword">
                <span className="label-text">Repeat Password</span>
              </label>
              <input
                id="reppassword"
                value={repPassword}
                className="input input-bordered w-full"
                type="password"
                onChange={(e) => setRepPassword(e.target.value)}
              />
            </div>

            <div className="form-control mt-4">
              <button className="btn btn-primary w-full" type="submit">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
