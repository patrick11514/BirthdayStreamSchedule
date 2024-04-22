import { Server } from '$/lib/server/server';
import type { PageServerLoad } from './$types';

export const load = (async (ev) => {
    return {
        currentNext: await Server.ssr.timetable.currentNext(ev)
    };
}) satisfies PageServerLoad;
