'use client';

import clsx from 'clsx';
import { animationClass, animationClasses, ANIMATION_PRESETS } from '../lib/animations';

/**
 * Wrapper that applies a named entrance animation (see ANIMATION_PRESETS in lib/animations.js).
 * You can also use `className={animationClass('fadeIn')}` on any element.
 */
export function Animated({
    preset = 'fadeIn',
    duration = 'default',
    easing = 'default',
    className,
    as: Component = 'div',
    ...rest
}) {
    return (
        <Component className={clsx(animationClass(preset, duration, easing), className)} {...rest} />
    );
}

/**
 * Same as {@link Animated} but merges arbitrary extra animation fragments via {@link animationClasses}.
 */
export function AnimatedMerge({ parts = [], className, as: Component = 'div', ...rest }) {
    return <Component className={clsx(animationClasses(...parts), className)} {...rest} />;
}
