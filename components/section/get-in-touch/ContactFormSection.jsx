import { Glass } from 'components/glass';
import getInTouchData from './json/getInTouchData.json';
import clsx from 'clsx';

const fieldShellClass = 'flex flex-col gap-1.5';
const inputClass =
    'w-full rounded-lg border border-transparent bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/40';

export default function ContactFormSection() {
    const { form } = getInTouchData;
    const { title, form_fields } = form;

    const rowFields = form_fields.filter((field) => field.name !== 'project_overview');
    const overviewField = form_fields.find((field) => field.name === 'project_overview');

    return (
        <div className="flex items-center justify-center gap-16 text-white ru">
            <Glass className="flex flex-col gap-7 rounded-2xl px-18 py-13 w-full" type="dark">
                <h2 className="text-4xl font-bold">{title}</h2>
                <div className="bg-white/20 h-[2px] w-full"></div>
                <form className="w-full grid grid-cols-2 gap-5">
                    <div className="flex flex-col col-span-1 gap-x-4 gap-y-4">
                        {rowFields.map((field) => (
                            <div key={field.name} className={fieldShellClass}>
                                <label className="text-sm font-bold gap-0" htmlFor={field.name}>
                                    {field.required ? <span>*</span> : null}{field.label}
                                </label>
                                <input
                                    className={clsx(inputClass, 'bg-white/10 ')}
                                    type="text"
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                />
                            </div>
                        ))}
                    </div>

                    {overviewField ? (
                        <div className="flex flex-col col-span-1 gap-1.5 h-full">
                            <label className="text-sm font-medium" htmlFor={overviewField.name}>
                                {overviewField.required ? <span>*</span> : null}{overviewField.label}
                            </label>
                            <textarea
                                className={`${inputClass} min-h-[120px] h-full resize-none`}
                                id={overviewField.name}
                                name={overviewField.name}
                                placeholder={overviewField.placeholder}
                                required={overviewField.required}
                                rows={4}
                            />
                        </div>
                    ) : null}
                    <button
                        className="flex justify-center items-center h-full rounded-lg bg-white text-[#1B4887] uppercase text-base! text-center w-fit px-6 py-2 font-bold min-w-[184px]"
                        type="submit"
                    >
                        let's talk
                    </button>
                </form>
            </Glass>
        </div>
    );
}
