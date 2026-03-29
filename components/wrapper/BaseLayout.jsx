export default function BaseLayout({ children }) {
    return (
        <div className="relative isolate overflow-clip min-h-screen bg-[linear-gradient(76deg,#0f4c81_0%,#1e7fbf_48%,#2bc0a5_100%)] [--panel:rgba(255,255,255,0.08)] [--panel-strong:rgba(255,255,255,0.1)] [--panel-border:rgba(255,255,255,0.1)] [--copy-soft:#dbefff] [--copy-muted:rgba(233,244,255,0.82)] [--accent:#79bb5f] 2xl:px-[18%]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 -z-2 h-248 bg-linear-to-b from-[#121a44] to-[#121a44]/0"
            />
            {children}
        </div>
    );
}
