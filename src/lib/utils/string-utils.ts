export const stringToIndex = (name: string) => {
	return name
		.toLowerCase()
		.replace(/[^-\w\s/]/gi, '')
		.replaceAll(/[\s/]+/g, '-');
};

export const formatSpellLevel = (level: number, school?: string) => {
	switch (level) {
		case 0:
			return `${school ? school + 'cantrip' : 'Cantrip'}`;
		case 1:
			return `${level}st` + (school ? `${' level' + school}` : '');
		case 2:
			return `${level}nd` + (school ? `${' level' + school}` : '');
		case 3:
			return `${level}rd` + (school ? `${' level' + school}` : '');
		default:
			return `${level}th` + (school ? `${' level' + school}` : '');
	}
};

export const capitalizeFirstLetter = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};
