'use client';

import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { useInView } from '../lib/use-in-view';

function mergeRefs(...refs) {
    return (node) => {
        refs.forEach((r) => {
            if (typeof r === 'function') r(node);
            else if (r) r.current = node;
        });
    };
}

/**
 * Wrapper that observes when its root element enters the viewport. Use with
 * `inViewClassName` / `outOfViewClassName`, or `children` as a function `({ isInView }) => …`.
 */
export const InView = forwardRef(function InView(
    {
        as: Component = 'div',
        className,
        inViewClassName,
        outOfViewClassName,
        once = false,
        root = null,
        rootMargin = '0px',
        threshold = 0,
        onChange,
        children,
        ...rest
    },
    forwardedRef
) {
    const { ref: localRef, isInView } = useInView({ once, root, rootMargin, threshold });

    const setRef = useCallback(
        (node) => {
            mergeRefs(localRef, forwardedRef)(node);
        },
        [localRef, forwardedRef]
    );

    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    useEffect(() => {
        onChangeRef.current?.(isInView);
    }, [isInView]);

    const content =
        typeof children === 'function' ? children({ isInView }) : children;

    return (
        <Component
            ref={setRef}
            className={clsx(
                className,
                isInView ? inViewClassName : outOfViewClassName
            )}
            {...rest}
        >
            {content}
        </Component>
    );
});

export { useInView } from '../lib/use-in-view';
