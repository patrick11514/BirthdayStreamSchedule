import { Server } from '$/lib/server/server';
import type { PageServerLoad } from './$types';

export const load = (async (ev) => {
    return {
        current: await Server.ssr.timetable.current(ev)
    };
}) satisfies PageServerLoad;
