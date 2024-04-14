import type { ResponseWithData } from '$/types/types';
import { TIMETABLE, startDay, type TableItem, type TimeTable } from './_data';
import { procedure, router } from './api';

export const r = router({
    timetable: {
        full: procedure.GET.query(async () => {
            return {
                status: true,
                data: TIMETABLE
            } satisfies ResponseWithData<TimeTable>;
        }),
        currentNext: procedure.GET.query(async () => {
            const now = Date.now();
            let isBreak = false;

            let currentIndex = TIMETABLE.findIndex((item) => {
                return item.start <= now && item.end >= now;
            });

            if (currentIndex == -1) {
                //check if in break
                for (const _index in TIMETABLE) {
                    const index = Number(_index);
                    const item = TIMETABLE[index];

                    if (index == TIMETABLE.length - 1) {
                        break;
                    }

                    const nextItem = TIMETABLE[index + 1];

                    if (item.end <= now && nextItem.start >= now) {
                        currentIndex = index;
                        isBreak = true;
                        break;
                    }
                }
            }

            let nextIndex: TableItem | undefined;

            if (currentIndex == -1) {
                if (startDay.getTime() > now) {
                    nextIndex = TIMETABLE[0];
                } else {
                    nextIndex = undefined;
                }
            } else {
                nextIndex = TIMETABLE[currentIndex + 1];
            }

            return {
                status: true,
                data: {
                    current: isBreak ? null : TIMETABLE[currentIndex],
                    next: nextIndex
                }
            } satisfies ResponseWithData<{
                // null = break
                current: TableItem | undefined | null;
                next: TableItem | undefined;
            }>;
        }),
        current: procedure.GET.query(async () => {
            const now = Date.now();

            let isBreak = false;

            let currentIndex = TIMETABLE.findIndex((item) => {
                return item.start <= now && item.end >= now;
            });

            if (currentIndex == -1) {
                //check if in break
                for (const _index in TIMETABLE) {
                    const index = Number(_index);
                    const item = TIMETABLE[index];

                    if (index == TIMETABLE.length - 1) {
                        break;
                    }

                    const nextItem = TIMETABLE[index + 1];

                    if (item.end <= now && nextItem.start >= now) {
                        currentIndex = index;
                        isBreak = true;
                        break;
                    }
                }
            }

            return {
                status: true,
                data: isBreak ? null : TIMETABLE[currentIndex]
            } satisfies ResponseWithData<TableItem | null | undefined>;
        }),
        start: procedure.GET.query(async () => {
            return {
                status: true,
                data: startDay.getTime()
            } satisfies ResponseWithData<number>;
        })
    }
});

export type AppRouter = typeof r;
