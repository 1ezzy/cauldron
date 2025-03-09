export const stringToIndex = (name: string) => {
	return name
		.toLowerCase()
		.replace(/[^-\w\s/]/gi, '')
		.replaceAll(/[\s/]+/g, '-');
};

export const formatSpellLevel = (level: number, school?: string) => {
	switch (level) {
		case 0:
			return `${school} cantrip`;
		case 1:
			return `${level}st level` + (school ? ` ${school}` : '');
		case 2:
			return `${level}nd level` + (school ? ` ${school}` : '');
		case 3:
			return `${level}rd level` + (school ? ` ${school}` : '');
		default:
			return `${level}th level` + (school ? ` ${school}` : '');
	}
};
