import { Server } from '$/lib/server/server';
import type { PageServerLoad } from './$types';

export const load = (async (ev) => {
    return {
        data: await Server.ssr.timetable.full(ev),
        start: await Server.ssr.timetable.start(ev)
    };
}) satisfies PageServerLoad;
