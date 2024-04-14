<script lang="ts">
    const links = [
        {
            name: 'Rozvrh v tabulce',
            description: 'Chceš se podívat na kompletní rozvrh? Klikni zde a podívej se na něj v přehledné tabulce.',
            link: '/timetable'
        },
        {
            name: 'Scrollovací timeline',
            description: 'Chceš mít přehled o tom, co teď hrajeme a kolik ještě zbývá v času s automaticky posouvající se časovou osou? Klikni zde.',
            link: '/timeline'
        },
        {
            name: 'Aktuální a nadcháhející událost',
            description: 'Zajímá tě pouze to co teď hrajeme a co bude hned potom, společně s odpočtem? Klikni zde.',
            link: '/current-and-next'
        },
        {
            name: 'Pouze aktuální událost',
            description: 'Zajímá tě pouze to co teď hrajeme? Klikni zde.',
            link: '/current'
        }
    ];
</script>

<section class="flex flex-1 flex-col items-center justify-center gap-8">
    <h2 class="mx-auto text-center font-ubuntu text-3xl font-semibold">Vítej na rozvrhu mého 24h narozeninového streamu</h2>
    <div class="flex flex-row flex-wrap items-center justify-center gap-8">
        {#each links as link}
            <a
                href={link.link}
                class="flex aspect-square max-w-[300px] flex-col items-center justify-center rounded-lg bg-secondary p-8 text-center transition-all duration-150 hover:scale-105"
            >
                <h3 class="mx-auto text-center font-ubuntu text-2xl font-bold">{link.name}</h3>
                <p class="text-lg">{link.description}</p>
            </a>
        {/each}
    </div>
</section>
