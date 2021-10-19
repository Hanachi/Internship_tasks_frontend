import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
	appBar: {
		width: '100%',
		borderRadius: 5,
		marginBottom: '15px',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
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
		justifyContent: 'flex-start',
		width: '100%',
	},
	profile: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	profileBar: {
		display: 'flex',
		width: '250px',
		alignItems: 'center',
		justifyContent: 'space-between'
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
	arrowIcon: {
		color: 'white'
	}
}));