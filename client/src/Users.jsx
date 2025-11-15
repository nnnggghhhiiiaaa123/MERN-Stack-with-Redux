import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(result => {
            console.log("Data server trả về:", result.data);
            setUser(result.data);   // SỬA LỖI TẠI ĐÂY
        })
        .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/' + id)
        .then(res => {
            console.log("Đã xoá:", res.data);
            window.location.reload();
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success">Add +</Link>
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
                        {
                            user.map(u => (
                                <tr key={u._id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.age}</td>
                                    <td>
                                        <Link 
                                            to={`/update/${u._id}`} 
                                            className="btn btn-success"
                                        >
                                            Update
                                        </Link>
                                        <button 
                                            className="btn btn-danger ms-2"
                                            onClick={() => handleDelete(u._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
