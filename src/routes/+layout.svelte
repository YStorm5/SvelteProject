<script>
	import { colorScheme, SvelteUIProvider, Space, Switch, Text, Flex, Box } from '@svelteuidev/core';

	function toggleTheme() {
		colorScheme.update((v) => (v === 'light' ? 'dark' : 'light'));
	}
</script>

<SvelteUIProvider withGlobalStyles themeObserver={$colorScheme}>
	<Flex justify="space-between">
		<Box css={{ padding: '20px' }}>
			<Text>Logo</Text>
		</Box>
		<Box css={{ padding: '20px' }}>
			<Switch on:change={toggleTheme} />
		</Box>
	</Flex>
	<Space h={20} />
	<slot />
</SvelteUIProvider>
