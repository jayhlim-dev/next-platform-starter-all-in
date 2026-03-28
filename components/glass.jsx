import clsx from 'clsx';

function getBgColor(type) {
    if (type === 'dark') {
        return 'bg-[#091642]/26';
    }
    return 'bg-white/2';
}

function getHoverClasses(type) {
    if (type === 'dark') {
        return 'hover:border-white/25 hover:bg-[#091642]/40 ';
    }
    return 'hover:border-white/25 hover:bg-white/[0.08] ';
}

export function Glass({ children, className, type = 'dark', useHoverAnimation = true, useBorderOnHoverOnly = false }) {
    const bgColor = getBgColor(type);

    return (
        <div
            className={clsx(
                'border border-white/6 backdrop-blur-[28px]',
                'transition-all duration-500 ease-in-out',
                useHoverAnimation && type !== 'dark' && 'hover:-translate-y-0.5',
                useBorderOnHoverOnly && 'border-0! hover:border!',
                useHoverAnimation && type !== 'dark' && getHoverClasses(type),
                bgColor,
                className
            )}
        >
            {children}
        </div>
    );
}
