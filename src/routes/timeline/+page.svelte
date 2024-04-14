<script lang="ts">
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

    let offset = 200;
    let timer: number | undefined = undefined;

    const calculateOffset = () => {
        //1minute = 10px
        const now = Date.now();

        const diff = now - start; //miliseconds
        const minutes = diff / (60 * 1000); //minutes

        //negative = after start
        //positive = before start

        offset = minutes * 10 * -1 /*Negate*/;
    };

    onMount(() => {
        API.timetable.full().then((data) => handleData(data));
        API.timetable.start().then((data) => handleStart(data));

        timer = setInterval(calculateOffset, 1000);
        calculateOffset();

        return () => {
            if (timer !== undefined) {
                clearInterval(timer);
            }
        };
    });

    const toHours = (mills: number) => {
        const date = new Date(mills);

        const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
        const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;

        return `${hours}:${minutes}`;
    };
</script>

<section class="max-h-timeline flex flex-1 flex-col items-center justify-center gap-8">
    <h2 class="mx-auto text-center font-ubuntu text-3xl font-semibold 2xl:text-5xl">Automaticky scrollovací rozvrh, který ukazuje, kde se aktuálně nacházíme</h2>
    <a href="/" class="mb-8 text-center font-ubuntu text-xl font-semibold text-primary 2xl:text-3xl">Zpátky na hlavní stránku</a>
    {#if timetable !== undefined}
        <div class="block h-full w-full overflow-hidden">
            <div class="top-middle relative z-10 h-[2px] w-full bg-red-500 after:float-end after:font-bold after:content-['Aktuální_čas'] 2xl:after:text-2xl" />
            <div style="margin-top:{offset}px" class="top-main relative mx-auto w-[80%] md:w-[60%] lg:w-[50%] lg:max-w-[512px]">
                {#each timetable as item}
                    <div style="height: {item.duration * 10}px" class="my-[100px] flex flex-col bg-secondary p-2">
                        <h2 class="font-bold 2xl:text-2xl">{toHours(item.start)}</h2>
                        <div class="my-auto 2xl:text-xl">Womp Womp</div>
                        <h2 class="font-bold 2xl:text-2xl">{toHours(item.end)}</h2>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</section>
