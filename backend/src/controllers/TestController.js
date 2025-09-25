const getText = (req, res) => {
	res.json({ text: "Hello from backend!" });
};

export { getText };
