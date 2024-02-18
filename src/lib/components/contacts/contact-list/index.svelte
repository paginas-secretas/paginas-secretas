<script lang="ts">
	import type { ContactsList } from '@models';

	export let contactsList: ContactsList;
</script>

{#if contactsList.length > 0}
	<!-- content here -->
{:else}
	No contacts added yet!
{/if}
