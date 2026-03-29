'use client';

import { useRef, useState } from 'react';
import { Glass } from 'components/glass';
import getInTouchData from './json/getInTouchData.json';
import clsx from 'clsx';

const fieldShellClass = 'flex flex-col gap-1.5';
const inputClass =
    'w-full rounded-lg border border-transparent bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/40';

/** Demo-only: fictional person; example.com is reserved — safe for testing. */
const DEMO_SAMPLE = {
    name: 'Sarah Chen',
    role_title: 'Co-Founder & Chief Scientific Officer',
    company_organization: 'HelixCell Therapeutics',
    work_email: 'sarah.chen@example.com',
    area_of_interest: 'Series A narrative, CMC milestones, and pre-IND positioning',
    project_overview:
        'We are a preclinical-stage company developing engineered NK cell therapies for solid tumors. We closed our seed round in Q3 and are preparing for Series A discussions over the next two quarters. We are looking for help refining our investor story, sequencing CMC work against our clinical plan, and getting ready for early FDA engagement.',
};

export default function ContactFormSection() {
    const { form } = getInTouchData;
    const { title, form_fields } = form;

    const rowFields = form_fields.filter((field) => field.name !== 'project_overview');
    const overviewField = form_fields.find((field) => field.name === 'project_overview');

    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const [demoFillEnabled, setDemoFillEnabled] = useState(false);
    const formRef = useRef(null);

    function fillDemoSample() {
        const form = formRef.current;
        if (!form) return;
        for (const [name, value] of Object.entries(DEMO_SAMPLE)) {
            const el = form.elements.namedItem(name);
            if (el && 'value' in el) {
                el.value = value;
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('sending');
        setMessage('');

        const formEl = e.currentTarget;
        const fd = new FormData(formEl);
        const payload = Object.fromEntries(fd.entries());

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const body = await res.json().catch(() => ({}));
            if (!res.ok) {
                setStatus('error');
                setMessage(body.error || 'Something went wrong. Please try again.');
                return;
            }
            setStatus('success');
            setMessage('Thanks — your message was sent.');
            formEl.reset();
        } catch {
            setStatus('error');
            setMessage('Network error. Please try again.');
        }
    }

    return (
        <div className="flex items-center justify-center gap-16 text-white">
            <Glass className="flex w-full max-w-none flex-col gap-7 rounded-2xl px-18 py-13" type="dark">
                <h2 className="text-4xl font-bold">{title}</h2>
                <div className="h-[2px] w-full bg-white/20" />

                {/* // below is the form */}
                <form
                    ref={formRef}
                    className="grid w-full grid-cols-2 gap-5"
                    onSubmit={handleSubmit}
                >
                    <div className="col-span-1 flex flex-col gap-x-4 gap-y-4">
                        {rowFields.map((field) => (
                            <div key={field.name} className={fieldShellClass}>
                                <label className="text-sm font-bold gap-0" htmlFor={field.name}>
                                    {field.required ? <span>*</span> : null}
                                    {field.label}
                                </label>
                                <input
                                    className={clsx(inputClass, 'bg-white/10 ')}
                                    type={field.name === 'work_email' ? 'email' : 'text'}
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                />
                            </div>
                        ))}
                    </div>

                    {overviewField ? (
                        <div className="col-span-1 flex h-full flex-col gap-1.5">
                            <label className="text-sm font-medium" htmlFor={overviewField.name}>
                                {overviewField.required ? <span>*</span> : null}
                                {overviewField.label}
                            </label>
                            <textarea
                                className={`${inputClass} h-full min-h-[120px] resize-none`}
                                id={overviewField.name}
                                name={overviewField.name}
                                placeholder={overviewField.placeholder}
                                required={overviewField.required}
                                rows={4}
                            />
                        </div>
                    ) : null}

                    <div className="col-span-2 flex flex-col gap-3">
                        <label className="flex cursor-pointer items-center gap-2 text-xs text-white/55">
                            <input
                                type="checkbox"
                                className="size-3.5 rounded border-white/30 bg-white/10 accent-white"
                                checked={demoFillEnabled}
                                onChange={(e) => setDemoFillEnabled(e.target.checked)}
                            />
                            <span>Show demo autofill (fills the form with sample data)</span>
                        </label>
                        {demoFillEnabled ? (
                            <button
                                className="w-fit rounded-lg border border-dashed border-white/35 bg-white/5 px-4 py-2 text-left text-xs font-medium text-white/80 transition hover:border-white/50 hover:bg-white/10"
                                type="button"
                                onClick={fillDemoSample}
                            >
                                Fill with sample submission
                            </button>
                        ) : null}
                    </div>

                    <div className="col-span-2 flex items-center gap-4">
                        <button
                            className="flex h-full min-w-[184px] w-fit items-center justify-center rounded-lg bg-white px-6 py-2 text-center text-base! font-bold uppercase text-[#1B4887] disabled:opacity-60"
                            type="submit"
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' ? 'Sending…' : "let's talk"}
                        </button>
                        {message ? (
                            <p
                                className={clsx('text-sm', status === 'success' ? 'text-white/70' : 'text-red-300')}
                                role="status"
                            >
                                {message}
                            </p>
                        ) : null}
                    </div>
                </form>
            </Glass>
        </div>
    );
}
