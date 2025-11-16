import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AIResponsePreview = ({ content }) => {
    const displayContent = String(content || '').trim();

    if (!displayContent) return null;

    return (
        <div
            className="w-full px-5 py-6 sm:px-6 lg:px-8
                       bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-100
                       overflow-x-auto custom-scroll-bar markdown-content text-[15px] leading-relaxed break-words"
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    p: ({ children }) => <p className="mb-4">{children}</p>,
                    h1: ({ children }) => <h1 className="text-3xl font-extrabold mb-4 mt-6 text-gray-900">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-5 text-gray-800">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-700">{children}</h3>,
                    ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    table: ({ children }) => (
                        <table className="min-w-full border border-gray-300 divide-y divide-gray-200 mb-4 rounded-lg overflow-hidden">
                            {children}
                        </table>
                    ),
                    thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
                    tbody: ({ children }) => <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>,
                    tr: ({ children }) => <tr className="hover:bg-gray-50 transition-colors">{children}</tr>,
                    th: ({ children }) => (
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-300">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900 border-b border-gray-300">
                            {children}
                        </td>
                    ),
                    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                    em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                    hr: () => <hr className="my-6 border-t-2 border-gray-200" />,
                }}
            >
                {displayContent}
            </ReactMarkdown>
        </div>
    );
};

export default AIResponsePreview;
