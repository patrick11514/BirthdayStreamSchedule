<script lang="ts">
    import { onMount } from 'svelte'
    import { getCurrentIndex, getRealSchedule, start } from '$lib/fcs'
    import schedule from '$lib/schedule'

    const realSchedule = getRealSchedule(schedule, start)

    let current = 0

    let currentTime = ''
    let upcomingTime = ''

    const timer = () => {
        current = getCurrentIndex(realSchedule)

        currentTime = realSchedule[current] ? calculateRemain(realSchedule[current].toDate) : ''
        upcomingTime = realSchedule[current + 1] ? calculateRemain(realSchedule[current + 1].fromDate) : ''
        setTimeout(timer, 1000)
    }

    onMount(() => {
        timer()
    })

    const calculateRemain = (to: Date) => {
        let now = new Date()
        let diff = to.getTime() - now.getTime()

        //write in hours
        if (diff / 1000 / 60 / 60 > 1) {
            let hours = diff / 1000 / 60 / 60
            let text = hours.toFixed(1) + ' hodin'

            //grammar
            if (hours > 1) {
                text += 'y'
            } else {
                text += 'a'
            }

            return text
        }

        //write in minutes
        if (diff / 1000 / 60 > 1) {
            let minutes = diff / 1000 / 60
            let text = minutes.toFixed(1) + ' minut'

            //grammar
            if (minutes > 1) {
                text += 'y'
            } else {
                text += 'a'
            }

            return text
        }

        //write in seconds
        if (diff / 1000 > 1) {
            let seconds = diff / 1000
            let text = seconds.toFixed(1) + ' sekund'

            //grammar
            if (seconds > 1) {
                text += 'y'
            } else {
                text += 'a'
            }

            return text
        }

        return '0 sekund'
    }
</script>

<div class="flex flex-col w-full h-full text-4xl font-bold text-center">
    <div class="mt-auto mb-0 mx-auto">Aktuální: {realSchedule[current] ? realSchedule[current].name + ' (Končí za ' + currentTime + ')' : 'Nic'}</div>
    <div class="mt-0 mb-auto mx-auto">Nadcházející: {realSchedule[current + 1] ? realSchedule[current + 1].name + ' (Začíná za ' + upcomingTime + ')' : 'Nic'}</div>
</div>
