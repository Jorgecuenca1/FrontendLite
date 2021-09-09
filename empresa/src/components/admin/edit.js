import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory, useParams } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Create() {
	const history = useHistory();
	const { id } = useParams();
	const initialFormData = Object.freeze({
		id: '',
		name: '',
		phone: '',
		nit: '',
		adress: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	useEffect(() => {
		axiosInstance.get('admin/edit/postdetail/' + id).then((res) => {
			updateFormData({
				...formData,
				['name']: res.data.name,
				['nit']: res.data.nit,
				['phone']: res.data.phone,
				['adress']: res.data.adress,
			});
			console.log(res.data);
		});
	}, [updateFormData]);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance.put(`admin/edit/` + id + '/', {
			name: formData.name,
			phone: formData.phone,
			author: 1,
			nit: formData.nit,
			adress: formData.adress,
		});
		history.push({
			pathname: '/admin/',
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Edit Post
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Nombre de la empresa"
								name="name"
								autoComplete="name"
								value={formData.name}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="nit"
								label="Nit de la empresa"
								name="nit"
								autoComplete="nit"
								value={formData.nit}
								onChange={handleChange}
								multiline
								rows={8}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="phone"
								label="Telefono de la empresa"
								name="phone"
								autoComplete="phone"
								value={formData.phone}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="adress"
								label="Direccion de la empresa"
								name="adress"
								autoComplete="adress"
								value={formData.adress}
								onChange={handleChange}
								multiline
								rows={8}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Update Post
					</Button>
				</form>
			</div>
		</Container>
	);
}