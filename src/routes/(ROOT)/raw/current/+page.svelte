<script lang="ts">
    import { API } from '$/lib/api';
    import type { TableItem } from '$/lib/server/_data';
    import { onMount } from 'svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData;

    let current: undefined | null | TableItem = undefined;

    const parseData = (response: (typeof data)['current']) => {
        if (!response.status) {
            return;
        }

        current = response.data;
    };

    parseData(data.current);

    const getData = async () => {
        const response = await API.timetable.current();

        parseData(response);
    };

    let timerCounter: number | undefined = undefined;

    let currentTimeLeft = -1;

    const calculateTime = async () => {
        if (current && current.end < Date.now()) {
            await getData();
        }

        if (current) {
            currentTimeLeft = current.end - Date.now();
        }
    };

    onMount(() => {
        //timers
        getData().then(() => {
            //set timer
            timerCounter = setInterval(calculateTime, 1000);
            calculateTime();
        });

        return () => {
            if (timerCounter !== undefined) {
                clearInterval(timerCounter);
            }
        };
    });

    const millsToHHMMSS = (mills: number) => {
        const seconds = Math.floor(mills / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    };
</script>

<section class="flex flex-1 flex-col items-center justify-center">
    <div class="flex flex-row flex-wrap items-center justify-center gap-8">
        <div class="flex aspect-square w-[300px] flex-col items-center justify-center rounded-lg bg-secondary p-8 text-center">
            {#if current === null}
                <h3 class="mx-auto text-center font-ubuntu text-2xl font-bold 2xl:text-4xl">Pauza</h3>
                <p class="text-lg 2xl:text-2xl">Aktuálně probíhá pauza</p>
            {:else if current === undefined}
                <h3 class="mx-auto text-center font-ubuntu text-2xl font-bold 2xl:text-4xl">Nic</h3>
                <p class="text-lg 2xl:text-2xl">Aktuálně neprobíhá žádná událost</p>
            {:else}
                <h3 class="mx-auto text-center font-ubuntu text-2xl font-bold 2xl:text-4xl">{current.name}</h3>
                <p class="text-lg 2xl:text-2xl">{current.description}</p>
                <p class="text-l 2xl:text-2xl">{current.hosts.join(', ')}</p>
                <p class="text-lg 2xl:text-2xl">
                    Zbývá: {#if currentTimeLeft > -1}
                        {millsToHHMMSS(currentTimeLeft)}
                    {:else}
                        --:--:--
                    {/if}
                </p>
            {/if}
        </div>
    </div>
</section>
