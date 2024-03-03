<script lang="ts">
	import type { Format, Size } from './type';
	import { StaticImage } from './index';

	export let size: Size = 'm';
	export let format: Format = 'webp';
</script>

<StaticImage
	name="locked-book"
	alt="an illustration of a book covered with a lock"
	{size}
	{format}
/>
