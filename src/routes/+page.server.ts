import { getTodos, addTodo, updateTodo, deleteTodo } from '$lib/api.js';
import type { Database } from '$lib/supabase.js';
import { resourceUsage } from 'process';

export const load = async (): Promise<{
	res: Database['public']['Tables']['Todo']['Row'][];
} | null> => {
	const data = await getTodos();
	if (data != null) {
		let response: Database['public']['Tables']['Todo']['Row'][] = data;
		return { res: response };
	} else {
		return null;
	}
};

export const actions = {
	addTodo: async ({ request }) => {
		let req = await request.formData();
		let detail = req.get('detail')?.toString();
		await addTodo('Todo', detail);
	},
	updateTodo: async ({ request }) => {
		let req = await request.formData();
		let detail = req.get('detail')?.toString();
		let id = req.get('id')?.toString();
		if (id != null) {
			await updateTodo(parseInt(id), 'Todo', detail);
		}
	},
	deleteTodo: async ({ request }) => {
		let req = await request.formData();
		let id = req.get('id')?.toString();
		if (id != null) {
			await deleteTodo(parseInt(id));
		}
	}
};
