<script lang="ts">
	import type { Size } from './type';
	import { base } from '$app/paths';

	export let size: Size = 'm';
</script>

<img
	src="{base}/webp/{size}/locked-book.webp"
	alt="an illustration of a book covered with a lock"
/>
