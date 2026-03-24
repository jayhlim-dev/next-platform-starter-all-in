import clsx from 'clsx';

function getBgColor(type) {
    if (type === 'dark') {
        return 'bg-[#091642]/26';
    }
    return 'bg-white/2';
}

export function Glass({ children, className, type = 'dark' }) {
    const bgColor = getBgColor(type);

    return <div className={clsx('border border-white/10 backdrop-blur-[28px]', bgColor, className)}>{children}</div>;
}
