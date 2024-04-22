type _TimeTable = {
    name: string;
    description: string;
    //minutes
    duration: number;
    hosts: string[];
    color?: `bg-${string}-${number}` | `bg-${string}`;
}[];

export type TableItem = {
    name: string;
    description: string;
    duration: number;
    start: number;
    end: number;
    hosts: string[];
    color?: `bg-${string}-${number}` | `bg-${string}`;
};

export type TimeTable = TableItem[];

/* SET CORRECT TIME BEFORE START */
export const startDay = new Date();
startDay.setHours(21);
startDay.setMinutes(0);
startDay.setSeconds(0);
startDay.setMilliseconds(0);
startDay.setDate(22);
startDay.setMonth(3);
startDay.setFullYear(2024);

const _break = 10; //minutes

const _TIMETABLE = [
    {
        name: 'Úvod',
        description: 'Úvod streamu, pokec',
        duration: 20,
        hosts: [],
        color: 'bg-blue-600'
    },
    {
        name: 'Minecraft',
        description: 'Minecraft minihry',
        duration: 60,
        hosts: ['Karel', 'Pepa']
    }
] satisfies _TimeTable;

export const TIMETABLE = [] as TimeTable;

_TIMETABLE.forEach((item, index) => {
    let start: number;
    if (index == 0) {
        start = startDay.getTime();
    } else {
        start = TIMETABLE[index - 1].end + _break * 60 * 1000;
    }

    TIMETABLE.push({
        ...item,
        start,
        end: start + item.duration * 60 * 1000
    });
});
