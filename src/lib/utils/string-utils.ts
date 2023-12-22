export const formatSpellLevel = (level: number) => {
	switch (level) {
		case 0:
			return `Cantrip`;
		case 1:
			return `${level}st level spell`;
		case 2:
			return `${level}nd level spell`;
		case 3:
			return `${level}rd level spell`;
		default:
			return `${level}th level spell`;
	}
};

export const formatSpellLevelWithSchool = (level: number, school: string) => {
	switch (level) {
		case 0:
			return `${school} cantrip`;
		case 1:
			return `${level}st level ${school}`;
		case 2:
			return `${level}nd level ${school}`;
		case 3:
			return `${level}rd level ${school}`;
		default:
			return `${level}th level ${school}`;
	}
};

export const capitalizeFirstLetter = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};

export const stringToIndex = (name: string) => {
	return name
		.toLowerCase()
		.replace(/[^-\w\s]/gi, '')
		.replaceAll(/\s+/g, '-');
};
