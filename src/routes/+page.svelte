<script lang="ts">
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

    let start = new Date()
    /**
     * CHANGE THIS TO THE TIME YOU WANT THE SCHEDULE TO START
     */
    start.setHours(15) // 15
    start.setMinutes(0) // :00
    start.setSeconds(0) // :00
    start.setMilliseconds(0) // :000
    start.setDate(2) // 2nd
    start.setMonth(4 - 1) // April
    /**
     * CHANGE THIS TO THE TIME YOU WANT THE SCHEDULE TO START
     */

    realSchedule = schedule.map((sched, id) => {
        let oneTime = sched.from.split(':')
        let one = new Date()
        one.setDate(start.getDate())
        one.setMonth(start.getMonth())
        one.setHours(parseInt(oneTime[0]))
        one.setMinutes(parseInt(oneTime[1]))
        one.setSeconds(0)
        one.setMilliseconds(0)
        if (one.getTime() < start.getTime()) {
            one.setDate(one.getDate() + 1)
        }

        let twoTime = sched.to.split(':')
        let two = new Date()
        two.setDate(start.getDate())
        two.setMonth(start.getMonth())
        two.setHours(parseInt(twoTime[0]))
        two.setMinutes(parseInt(twoTime[1]))
        two.setSeconds(0)
        two.setMilliseconds(0)
        if (two.getTime() < start.getTime()) {
            two.setDate(two.getDate() + 1)
        }

        if (two.getTime() == start.getTime()) {
            if (id == schedule.length - 1) {
                two.setDate(two.getDate() + 1)
            }
        }
        return {
            name: sched.name,
            from: sched.from,
            to: sched.to,
            people: sched?.people,
            fromDate: one,
            toDate: two
        }
    })

    let currentPixels = 0
    let currentIndex = 0

    const getCurrentIndex = () => {
        let now = new Date()
        let index = -1
        for (let i = 0; i < realSchedule.length; i++) {
            if (now.getTime() > realSchedule[i].fromDate.getTime() && now.getTime() < realSchedule[i].toDate.getTime()) {
                index = i
                break
            }
        }
        return index
    }

    //timer to change offset of the schedule
    const timer = () => {
        let height = document.querySelector('#schedule')?.clientHeight
        if (height) {
            currentPixels = (new Date().getTime() - start.getTime()) / 17500
            let index = getCurrentIndex()
            console.log(index)
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
        <div class="my-2 p-2 rounded-lg bg-gray-500 flex flex-col font-bold text-lg" style={`height: ${(sched.toDate.getTime() - sched.fromDate.getTime()) / 17500}px;`}>
            <h2 class="mt-0">{sched.from}</h2>
            {#if sched.people}
                <h2 class="mt-auto mb-0 text-xl">{sched.name}</h2>
                <h2 class="mb-auto mt-0 text-xl">{sched.people.join(', ')}</h2>
            {:else}
                <h2 class="my-auto text-xl">{sched.name}</h2>
            {/if}
            <h2 class="mb-0">{sched.to}</h2>
        </div>
    {/each}
</div>
<div class="top-2/4 left-0 block absolute w-full h-0.5 bg-red-500" />
