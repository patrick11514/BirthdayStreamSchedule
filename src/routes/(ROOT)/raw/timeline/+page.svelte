<script lang="ts">
    import TimeLine from '$/components/TimeLine.svelte';
    import { API } from '$/lib/api';
    import type { TimeTable } from '$/lib/server/_data';
    import { onMount } from 'svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData;

    let timetable: TimeTable | undefined = undefined;
    let start = 0;

    const handleData = (response: (typeof data)['data']) => {
        if (!response.status) {
            return;
        }

        timetable = response.data;
    };

    handleData(data.data);

    const handleStart = (response: (typeof data)['start']) => {
        if (!response.status) {
            return;
        }

        start = response.data;
    };

    handleStart(data.start);

    onMount(() => {
        API.timetable.full().then((data) => handleData(data));
        API.timetable.start().then((data) => handleStart(data));
    });
</script>

<section class="flex h-screen flex-1 flex-col items-center justify-center gap-8">
    {#if timetable !== undefined}
        <TimeLine {start} {timetable} />
    {/if}
</section>
