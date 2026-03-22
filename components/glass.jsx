export function Glass({ children, className }) {
    return (
        <div
            className={[
                'rounded-[20px] bg-white/2 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl',
                className
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {children}
        </div>
    );
}
