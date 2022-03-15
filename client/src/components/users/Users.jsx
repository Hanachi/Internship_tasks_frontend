import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { getUsers } from '../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
	usersContainer: {
		display: 'flex',
		justifyContent: 'center'
	}
}));

const Users = () => {
	const classes = useStyles();
	const [users, setUsers] = useState();

	useEffect(() => {
		getUsers()
		.then(res => {
			setUsers(res.data);
		})
	}, [])
	
	return (
		<div className={classes.usersContainer}>
			<List className={classes.root}>
				{users?.map((user) => {
					const labelId = `checkbox-list-secondary-label-${user.id}`;
					return (
						<ListItem key={user.id} button>
							<Grid container>
								<Grid item xs={3}>
								<ListItemAvatar>
									<Avatar
										alt={user.username}
										src={user.username}
									/>
								</ListItemAvatar>
								</Grid>
								<Grid item xs={3}>
									<ListItemText id={labelId} primary={user.username} />
								</Grid>
								<Grid item xs={3}>
									<ListItemText primary={user.role} />
								</Grid>
								<Grid item xs={3}>
									<ListItemText primary={user.email} />
								</Grid>
							</Grid>
						</ListItem>
					);
				})}
			</List>
		</div>
	)
}

export default Users;