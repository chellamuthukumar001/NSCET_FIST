import React, { useState } from 'react';
import { MOCK_KNOWLEDGE_DOCUMENTS } from '../../lib/mockDatabase';
import { KnowledgeDocument } from '../../types';
import { FileText, ShieldCheck, Upload, Plus, Eye, CheckCircle2 } from 'lucide-react';

export const AdminKnowledgePage: React.FC = () => {
  const [docs, setDocs] = useState<KnowledgeDocument[]>(MOCK_KNOWLEDGE_DOCUMENTS);
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
            RAG Knowledge Engineering
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#17201C] tracking-tight">
            Institutional Knowledge Base & Grounding
          </h1>
          <p className="text-xs sm:text-sm text-[#66736C]">
            Verified PDF documents, syllabus regulations, and circulars indexed for AI retrieval.
          </p>
        </div>

        <button
          onClick={() => alert('Document upload modal activated')}
          className="px-5 py-2.5 rounded-xl bg-[#173B2F] hover:bg-[#285443] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow cursor-pointer shrink-0"
        >
          <Upload className="w-4 h-4 text-[#C49A55]" />
          <span>Ingest New Document</span>
        </button>
      </div>

      <div className="space-y-4">
        {docs.map((d) => (
          <div
            key={d.id}
            className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#173B2F] text-white text-xs font-bold">
                  {d.category}
                </span>
                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  Domain: {d.knowledgeType}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Indexed ({d.chunkCount} chunks)
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Visible to: {d.visibility}
                </span>
              </div>
            </div>

            <h3 className="text-base font-bold text-[#17201C]">{d.title}</h3>
            <p className="text-xs text-[#66736C] leading-relaxed line-clamp-2">{d.content}</p>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span>Authority: NSCET Academic Council</span>
              <span>Updated: {d.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

