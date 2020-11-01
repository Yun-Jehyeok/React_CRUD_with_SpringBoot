import React, { Component } from 'react';
import ApiService from '../../ApiService';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

class EditUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            message: null
        }
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () => {
        ApiService.fetchUserByID(window.localStorage.getItem("userID"))
            .then( res => {
                let user = res.data;

                this.setState({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    salary: user.salary
                })
            })
            .catch(err => {
                console.log('loadUser() 에러', err);
            });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveUser = (e) => {
        e.preventDefault();

        let user = {
            id: this.state.id,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            salary: this.state.salary
        }

        ApiService.editUser(user)
        .then( res => {
            this.setState({
                message: user.lastName + '님 정보가 수정되었습니다.'
            })

            this.props.history.push('/users');
        })
        .catch( err => {
            console.log('saveUser() 에러', err);
        });
    }

    render() {
        const { username, firstName, lastName, age, salary } = this.state;
        const { onChange, saveUser } = this;

        return (
            <div>
                <Typography variant="h4" style={style}>Edit User</Typography>
                <form>
                    <TextField type="text" name="username" readOnly={true} fullWidth margin="normal" value={username} />
                    <TextField placeholders="Edit your first name" name="firstName" fullWidth margin="normal" value={firstName} onChange={onChange} />
                    <TextField placeholders="Edit your last name" name="lastName" fullWidth margin="normal" value={lastName} onChange={onChange} />
                    <TextField type="number" placeholders="Edit your age" name="age" fullWidth margin="normal" value={age} onChange={onChange} />
                    <TextField type="number" placeholders="Edit your salary" name="salary" fullWidth margin="normal" value={salary} onChange={onChange} />

                    <Button variant="contained" color="primary" onClick={saveUser}>Save</Button>
                </form>
            </div>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default EditUserComponent;