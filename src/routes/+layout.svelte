<script>
	import { registerVault } from '@core';
	import '../app.css';

	registerVault(globalThis.window);
</script>

<slot />
