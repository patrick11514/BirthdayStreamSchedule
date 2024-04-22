<script lang="ts">
    import 'bootstrap-icons/font/bootstrap-icons.min.css';
    import '../app.css';

    import { API } from '$lib/api';
    import type { LayoutData } from './$types';

    export let data: LayoutData;

    API.hydrateFromServer(data.api);
</script>

<slot />
