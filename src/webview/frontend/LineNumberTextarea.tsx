import React, { useState, useRef, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const LineNumberTextarea = (props: {
    className: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readOnly?: boolean;
    autoFocus?: boolean;
}) => {
    const [lineNumbers, setLineNumbers] = useState('1');
    const textareaRef = useRef<any>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            const lineCount = textarea.value.split('\n').length;
            const newLineNumbers = Array.from(
                { length: lineCount },
                (_, i) => i + 1,
            ).join('\n');
            setLineNumbers(newLineNumbers);
        }
    }, [props.value]);

    const handleScroll = () => {
        if (textareaRef.current) {
            const lineNumberDiv =
                textareaRef.current.previousElementSibling as HTMLDivElement;
            if (lineNumberDiv) {
                lineNumberDiv.scrollTop = textareaRef.current.scrollTop;
            }
        }
    };

    return (
        <div className="line-numbered-textarea">
            <div className="line-numbers">{lineNumbers}</div>
            <TextareaAutosize
                ref={textareaRef}
                className={props.className}
                value={props.value}
                onChange={props.onChange}
                readOnly={props.readOnly}
                autoFocus={props.autoFocus}
                onScroll={handleScroll}
            />
        </div>
    );
};

export default LineNumberTextarea;
