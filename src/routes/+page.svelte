<script lang="ts">
    import { getCurrentIndex, getRealSchedule, start } from '$lib/fcs'
    import schedule from '$lib/schedule'
    import { onMount } from 'svelte'

    let realSchedule: Array<{
        name: string
        from: string
        to: string
        people?: Array<string>
        fromDate: Date
        toDate: Date
    }> = []

    realSchedule = getRealSchedule(schedule, start)

    let currentPixels = 0
    let currentIndex = 0

    //timer to change offset of the schedule
    const timer = () => {
        let height = document.querySelector('#schedule')?.clientHeight
        if (height) {
            currentPixels = (new Date().getTime() - start.getTime()) / 17500
            let index = getCurrentIndex(realSchedule)

            if (index > -1) {
                currentIndex = index
            }
        }

        setTimeout(timer, 1000)
    }

    onMount(() => {
        timer()
    })
</script>

<div
    id="schedule"
    style={`position: absolute;
	top: calc(50% - ${currentPixels}px - 0.5rem - (${currentIndex} * 0.5rem));
	width: 100%;
	left: 0;
	padding-left: inherit;
	padding-right: inherit;
	overflow-y: hidden;`}
>
    {#each realSchedule as sched}
        <div class="my-2 p-2 rounded-lg bg-[#1e315a] flex flex-row font-bold text-lg" style={`height: ${(sched.toDate.getTime() - sched.fromDate.getTime()) / 17500}px;`}>
            <div class="flex flex-col w-max">
                {#if sched.toDate.getTime() - sched.fromDate.getTime() < 20 * 60 * 1000}
                    <h2 class="my-auto w-max">{sched.from} - {sched.to}</h2>
                {:else}
                    <h2 class="mt-0">{sched.from}</h2>
                    <h2 class="mt-auto mb-0">{sched.to}</h2>
                {/if}
            </div>
            <div class="my-auto flex flex-col w-full">
                {#if sched.people}
                    <h2 class="text-center w-full border-b-2 border-b-white">{sched.name}</h2>
                    <h2 class="mx-auto text-center">{sched.people.join(', ')}</h2>
                {:else}
                    <h2 class="text-center w-full">{sched.name}</h2>
                {/if}
            </div>
        </div>
    {/each}
</div>
<div class="top-2/4 left-0 block absolute w-full h-0.5 bg-red-500" />
