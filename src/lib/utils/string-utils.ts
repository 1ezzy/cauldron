export const stringToIndex = (name: string) => {
	return name
		.toLowerCase()
		.replace(/[^-\w\s]/gi, '')
		.replaceAll(/\s+/g, '-');
};
