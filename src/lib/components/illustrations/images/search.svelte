<script lang="ts">
	import type { Format, Size } from './type';
	import { StaticImage } from './index';

	export let size: Size = 'm';
	export let format: Format = 'webp';
</script>

<StaticImage name="search" alt="book illustration with a magnifying glass" {size} {format} />
