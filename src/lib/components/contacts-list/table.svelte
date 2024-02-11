<script lang="ts">
	export let headers: string[];
	export let content: string[][];
</script>

<table class="table-hover table">
	<thead>
		<tr>
			{#each headers as header}
				<th>{header}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each content as entry}
			<tr>
				{#each entry as colunm}
					<th>{colunm}</th>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
