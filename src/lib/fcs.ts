import schedule from './schedule'

export const getRealSchedule = (scheduleData: typeof schedule, start: Date) => {
    return scheduleData.map((sched, id) => {
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
}

export const getCurrentIndex = (
    realSchedule: Array<{
        name: string
        from: string
        to: string
        people?: Array<string>
        fromDate: Date
        toDate: Date
    }>
) => {
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

export const start = new Date()

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
