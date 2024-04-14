type _TimeTable = {
    name: string;
    description: string;
    //minutes
    duration: number;
    hosts: string[];
}[];

export type TableItem = {
    name: string;
    description: string;
    start: number;
    end: number;
    hosts: string[];
};

export type TimeTable = TableItem[];

export const startDay = new Date();
startDay.setHours(14);
startDay.setMinutes(51);
startDay.setSeconds(0);
startDay.setMilliseconds(0);

const _break = 10; //minutes

const _TIMETABLE = [
    {
        name: 'Úvod',
        description: 'Úvod streamu, pokec',
        duration: 20,
        hosts: []
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
