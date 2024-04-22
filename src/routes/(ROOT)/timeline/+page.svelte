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

<section class="flex max-h-timeline flex-1 flex-col items-center justify-center gap-8">
    <h2 class="mx-auto text-center font-ubuntu text-3xl font-semibold 2xl:text-5xl">Automaticky scrollovací rozvrh, který ukazuje, kde se aktuálně nacházíme</h2>
    <a href="/" class="mb-8 text-center font-ubuntu text-xl font-semibold text-primary 2xl:text-3xl">Zpátky na hlavní stránku</a>
    {#if timetable !== undefined}
        <TimeLine {start} {timetable} />
    {/if}
</section>
