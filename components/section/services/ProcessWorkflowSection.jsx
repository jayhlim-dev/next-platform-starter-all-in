'use client';
import { useEffect, useRef, useState } from 'react';

import ServicesHeroSection from './json/ServicesHeroSection.json';
import { Glass } from 'components/glass';
import clsx from 'clsx';

const STEP_AUTO_ADVANCE_MS = 15000;

export default function ProcessWorkflowSection() {
    const { content } = ServicesHeroSection;
    const { workflow_process } = content;

    const stepCount = workflow_process.process_steps.length;

    const [activeStep, setActiveStep] = useState(0);
    const [detailPanelHovered, setDetailPanelHovered] = useState(false);
    const delayedHoverRef = useRef(null);
    const stepStartedAtRef = useRef(Date.now());
    const panelPauseStartedAtRef = useRef(null);
    const longPressRef = useRef(null);

    useEffect(
        () => () => {
            if (delayedHoverRef.current) clearTimeout(delayedHoverRef.current);
            if (longPressRef.current) clearTimeout(longPressRef.current);
        },
        []
    );

    const canUseHover = () =>
        typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    useEffect(() => {
        stepStartedAtRef.current = Date.now();
    }, [activeStep]);

    useEffect(() => {
        if (detailPanelHovered) return;

        const elapsed = Date.now() - stepStartedAtRef.current;
        const remaining = Math.max(0, STEP_AUTO_ADVANCE_MS - elapsed);
        const id = window.setTimeout(() => {
            setActiveStep((s) => (s >= stepCount - 1 ? 0 : s + 1));
        }, remaining);
        return () => clearTimeout(id);
    }, [activeStep, detailPanelHovered, stepCount]);

    const handleDetailPanelEnter = () => {
        if (!canUseHover()) return;
        panelPauseStartedAtRef.current = Date.now();
        setDetailPanelHovered(true);
    };

    const handleDetailPanelLeave = () => {
        if (!canUseHover()) return;
        if (panelPauseStartedAtRef.current != null) {
            stepStartedAtRef.current += Date.now() - panelPauseStartedAtRef.current;
            panelPauseStartedAtRef.current = null;
        }
        setDetailPanelHovered(false);
    };

    const pauseTimer = () => {
        if (detailPanelHovered) return;
        panelPauseStartedAtRef.current = Date.now();
        setDetailPanelHovered(true);
    };

    const resumeTimer = () => {
        if (!detailPanelHovered) return;
        if (panelPauseStartedAtRef.current != null) {
            stepStartedAtRef.current += Date.now() - panelPauseStartedAtRef.current;
            panelPauseStartedAtRef.current = null;
        }
        setDetailPanelHovered(false);
    };

    const selectStepImmediate = (step) => {
        if (delayedHoverRef.current) {
            clearTimeout(delayedHoverRef.current);
            delayedHoverRef.current = null;
        }
        panelPauseStartedAtRef.current = null;
        setDetailPanelHovered(false);
        setActiveStep(step);
    };

    const scheduleStepHoverDelayed = (step) => {
        if (!canUseHover()) return;
        handleDetailPanelEnter();
        if (delayedHoverRef.current) clearTimeout(delayedHoverRef.current);
        delayedHoverRef.current = setTimeout(() => {
            delayedHoverRef.current = null;
            setActiveStep(step);
        }, 400);
    };

    const cancelDelayedStepHover = () => {
        if (!canUseHover()) return;
        if (delayedHoverRef.current) {
            clearTimeout(delayedHoverRef.current);
            delayedHoverRef.current = null;
        }
        handleDetailPanelLeave();
    };

    const startLongPressPause = (e) => {
        if (e?.pointerType !== 'touch') return;
        if (longPressRef.current) clearTimeout(longPressRef.current);
        longPressRef.current = setTimeout(() => {
            longPressRef.current = null;
            pauseTimer();
        }, 250);
    };

    const endLongPressPause = () => {
        if (longPressRef.current) {
            clearTimeout(longPressRef.current);
            longPressRef.current = null;
        }
        resumeTimer();
    };

    const currentDescriptionLength = workflow_process.process_steps[activeStep].title.replace(/\s/g, '').length;
    const textSizeClass = currentDescriptionLength > 17 ? 'lg:text-4xl' : 'lg:text-5xl';
    return (
        <div className={clsx('flex flex-col gap-6 text-white')}>
            <div className={clsx('flex flex-col gap-2 px-[30px] ', 'lg:px-0!')}>
                <h2 className={clsx('text-xl font-bold', 'lg:text-3xl lg:text-[34px]')}>{workflow_process.title}</h2>
                <p className="text-xs max-w-2xl">{workflow_process.description}</p>
            </div>

            <div className={clsx('flex flex-col gap-6 items-center', 'lg:grid-cols-[1.2fr_1fr] lg:grid lg:gap-4')}>
                <Glass
                    className={clsx(
                        'relative col-span-1 flex min-h-[305px] flex-col overflow-hidden lg:rounded-3xl! p-8',
                        'rounded-none! border border-t-white/30 lg:border-none! lg:min-h-[280px]'
                    )}
                    onMouseEnter={handleDetailPanelEnter}
                    onMouseLeave={handleDetailPanelLeave}
                    onPointerDown={startLongPressPause}
                    onPointerUp={endLongPressPause}
                    onPointerCancel={endLongPressPause}
                >
                    <div
                        key={activeStep}
                        className="animate-workflow-step-panel flex min-h-0 flex-1 flex-col justify-between gap-4"
                    >
                        <p className="mt-2 text-6xl leading-none font-semibold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.7)]">
                            {String(activeStep + 1).padStart(2, '0')}
                        </p>

                        <div className="flex flex-col gap-4">
                            <h3 className={clsx('text-4xl text-[32px] font-medium capitalize', textSizeClass)}>
                                {workflow_process.process_steps[activeStep].title}
                            </h3>
                            <div className="h-px w-[10%] bg-[#D9D9D9]" />
                            <p className="text-sm">{workflow_process.process_steps[activeStep].description}</p>
                        </div>
                    </div>

                    <div
                        className="absolute bottom-0 left-0 h-0.5 w-full overflow-hidden rounded-full bg-white/10"
                        aria-hidden
                    >
                        <div
                            key={activeStep}
                            className="workflow-progress-bar-fill h-full rounded-full bg-[#D9D9D9]"
                            style={{
                                animationDuration: `${STEP_AUTO_ADVANCE_MS}ms`,
                                animationPlayState: detailPanelHovered ? 'paused' : 'running'
                            }}
                        />
                    </div>
                </Glass>

                <div className={clsx('col-span-1 grid grid-cols-2 gap-3 px-[28px]', 'lg:px-0! lg:gap-5')}>
                    <div className={clsx('col-span-1 gap-3 lg:gap-5 flex flex-col max-w-[525px]')}>
                        {workflow_process.process_steps.slice(0, 3).map((step, index) => {
                            return (
                                <Glass
                                    key={step.title}
                                    type="light"
                                    className={clsx(
                                        'flex gap-3 text-start border-white/20! rounded-4xl px-4 items-center min-h-[54px] max-h-[54px]',
                                        'lg:rounded-2xl lg:px-3 lg:gap-4 lg:min-h-[62px] lg:py-2 lg:max-h-unset',
                                        index === activeStep ? 'bg-white/8! font-bold lg:font-normal' : ''
                                    )}
                                    onMouseEnter={() => scheduleStepHoverDelayed(index)}
                                    onMouseLeave={cancelDelayedStepHover}
                                    onClick={() => selectStepImmediate(index)}
                                    onPointerDown={startLongPressPause}
                                    onPointerUp={endLongPressPause}
                                    onPointerCancel={endLongPressPause}
                                >
                                    <div
                                        className={clsx(
                                            'rounded-full w-8 h-8 min-w-8 min-h-8 flex items-center justify-center  border-[#D9D9D9] color-[#D9D9D9]',
                                            'text-xs font-bold border',
                                            'lg:text-sm lg:font-normal lg:border-[0.5px]'
                                        )}
                                    >
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <div className={clsx('lg:leading-5 leading-4 text-xs! lg:text-base')}>
                                        {step.title}
                                    </div>
                                </Glass>
                            );
                        })}
                    </div>
                    <div className={clsx('col-span-1 gap-3 lg:gap-5  flex flex-col max-w-[525px]')}>
                        {workflow_process.process_steps.slice(3).map((step, index) => (
                            <Glass
                                key={step.title}
                                type="light"
                                className={clsx(
                                    'flex gap-3 text-start border-white/20! rounded-4xl px-4 items-center min-h-[54px] max-h-[54px]',
                                    'lg:rounded-2xl lg:px-3 lg:gap-4 lg:min-h-[62px] lg:py-2 lg:max-h-unset',
                                    index + 3 === activeStep ? 'bg-white/8! font-bold lg:font-normal' : ''
                                )}
                                onMouseEnter={() => scheduleStepHoverDelayed(index + 3)}
                                onMouseLeave={cancelDelayedStepHover}
                                onClick={() => selectStepImmediate(index + 3)}
                                onPointerDown={startLongPressPause}
                                onPointerUp={endLongPressPause}
                                onPointerCancel={endLongPressPause}
                            >
                                <div
                                    className={clsx(
                                        'rounded-full w-8 h-8 min-w-8 min-h-8 flex items-center justify-center  border-[#D9D9D9] color-[#D9D9D9]',
                                        'text-xs font-bold border',
                                        'lg:text-sm lg:font-normal lg:border-[0.5px]'
                                    )}
                                >
                                    {String(index + 4).padStart(2, '0')}
                                </div>
                                <div className={clsx('lg:leading-5 leading-4 text-xs! lg:text-base')}>{step.title}</div>
                            </Glass>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
