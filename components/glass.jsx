export function Glass({ children, className }) {
    return (
        <div
            className={['border border-white/10 bg-[#091642]/26 backdrop-blur-[28px]', className]
                .filter(Boolean)
                .join(' ')}
        >
            {children}
        </div>
    );
}
