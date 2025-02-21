<script lang="ts">
	import { Label } from '@svelte-fui/core';
	import { nanoid } from 'nanoid';
	import { getRadioGroupContext } from './context';
	import { classnames } from '../internal';

	const { disabled$, required$, value$, name$, layout$, methods } = getRadioGroupContext();

	export let id: string | undefined = nanoid();
	export let name: string | undefined = nanoid();
	export let value: string | undefined = undefined;

	export let checked = false;

	$: _name = $name$ || name;
	$: position = $layout$ === 'stacked-horizontal' ? 'below' : 'after';
	$: isVertical = position === 'below';

	function onclick() {
		if (!value) return;

		methods.select(value);
	}
</script>

<span class={classnames('fui-radio', { vertical: isVertical })} on:click={onclick} on:click>
	<input
		type="radio"
		{id}
		name={_name}
		class="fui-radio-input"
		class:below={isVertical}
		{value}
		disabled={$disabled$}
		required={$required$}
		on:change
	/>
	<div aria-hidden="true" class="fui-radio-indicator">
		<svg
			fill="currentColor"
			class=""
			aria-hidden="true"
			width="1em"
			height="1em"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			><path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" fill="currentColor" />
		</svg>
	</div>

	{#if $$slots.default}
		<Label for={id} class={classnames('fui-radio-label', position)}>
			<slot />
		</Label>
	{/if}
</span>

<style lang="postcss">
	.fui-radio {
		@apply relative inline-flex items-center;

		--indicator-size: 16px;

		&.vertical {
			@apply flex-col items-center;
		}
	}

	.fui-radio-indicator {
		@apply border-thin my-s mx-s pointer-events-none box-border flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full  border-solid fill-current text-xs;
		width: var(--indicator-size);
		height: var(--indicator-size);
	}

	.fui-radio > :global(.fui-radio-label) {
		@apply py-s px-s cursor-pointer self-center;
	}
	.fui-radio > :global(.fui-radio-label.after) {
		@apply pl-xs;
		/* Use a (negative) margin to account for the difference between the indicator's height and the label's line height. */
		/* This prevents the label from expanding the height of the Radio, but preserves line height if the label wraps. */
		margin-top: calc((var(--indicator-size) - theme(lineHeight.base-300)) / 2);
		margin-bottom: calc((var(--indicator-size) - theme(lineHeight.base-300)) / 2);
	}
	.fui-radio > :global(.fui-radio-label.below) {
		@apply pt-xs text-center;
	}

	.fui-radio-input {
		@apply absolute m-0 box-border h-full opacity-0;
		position: absolute;
		left: 0;
		top: 0;
		width: calc(var(--indicator-size) + 2 * theme(spacing.s));

		&:enabled {
			cursor: pointer;
			& ~ .fui-radio-indicator {
				cursor: pointer;
			}
		}

		/* When unchecked, hide the circle icon (child of the indicator) */
		&:not(:checked) ~ .fui-radio-indicator > * {
			opacity: 0;
		}

		/* Colors for the unchecked state */
		&:enabled:not(:checked) {
			& ~ :global(.fui-radio-label) {
				@apply text-neutral-foreground-3;
			}
			& ~ .fui-radio-indicator {
				@apply border-neutral-stroke-accessible;
			}

			&:hover {
				& ~ :global(.fui-radio-label) {
					@apply text-neutral-foreground-2;
				}
				& ~ .fui-radio-indicator {
					@apply text-neutral-stroke-accessible-hover;
				}
			}

			&:hover:active {
				& ~ :global(.fui-radio-label) {
					@apply text-neutral-foreground-1;
				}
				& ~ .fui-radio-indicator {
					@apply text-neutral-stroke-accessible-pressed;
				}
			}
		}

		/* Colors for the checked state */
		&:enabled:checked {
			& ~ :global(.fui-radio-label) {
				@apply text-neutral-foreground-1;
			}
			& ~ .fui-radio-indicator {
				@apply text-compound-brand-foreground-1 border-compound-brand-stroke;
			}

			&:hover {
				& ~ .fui-radio-indicator {
					@apply text-compound-brand-foreground-1-hover border-compound-brand-stroke-hover;
				}
			}

			&:hover:active {
				& ~ .fui-radio-indicator {
					@apply text-compound-brand-foreground-1-pressed border-compound-brand-stroke-pressed;
				}
			}
		}

		/* Colors for the disabled state */
		&:disabled {
			& ~ :global(.fui-radio-label) {
				@apply text-neutral-foreground-disabled cursor-default;
			}
			& ~ .fui-radio-indicator {
				@apply border-neutral-stroke-disabled text-neutral-foreground-disabled;
			}
		}
	}

	.fui-radui-input.below {
		width: 100%;
		width: calc(var(--indicator-size) + 2 * theme(spacing.s));
	}
</style>
