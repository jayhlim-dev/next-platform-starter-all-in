import clsx from 'clsx';

/**
 * Named presets map to classes in styles/globals.css (`animate-ui-*`).
 * Combine with {@link ANIMATION_DURATION} / {@link ANIMATION_EASING} or pass extra classes.
 */
export const ANIMATION_PRESETS = {
    none: '',
    fadeIn: 'animate-ui-fade-in',
    fadeInUp: 'animate-ui-fade-in-up',
    fadeInDown: 'animate-ui-fade-in-down',
    scaleIn: 'animate-ui-scale-in'
};

/** Optional duration modifiers (sets `--ui-animation-duration` on the same element). */
export const ANIMATION_DURATION = {
    default: '',
    fast: 'ui-animate-duration-fast',
    slow: 'ui-animate-duration-slow'
};

/** Optional easing modifiers (sets `--ui-animation-easing`). */
export const ANIMATION_EASING = {
    default: '',
    easeOut: 'ui-animate-ease-out',
    easeInOut: 'ui-animate-ease-in-out'
};

/**
 * Build a single className string for one entrance animation.
 *
 * @param {keyof typeof ANIMATION_PRESETS | string} preset - Preset key or raw class string
 * @param {keyof typeof ANIMATION_DURATION} [duration='default']
 * @param {keyof typeof ANIMATION_EASING} [easing='default']
 * @returns {string}
 *
 * @example
 * animationClass('fadeIn')
 * animationClass('fadeInUp', 'fast')
 * animationClass('fadeIn', 'default', 'easeOut')
 */
export function animationClass(preset, duration = 'default', easing = 'default') {
    const motion =
        preset in ANIMATION_PRESETS ? ANIMATION_PRESETS[preset] : (preset === 'none' ? '' : preset);
    const d = ANIMATION_DURATION[duration] ?? '';
    const e = ANIMATION_EASING[easing] ?? '';
    return clsx(motion, d, e);
}

/**
 * Merge multiple preset/modifier fragments (presets, durations, or raw Tailwind classes).
 *
 * @param {...(keyof typeof ANIMATION_PRESETS | keyof typeof ANIMATION_DURATION | keyof typeof ANIMATION_EASING | string)} parts
 * @returns {string}
 *
 * @example
 * animationClasses('fadeIn', 'fast')
 * animationClasses('scaleIn', ANIMATION_DURATION.slow)
 */
export function animationClasses(...parts) {
    // return clsx('opacity-100', ...parts);
    return clsx(
        ...parts.map((p) => {
            if (p == null || p === '') return null;
            if (p in ANIMATION_PRESETS) return ANIMATION_PRESETS[p];
            if (p in ANIMATION_DURATION) return ANIMATION_DURATION[p];
            if (p in ANIMATION_EASING) return ANIMATION_EASING[p];
            return p;
        })
    );
}
