<script lang="ts">
	import type { Contact } from '@models';

	export let contact: Contact;
</script>

<div class="flex flex-row gap-4">
	<div class="avatar">
		<span class="text-lg">{contact.name.split(' ').reduce((p, c) => `${p}${c.charAt(0)}`, '')}</span
		>
	</div>
	<div class="flex flex-col">
		<p><b>{contact.name}</b></p>
		<p>{contact.gender}</p>
	</div>
</div>
