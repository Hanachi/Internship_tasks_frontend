import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
	appBar: {
		width: '100%',
		borderRadius: 5,
		margin: '30px 0',
		display: 'flex',
		flexDirection: 'row',
	},
	heading: {
		color: 'rgba(53, 51, 97, 1)',
		fontFamily: 'Brush Script MT',
	},
	image: {
		marginLeft: '15px',
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%'
	},
	profile: {
		display: 'flex',
		justifyContent: 'space-between '
	},
	userName: {
		display: 'flex',
		alignItems: 'center',
	},
	brandContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},
	loginButton: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	statisticBtn: {
		display: 'flex',
		justifyContent: 'flex-start',
		width: '100%'
	}
}));