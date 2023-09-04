import { createClient, type PostgrestError } from '@supabase/supabase-js';
import type { Database } from './supabase';
const url = process.env.url ?? '';
const key = process.env.public_key ?? '';

const supabase = createClient<Database>(url, key, {
	auth: {
		persistSession: false
	}
});

export async function getTodos() {
	try {
		const { data } = await supabase.from('Todo').select().order('id', { ascending: false });
		return data;
	} catch (error) {
		return null;
	}
}

export async function addTodo(title?: string, detail?: string) {
	const { error } = await supabase.from('Todo').insert({ title: title, detail: detail });
	if (error?.message != null) {
		console.log(error.message);
	}
}

export async function updateTodo(id: number, title?: string, detail?: string) {
	const { error } = await supabase
		.from('Todo')
		.update({ title: title, detail: detail })
		.eq('id', id);
}

export async function deleteTodo(id: number) {
	const { error } = await supabase.from('Todo').delete().eq('id', id);
}
