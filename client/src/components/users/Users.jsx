import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";

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
				<Typography className="users-paper">
					{JSON.stringify(users)}
				</Typography>
		</div>
	)
}

export default Users;