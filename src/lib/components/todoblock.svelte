<script lang="ts">
	import { TextInput, Flex, Box, Paper, Group, Text, ActionIcon } from '@svelteuidev/core';
	import { colorScheme } from '@svelteuidev/core';
	import { Check, Cross2, Trash, Pencil1 } from 'radix-icons-svelte';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let id: string;
	export let detail: string;
</script>

<Box
	class="todo mb-3"
	on:click={(v) => {
		if (v.target instanceof HTMLElement || v.target instanceof SVGElement) {
			if (v.target.classList.contains('upBtn')) {
				let text = v.target.closest('.text-todo');
				text?.classList.toggle('d-none');
				let form = text?.nextElementSibling;
				form?.classList.toggle('d-none');
			}
			if (v.target.classList.contains('noBtn') || v.target.classList.contains('yesBtn')) {
				let form = v.target.closest('.form-todo');
				form?.classList.toggle('d-none');
				let text = form?.previousElementSibling;
				text?.classList.toggle('d-none');
			}
		}
	}}
>
	<Paper>
		<form
			class="text-todo"
			method="post"
			action="?/deleteTodo"
			use:enhance={({ formData }) => {
				formData.append('id', id);
			}}
		>
			<Flex>
				<Box css={{ width: '90%', marginRight: '12px' }}>
					<Text>{detail}</Text>
				</Box>
				<Group nowrap>
					<ActionIcon type="button" class="upBtn"><Pencil1 class="upBtn" size={15} /></ActionIcon>
					<ActionIcon class="delBtn"><Trash size={15} class="delBtn" /></ActionIcon>
				</Group>
			</Flex>
		</form>
		<form
			class="form-todo d-none"
			method="post"
			action="?/updateTodo"
			use:enhance={({ formData }) => {
				formData.append('id', id);
				invalidateAll();
			}}
		>
			<Flex>
				<Box id="yooo" css={{ width: '90%', marginRight: '12px' }}>
					<input
						class="form-control {$colorScheme === 'light' ? 'text-input-light' : 'text-input-dark'}"
						value={detail}
						name="detail"
					/>
				</Box>
				<Group noWrap>
					<ActionIcon class="yesBtn"><Check class="yesBtn" size={15} /></ActionIcon>
					<ActionIcon type="button" class="noBtn"><Cross2 size={15} class="noBtn" /></ActionIcon>
				</Group>
			</Flex>
		</form>
	</Paper>
</Box>

<style>
	.text-input-dark {
		outline: none;
		box-shadow: none;
		background-color: #141517;
		color: white;
		border-radius: 5px;
		border-color: #26282d;
	}
	.text-input-dark:focus {
		border-color: #1971c2;
	}
	.text-input-light:focus {
		border-color: #1971c2;
	}
	.text-input-light {
		outline: none;
		box-shadow: none;
		background-color: #ffffff;
		border-radius: 5px;
		color: black;
		border-color: #e0e4e8;
	}
</style>
