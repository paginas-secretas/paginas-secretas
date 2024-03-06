<script lang="ts">
	import type { Format, Size } from './type';
	import { StaticImage } from './index';

	export let size: Size = 'm';
	export let format: Format = 'webp';
</script>

<StaticImage name="logo" alt="application logo" {size} {format} />
