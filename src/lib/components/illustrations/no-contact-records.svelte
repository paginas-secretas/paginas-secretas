<script lang="ts">
	import { Logo } from './images';
	import { LL } from '@i18n';
</script>

<div class="flex flex-col items-center gap-4">
	<div class="opacity-60 grayscale">
		<Logo size="lg" />
	</div>

	<p class="text-lg">{$LL.states.emptyContactList()}</p>
</div>
