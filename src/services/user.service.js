"use stric";
// import httpService from "./http.service";
import secrets from "./secrets.service";
import utills from "./utill.service";
import axois from "axios";

export default {
	login,
	getUser,
    getLoggedInUser,
    logout
};

// const loggedInUser = { name: "niv-test", password: "1111" };
// JSON.parse(sessionStorage.getItem('loggedInUser'))

const BASE_URL = `https://sandbox.d.greeninvoice.co.il/api/v1/`;
let token = null;
let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser")) || null;

function getLoggedInUser() {
	return loggedInUser;
}

// TODO : use http.service for all requests

// login
async function login(user = null) {
	// check if there is data
	if (!user) return;
	// get & check if token expired
	_getToken();

	const { email, password } = user;
	const endpoit = "account/login";

	axois
		.post(`${BASE_URL}${endpoit}`, {
			email,
			password
		})
		.then(
			response => {
				console.log("login ", response.data);
				return _handleSuccessfullLogin(response.data);
			
			},
			error => {
				console.log("error: ", error.errorMessage);
			}
		);
}

// getUser
async function getUser(user = loggedInUser) {
	console.log("service-getUser : ", user);
	_getToken();

	const endpoit = "users/me";

	axois.get(`${BASE_URL}${endpoit}`).then(
		response => {
			console.log("getUser", response);
			return response.data;
		},
		error => {
			console.log("error: ", error);
		}
	);
}

function logout() {
	try {
		sessionStorage.clear();
		loggedInUser = null;
	} catch (err) {
		throw err;
	}
	return {};
}


// :::::::::::::::::::::::::::: //
// :::::::::::::::::::::::::::: //
// Internal Functions //
// :::::::::::::::::::::::::::: //

// getToken
async function _getToken() {
	if (!_isNewTokenRequired()) return;

	const { id, secret } = secrets;
	const endpoit = "account/token";

	axois
		.post(`${BASE_URL}${endpoit}`, {
			id,
			secret
		})
		.then(
			response => {
				// console.log('getToken ',response);
				token = response.data; // save it
				return response.data;
			},
			error => {
				console.log("error: ", error.errorMessage);
			}
		);
}

function _isNewTokenRequired() {
	if (token && token.expires && utills.isTokenValide(token.expires))
		return false;
	else return true;
}

function _handleSuccessfullLogin(user) {
	loggedInUser = { ...user };
	sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
	return user;
}

/*
async function getToken() {
    credentials = await httpService.post(`account/token`, secrets);
	console.log(credentials);    
}*/
