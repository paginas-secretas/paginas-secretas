<script lang="ts">
	import type { Format, Size } from './type';
	import { StaticImage } from './index';

	export let size: Size = 'm';
	export let format: Format = 'webp';
</script>

<StaticImage
	name="feature-not-available"
	alt="an illustration of a man trying to call someone"
	{size}
	{format}
/>
