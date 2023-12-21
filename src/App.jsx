import { AvForm, AvField } from 'availity-reactstrap-validation'
import React from 'react'
import { useState } from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody, Button } from 'reactstrap'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

    const [Users, setUsers] = useState([
        {
            id: 1,
            Firstname: 'John',
            Lastname: 'Doe',
            Username: 'Johon',
            Count: 0,
            Active: false,
        },
        {
            id: 2,
            Firstname: 'Will',
            Lastname: 'Smith',
            Username: 'Simple',
            Count: 0,
            Active: false,
        },
    ])

    const [active, setActive] = useState(false)
    const [count, setCount] = useState(0)
    const [selectUser, setSelectUser] = useState([])
    const [editActive, setEditActive] = useState(false)


    var Plus = () => {
        setCount(prev => prev + 1)
    }

    var Minus = () => {
        setCount(prev => prev - 1)
    }

    var checkboxStyle = {
        transform: 'scale(1.5)',
        cursor: 'pointer'
    }

    var toggleModal = () => {
        setActive(prev => !prev)
    }

    var SubmitForm = (event, values) => {
        var obj = {
            id: Users.length + 1,
            Firstname: values.Firstname,
            Lastname: values.Lastname,
            Username: values.Username,
            Count: 0,
            Active: false
        }
        Users.unshift(obj)
        setUsers([...Users])
        setActive(false)
        toast.success("Saved");


    }

    var delCom = (index) => {
        Users.splice(index, 1)
        setUsers([...Users])
        toast.warning("Deleted");

    }

    var editUser = (item) => {
        setSelectUser(item)
        setEditActive(prev => !prev)
    }


    var EditToggleModal = () => {
        setEditActive(prev => !prev)
    }

    var EditSubmitForm = (event, values) => {
        var Firstname = values.Firstname
        var Lastname = values.Lastname
        var Username = values.Username

        Users.map((item, index) => {
            if (item.id === selectUser.id) {
                item.Firstname = Firstname
                item.Lastname = Lastname
                item.Username = Username
            }
        })
        setUsers([...Users])
        setEditActive(false)
        toast.info("Edited");
    }


    return (
        <>
            <ToastContainer />
            <div className='container'>
                <div className="row my-4">
                    <div className="col-3">
                        <input type="search" className='form-control' placeholder='search...' />
                    </div>
                    <div className="col-3">
                        <input id='par' type="checkbox" style={checkboxStyle} />
                        <label htmlFor="par" className='mx-3 text-light'>
                            <h2>Active</h2>
                        </label>
                    </div>
                    <div className="col-3">
                        <Button color='warning float-end px-3 py-2' onClick={toggleModal}>Add</Button>
                    </div>
                </div>
                <hr />
                <div className="row my-3">
                    <div className="col-12">
                        <table className='table table-dark'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Username</th>
                                    <th>Count</th>
                                    <th>Active</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Users.map((item, index) =>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.Firstname}</td>
                                            <td>{item.Lastname}</td>
                                            <td>{item.Username}</td>
                                            <td>
                                                <Button color='outline-light btn-sm mx-1' onClick={Plus}>+</Button>
                                                {count}
                                                <Button color='outline-light btn-sm mx-1' onClick={Minus}>-</Button>
                                            </td>
                                            <td>
                                                <input type="checkbox" checked={item.Active} style={checkboxStyle} />
                                            </td>
                                            <td>
                                                <Button color='outline-warning mx-1 btn-sm' onClick={() => editUser(item)}>edit</Button>

                                                <Button color='outline-danger mx-1 btn-sm' onClick={() => delCom(index)}>delete</Button>
                                            </td>

                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <>
                {/* Modal for Add User */}
                <Modal isOpen={active} toggle={toggleModal}>
                    <ModalHeader>Add User</ModalHeader>
                    <ModalBody>
                        <AvForm id='form' onValidSubmit={SubmitForm}>
                            <AvField name='Firstname' label='Firstname' required />
                            <AvField name='Lastname' label='Lastname' required />
                            <AvField name='Username' label='Username' required />
                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button form='form' color='info'>save</Button>
                        <Button onClick={toggleModal} color='danger'>cancel</Button>
                    </ModalFooter>
                </Modal>

                {/* Modal for Edit User */}
                <Modal isOpen={editActive} toggle={EditToggleModal}>
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalBody>
                        <AvForm id='form' onValidSubmit={EditSubmitForm}>
                            <AvField name='Firstname' label='Firstname' required />
                            <AvField name='Lastname' label='Lastname' required />
                            <AvField name='Username' label='Username' required />
                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button form='form' color='warning'>edit</Button>
                        <Button onClick={EditToggleModal} color='danger'>cancel</Button>
                    </ModalFooter>
                </Modal>

            </>
        </>
    )
}

export default App