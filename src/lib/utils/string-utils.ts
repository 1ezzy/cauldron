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
