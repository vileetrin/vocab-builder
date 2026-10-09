import { type ChangeEvent, type ComponentType, type SVGProps } from "react";

type AddWordTextInputProps = {
    id: string;
    label: string;
    language: string;
    placeholder: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
};

export default function AddWordTextInput({
    id,
    label,
    language,
    placeholder,
    Icon,
    value,
    onChange,
    required
}: AddWordTextInputProps) {
    return (
        <div>
            <label htmlFor={id} className="sr-only">
                {label}
            </label>
            <div className="grid grid-cols-[minmax(0,1fr)_112px] items-center gap-4">
                <input
                    id={id}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    required={required}
                    className="h-14 w-full rounded-[15px] border border-text-on-accent/30 bg-transparent px-4 text-[16px] text-text-on-accent outline-none placeholder:text-text-on-accent/70 focus:bg-white/10"
                    onChange={onChange}
                />
                <span className="flex items-center justify-start gap-2 text-sm font-medium text-text-on-accent">
                    <Icon aria-hidden="true" className="h-8 w-8 rounded-full" />
                    {language}
                </span>
            </div>
        </div>
    );
}
