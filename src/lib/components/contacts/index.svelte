<script lang="ts">
	import type { ContactsList } from '@models';
	import { ContactList } from './contact-list';
	import { ContactInformation } from './contact-information';

	export let contactsList: ContactsList;
</script>

{#if contactsList.length > 0}
	<div class="flex flex-row">
		<div class="flex w-1/4">
			<div class="grow">
				<ContactList {contactsList} />
			</div>
			<div class="divider divider-vertical w-min" />
		</div>

		<!-- TODO: change contact based on the selected -->
		<div class="grow"><ContactInformation contact={contactsList[0]} /></div>
	</div>
{:else}
	No contacts added yet!
{/if}
