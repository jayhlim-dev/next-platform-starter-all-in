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

    useEffect(
        () => () => {
            if (delayedHoverRef.current) clearTimeout(delayedHoverRef.current);
        },
        []
    );

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
        panelPauseStartedAtRef.current = Date.now();
        setDetailPanelHovered(true);
    };

    const handleDetailPanelLeave = () => {
        if (panelPauseStartedAtRef.current != null) {
            stepStartedAtRef.current += Date.now() - panelPauseStartedAtRef.current;
            panelPauseStartedAtRef.current = null;
        }
        setDetailPanelHovered(false);
    };

    const scheduleStepHoverDelayed = (step) => {
        handleDetailPanelEnter();
        if (delayedHoverRef.current) clearTimeout(delayedHoverRef.current);
        delayedHoverRef.current = setTimeout(() => {
            delayedHoverRef.current = null;
            setActiveStep(step);
        }, 400);
    };

    const cancelDelayedStepHover = () => {
        if (delayedHoverRef.current) {
            clearTimeout(delayedHoverRef.current);
            delayedHoverRef.current = null;
        }
        handleDetailPanelLeave();
    };

    const currentDescriptionLength = workflow_process.process_steps[activeStep].title.replace(/\s/g, '').length;
    const textSizeClass = currentDescriptionLength > 17 ? 'text-4xl' : 'text-5xl';
    return (
        <div className="flex flex-col gap-6 text-white">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{workflow_process.title}</h2>
                <p className="text-sm max-w-2xl">{workflow_process.description}</p>
            </div>

            <div className="grid grid-cols-[1.2fr_1fr] gap-4 items-center">
                <Glass
                    className="relative col-span-1 flex min-h-[280px] flex-col overflow-hidden rounded-3xl! p-8"
                    onMouseEnter={handleDetailPanelEnter}
                    onMouseLeave={handleDetailPanelLeave}
                >
                    <div
                        key={activeStep}
                        className="animate-workflow-step-panel flex min-h-0 flex-1 flex-col justify-between gap-4"
                    >
                        <p className="mt-2 text-6xl leading-none font-semibold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.7)]">
                            {String(activeStep + 1).padStart(2, '0')}
                        </p>

                        <div className="flex flex-col gap-4">
                            <h3 className={clsx('font-medium capitalize', textSizeClass)}>
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

                <div className="col-span-1 grid grid-cols-2 gap-5">
                    <div className="col-span-1 gap-5 flex flex-col max-w-[525px]">
                        {workflow_process.process_steps.slice(0, 3).map((step, index) => {
                            return (
                                <Glass
                                    key={step.title}
                                    type="light"
                                    className={clsx(
                                        'flex gap-4 text-start rounded-2xl px-3  min-h-[62px] items-center',
                                        index === activeStep ? 'bg-white/8!' : ''
                                    )}
                                    onMouseEnter={() => scheduleStepHoverDelayed(index)}
                                    onMouseLeave={cancelDelayedStepHover}
                                >
                                    <div className="rounded-full w-8 h-8 min-w-8 min-h-8 flex items-center justify-center border-[0.5px] border-[#D9D9D9] color-[#D9D9D9] text-sm">
                                        {index + 1}
                                    </div>
                                    <div className={clsx('leading-5 text-base')}>{step.title}</div>
                                </Glass>
                            );
                        })}
                    </div>
                    <div className="col-span-1 gap-5 flex flex-col max-w-[525px]">
                        {workflow_process.process_steps.slice(3).map((step, index) => (
                            <Glass
                                key={step.title}
                                type="light"
                                className={clsx(
                                    'flex text-start rounded-2xl px-3 gap-4 min-h-[62px] items-center',
                                    index + 3 === activeStep ? 'bg-white/8!' : ''
                                )}
                                onMouseEnter={() => scheduleStepHoverDelayed(index + 3)}
                                onMouseLeave={cancelDelayedStepHover}
                            >
                                <div className="text-sm rounded-full w-8 h-8 flex items-center justify-center border-[0.5px] border-[#D9D9D9] color-[#D9D9D9]">
                                    {index + 4}
                                </div>
                                <div className="text-base ">{step.title}</div>
                            </Glass>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
