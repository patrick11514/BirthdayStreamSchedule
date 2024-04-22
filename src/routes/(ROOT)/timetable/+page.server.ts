import { Server } from '$/lib/server/server';
import type { PageServerLoad } from './$types';

export const load = (async (ev) => {
    return {
        timetable: await Server.ssr.timetable.full(ev)
    };
}) satisfies PageServerLoad;
