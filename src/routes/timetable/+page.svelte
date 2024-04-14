<script lang="ts">
    import Icon from '$/components/Icon.svelte';
    import { API } from '$/lib/api';
    import { formatDate } from '$/lib/functions';
    import type { TimeTable } from '$/lib/server/_data';
    import { onMount } from 'svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData;

    let timetable: undefined | TimeTable = undefined;

    const parseData = (response: (typeof data)['timetable']) => {
        if (!response.status) {
            return;
        }

        timetable = response.data;
    };

    parseData(data.timetable);

    onMount(async () => {
        const response = await API.timetable.full();

        parseData(response);
    });
</script>

<section class="flex flex-1 flex-col items-center justify-center">
    <h2 class="mx-auto text-center font-ubuntu text-3xl font-semibold xl:text-5xl">Zde máš tabulku obsahující kompletní rozvrh</h2>
    <a href="/" class="mb-8 text-center font-ubuntu text-xl font-semibold text-primary 2xl:text-3xl">Zpátky na hlavní stránku</a>
    {#if timetable !== undefined}
        <table class="border-collapse border-2 border-white 2xl:text-2xl">
            <thead>
                <tr>
                    <th class="border-2 border-white p-1">Od</th>
                    <th class="border-2 border-white p-1">Do</th>
                    <th class="border-2 border-white p-1">Název</th>
                    <th class="border-2 border-white p-1">Popisek</th>
                    <th class="border-2 border-white p-1">Hosté</th>
                </tr>
            </thead>
            <tbody>
                {#each timetable as item}
                    <tr>
                        <td class="border-2 border-white p-1">{formatDate(item.start)}</td>
                        <td class="border-2 border-white p-1">{formatDate(item.end)}</td>
                        <td class="border-2 border-white p-1">{item.name}</td>
                        <td class="border-2 border-white p-1">{item.description}</td>
                        {#if item.hosts.length == 0}
                            <td class="text-center"><Icon class="text-2xl text-red-600" name="bi-x" /></td>
                        {:else}
                            <td class="border-2 border-white p-1">{item.hosts.join(', ')}</td>
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
</section>
