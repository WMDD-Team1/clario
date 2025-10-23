export const getTaxRateByProvince = (province) => {
	let rate = 0.12;
	if (province.toLowerCase() === "qc") rate = 0.14975;
	return rate;
};
