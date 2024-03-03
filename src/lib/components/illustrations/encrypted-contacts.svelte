<script lang="ts">
	import { LockedBook } from './images';
	import { LL } from '@i18n';
</script>

<div class="flex flex-col items-center gap-4">
	<div class="opacity-60 grayscale">
		<LockedBook size="m" />
	</div>

	<p class="text-lg">{$LL.states.encryptedContacts()}</p>
</div>
