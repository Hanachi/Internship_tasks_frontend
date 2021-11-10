import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";

import { getUsers } from '../../api';
import './Users.css'

const Users = () => {
	const [users, setUsers] = useState();

	useEffect(() => {
		getUsers()
		.then(res => {
			setUsers(res.data);
		})
	}, [])

	return (
		<div className='users-container'>
			{JSON.stringify(users)}
		</div>
	)
}

export default Users;