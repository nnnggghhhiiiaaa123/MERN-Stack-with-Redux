import axios from "axios";
import { useEffect, useState } from "react";
import { updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
    const { id } = useParams();                      // ✅ fix
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector(state => state.user.users);  // ✅ fix
    const user = users.find(u => u.id === id);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    // ✅ set data khi user có
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAge(user.age);
        }
    }, [user]);

    const handleUpdate = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3001/update/${id}`, {
            name,
            email,
            age
        })
        .then(() => {
            dispatch(updateUser({ id, name, email, age }));
            navigate("/");
        })
        .catch(err => console.log(err));
    };

    if (!user) {
        return <h3 className="text-center mt-5">Loading...</h3>;
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                    <h2>Update User</h2>

                    <div className="mb-2">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label>Age</label>
                        <input
                            type="text"
                            className="form-control"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
