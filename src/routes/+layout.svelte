<script>
	import { registerVault } from '@core';
	import '../app.css';
	import { browser } from '$app/environment';

	if (browser) {
		registerVault(window);
	}
</script>

<slot />
