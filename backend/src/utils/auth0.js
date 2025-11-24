import axios from "axios";

export const getManagementToken = async () => {
	const res = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
		client_id: process.env.AUTH0_CLIENT_ID,
		client_secret: process.env.AUTH0_CLIENT_SECRET,
		audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
		grant_type: "client_credentials",
		scope: "create:users read:users update:users",
	});

	return res.data.access_token;
};
