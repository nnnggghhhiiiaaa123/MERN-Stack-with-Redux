import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from './redux/userSlice';
import axios from 'axios';

function Users() {
    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteuser/' +id)
        .then(() => {
            dispatch(deleteUser({id}))
            console.log(useSelector(state => state.user.users))
        }).catch(err => console.log(err))
    }
    
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success btn-sm">
                    Add +
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>
                            <Link to={`/edit/${user.id}`} className="btn btn-sm btn-success me-2">Update</Link>
                            <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
