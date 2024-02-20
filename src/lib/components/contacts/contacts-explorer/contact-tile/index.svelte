<script lang="ts">
	import type { Contact } from '@models';

	export let contact: Contact;
	export let onClick: () => void;
</script>

<a href="#top" on:click={onClick}>
	<div class="flex flex-row gap-4 items-center hover:rounded-xl hover:bg-slate-800 hover:cli">
		<div class="avatar ml-1">
			<span class="text-lg"
				>{contact.name.split(' ').reduce((p, c) => `${p}${c.charAt(0)}`, '')}</span
			>
		</div>
		<div class="flex flex-col my-1">
			<p><b>{contact.name}</b></p>
			<p>{contact.gender}</p>
		</div>
	</div>
</a>
