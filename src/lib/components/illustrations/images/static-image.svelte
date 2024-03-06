<script lang="ts">
	import type { Format, Size } from './type';
	import { base } from '$app/paths';

	export let name: string;
	export let alt: string;
	export let size: Size = 'm';
	export let format: Format = 'webp';
</script>

<img src="{base}/{format}/{size}/{name}.{format}" {alt} />
