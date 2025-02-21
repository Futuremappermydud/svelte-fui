import { getContext, setContext } from 'svelte';
import { type Writable, writable } from 'svelte/store';
import type { FieldState } from './types,';

export const SVELTE_FUI_FIELD_CONTEXT_KEY = 'svelte-fui-field-context-key';

export type FieldContext = {
	state$: Writable<FieldState>;
	icon$: Writable<any | undefined>;
};

export function getFieldContext(): FieldContext {
	return getContext(SVELTE_FUI_FIELD_CONTEXT_KEY);
}

export function setFieldContext(values: { state: FieldState; icon: any | undefined }) {
	const context: FieldContext = {
		state$: writable(values.state),
		icon$: writable(values.icon)
	};

	return setContext(SVELTE_FUI_FIELD_CONTEXT_KEY, context);
}
