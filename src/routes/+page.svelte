<script lang="ts">
	import type { Database } from '$lib/supabase';
	export let data: {
		res: Database['public']['Tables']['Todo']['Row'][];
	};
	import { enhance } from '$app/forms';
	import {
		Button,
		Container,
		Title,
		Divider,
		TextInput,
		Flex,
		Box,
		Paper,
		Group,
		Text,
		ActionIcon
	} from '@svelteuidev/core';
	import { Check, Cross2, Trash, Pencil1 } from 'radix-icons-svelte';
	import Todoblock from '$lib/components/todoblock.svelte';
</script>

<Container>
	<Title order={1}>This is Todo list</Title>
	<Divider />
	<form method="post" action="?/addTodo" use:enhance>
		<Flex>
			<Box css={{ width: '100%', paddingRight: '15px' }}>
				<TextInput placeholder="What do you want to do?" name="detail" required />
			</Box>
			<Button ripple>Add</Button>
		</Flex>
	</form>
	<br />

	{#each data.res as todo}
		{#if todo.detail != null}
			<Todoblock id={todo.id.toString()} detail={todo.detail} />
		{/if}
	{/each}
</Container>
