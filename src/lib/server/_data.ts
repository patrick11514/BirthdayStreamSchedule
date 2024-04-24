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
startDay.setHours(18);
startDay.setMinutes(0);
startDay.setSeconds(0);
startDay.setMilliseconds(0);
startDay.setDate(30);
startDay.setMonth(4 - 1);
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
        name: 'Counter Strike',
        description: 'Prostě CSko :D',
        duration: 120,
        hosts: ['Vikikle', 'Bratranec'],
        color: 'bg-orange-500'
    },
    {
        name: 'League of Legends',
        description: 'Flexy a komentované 2v2',
        duration: 120,
        hosts: ['Vikikle', 'Ondra', 'Miki', 'NsHero'],
        color: 'bg-sky-600'
    },
    {
        name: 'Planet Crafter',
        description: 'Zkoušení multiplayeru',
        duration: 70,
        hosts: ['Vikikle'],
        color: 'bg-red-600'
    },
    {
        name: 'Life is strange 2',
        description: 'Pokračování Life is strange',
        duration: 470,
        hosts: [],
        color: 'bg-green-600'
    },
    {
        name: 'It takes two',
        description: 'Pokračování příběhovky',
        duration: 120,
        hosts: ['Vikikle'],
        color: 'bg-indigo-600'
    },
    {
        name: 'ETS2',
        description: 'ETS2 konvoj s diváky',
        duration: 80,
        hosts: ['Vikikle'],
        color: 'bg-gray-400'
    },
    {
        name: 'Obídek',
        description: 'Přestávka na oběd',
        duration: 20,
        hosts: [],
        color: 'bg-pink-600'
    },
    {
        name: 'Pico park',
        description: 'Hra za kočičky',
        duration: 90,
        hosts: ['Vikikle', 'Ségra', 'Marcus + spol'],
        color: 'bg-yellow-500'
    },
    {
        name: 'Cult of the Lamb',
        description: 'Hrajeme si na kultisty',
        duration: 120,
        hosts: ['Chat'],
        color: 'bg-purple-600'
    },
    {
        name: 'Minecraft',
        description: 'Item swap + minihry',
        duration: 110,
        hosts: ['Vikikle', 'Ségra', 'Marcus + spol', 'Bratranec']
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
