export interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
}

export const events: Event[] = [
    {
        id: 1,
        title: 'Meeting with Team',
        start: new Date(2024, 14, 12, 10, 0),
        end: new Date(2024, 5, 15, 11, 0),
    },
    {
        id: 2,
        title: 'Lunch Break',
        start: new Date(2024, 5, 15, 12, 0),
        end: new Date(2024, 5, 15, 13, 0),
    },
    {
        id: 3,
        title: 'Project Deadline',
        start: new Date(2024, 5, 17, 9, 0),
        end: new Date(2024, 5, 17, 17, 0),
    },
];

