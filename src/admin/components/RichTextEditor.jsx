import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const wrapperRef = useRef(null);
  const quillRef = useRef(null);
  const onChangeRef = useRef(onChange);

  // Keep onChange ref fresh without re-creating quill
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    // Guard to prevent double initialization in StrictMode
    if (container.children.length > 0) return;

    // Create a fresh container div for Quill to mount into
    const editorDiv = document.createElement('div');
    container.appendChild(editorDiv);

    const quill = new Quill(editorDiv, {
      theme: 'snow',
      placeholder: placeholder || 'Write your content here...',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['link', 'image'],
          ['clean'],
        ],
      },
    });

    quillRef.current = quill;

    // Set initial HTML content
    if (value) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }

    // Listen for changes and emit HTML
    quill.on('text-change', () => {
      const html = editorDiv.querySelector('.ql-editor')?.innerHTML ?? '';
      onChangeRef.current(html === '<p><br></p>' ? '' : html);
    });

    // Cleanup: fully remove Quill's generated DOM (toolbar + editor)
    // so StrictMode's double-mount doesn't leave orphaned toolbars
    return () => {
      quillRef.current = null;
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []); // Only runs once on mount

  return (
    <div className="bg-[#020817] border border-gray-800 rounded-lg overflow-hidden">
      <style>{`
        .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #1f2937;
          background-color: #0B1220;
          flex-wrap: wrap;
        }
        .ql-container.ql-snow {
          border: none;
          min-height: 350px;
          font-size: 16px;
          color: #d1d5db;
        }
        .ql-editor { min-height: 350px; line-height: 1.7; }
        .ql-editor.ql-blank::before { color: #4b5563; font-style: normal; }
        .ql-snow .ql-stroke { stroke: #9ca3af; }
        .ql-snow .ql-fill { fill: #9ca3af; }
        .ql-snow .ql-picker { color: #9ca3af; }
        .ql-snow .ql-picker-options { background-color: #0B1220; border-color: #374151; }
        .ql-snow .ql-picker-item { color: #d1d5db; }
        .ql-snow .ql-picker-item:hover { color: #fff; }
        .ql-toolbar.ql-snow .ql-formats button:hover .ql-stroke,
        .ql-toolbar.ql-snow .ql-formats button.ql-active .ql-stroke { stroke: #0B79BF; }
        .ql-toolbar.ql-snow .ql-formats button:hover .ql-fill,
        .ql-toolbar.ql-snow .ql-formats button.ql-active .ql-fill { fill: #0B79BF; }
      `}</style>
      <div ref={wrapperRef} />
    </div>
  );
};

export default RichTextEditor;
