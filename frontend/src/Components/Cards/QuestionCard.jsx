import React, { useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from 'react-icons/lu';
import AIResponsePreview from '../AIResponsePreview';

const QuestionCard = ({
    question,
    answer,
    onLearnMore,
    isPinned,
    onTogglePin
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            const contentHeight = contentRef.current.scrollHeight;
            setHeight(contentHeight + 20);
        } else {
            setHeight(0);
        }
    }, [isExpanded, answer]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl mb-5 overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 group transition-all duration-400 ease-in-out hover:shadow-2xl hover:scale-[1.01]">
            <div className="flex items-center justify-between cursor-pointer px-5 py-4">
                {/* Left Section */}
                <div className="flex items-start gap-4 flex-1" onClick={toggleExpand}>
                    <span className="flex-shrink-0 mt-1">
                        {isPinned ? (
                            <LuSparkles size={20} className="text-yellow-500 animate-pulse" />
                        ) : (
                            <LuPin size={20} className="text-gray-400" />
                        )}
                    </span>

                    <h3 className="flex-1 text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug pr-2">
                        {question}
                    </h3>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        onClick={onTogglePin}
                        aria-label={isPinned ? "Unpin question" : "Pin question"}
                    >
                        {isPinned ? <LuPinOff size={20} /> : <LuPin size={20} />}
                    </button>

                    <button
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        onClick={() => {
                            setIsExpanded(true);
                            onLearnMore();
                        }}
                        aria-label="Learn more about this question"
                    >
                        <LuSparkles
                            size={20}
                            className={`transform transition-transform duration-300 ${
                                isExpanded ? "rotate-180 text-blue-500" : "text-orange-400"
                            }`}
                        />
                    </button>

                    <button
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 ml-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        onClick={toggleExpand}
                        aria-label={isExpanded ? "Collapse answer" : "Expand answer"}
                    >
                        <LuChevronDown
                            size={20}
                            className={`transform transition-transform duration-300 ${
                                isExpanded ? "rotate-180 text-blue-500" : ""
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Collapsible Answer Section */}
            <div
                className="transition-all duration-400 ease-in-out overflow-hidden"
                style={{ maxHeight: `${height}px` }}
            >
                <div
                    ref={contentRef}
                    className="pt-3 text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 mt-3 px-5"
                >
                    <AIResponsePreview content={answer} />
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
