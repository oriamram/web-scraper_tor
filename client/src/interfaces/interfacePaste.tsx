export interface paste {
	_id: string;
	title: string;
	author: string;
	content: string;
	date: Date;
	tags: Array<String>;
	polarity: number;
}
