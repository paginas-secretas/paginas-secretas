<script lang="ts">
	import type { ContactsList } from '@models';
	import { ContactTile } from '../contact-tile';

	export let contactsList: ContactsList;
</script>

<ul class="overflow-auto">
	{#each contactsList as contact}
		<li class="px-4 py-3">
			<ContactTile {contact} />
		</li>
	{/each}
</ul>
