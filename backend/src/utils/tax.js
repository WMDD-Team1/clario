export const getTaxRateByProvince = (province) => {
	let rate = 0.12;
	console.log(province);
	if (province.toLowerCase() === "quebec") rate = 0.14975;
	return rate;
};
