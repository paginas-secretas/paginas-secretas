<script lang="ts">
	import { LL } from '@i18n';
	export let value: string;
</script>

<div class="max-w-md">
	<div
		class="relative flex items-center w-full h-12 rounded-3xl focus-within:shadow-lg overflow-hidden bg-gray-800"
	>
		<div class="grid place-items-center h-full w-12 ml-2 text-white">
			<svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
				<path
					fill="currentColor"
					d="M8.195 0c4.527 0 8.196 3.62 8.196 8.084a7.989 7.989 0 0 1-1.977 5.267l5.388 5.473a.686.686 0 0 1-.015.98a.71.71 0 0 1-.993-.014l-5.383-5.47a8.23 8.23 0 0 1-5.216 1.849C3.67 16.169 0 12.549 0 8.084C0 3.62 3.67 0 8.195 0m0 1.386c-3.75 0-6.79 2.999-6.79 6.698c0 3.7 3.04 6.699 6.79 6.699s6.791-3 6.791-6.699c0-3.7-3.04-6.698-6.79-6.698"
				/>
			</svg>
		</div>

		<input
			class="peer h-full w-full outline-none text-sm text-white pr-2 bg-gray-800"
			type="text"
			id="contacts-search-bar"
			placeholder={$LL.searchBarPlaceholder()}
			bind:value
		/>
	</div>
</div>
