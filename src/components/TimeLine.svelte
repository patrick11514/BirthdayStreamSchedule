<script lang="ts">
    import type { TimeTable } from '$/lib/server/_data';
    import { onMount } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    export let timetable: TimeTable;
    export let start = 0;

    let offset = 200;
    let timer: number;

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

<div class="block h-full w-full overflow-hidden">
    <div
        class="relative top-middle z-10 h-[2px] w-full bg-red-500 after:float-end after:font-bold after:drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,0.8)] after:content-['Aktuální_čas'] 2xl:after:text-2xl"
    />
    <div style="margin-top:{offset}px;" class="relative top-main mx-auto w-[80%] md:w-[60%] lg:w-[50%] lg:max-w-[512px]">
        {#each timetable as item}
            <div style="height: {item.duration * 10}px;" class={twMerge('my-[100px] flex flex-col bg-secondary p-2', item.color ?? '')}>
                <h2 class="font-bold 2xl:text-2xl">{toHours(item.start)}</h2>
                <div class="my-auto flex flex-col gap-1 2xl:text-xl">
                    <h1 class="font-roboto text-2xl font-bold 2xl:text-3xl">{item.name}</h1>
                    <h2 class="text-xl font-semibold 2xl:text-2xl">{item.description}</h2>
                    <span>{item.hosts.join(', ')}</span>
                </div>
                <h2 class="font-bold 2xl:text-2xl">{toHours(item.end)}</h2>
            </div>
        {/each}
    </div>
</div>
