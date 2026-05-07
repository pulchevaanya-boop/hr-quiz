import React from 'react';

export interface DiagnosticResult {
  title: string;
  diagnosis: string;
  error: string;
  enhancement: string;
  actions: string[];
  expectedEffect: string;
  productRecommendation: string;
}

export interface ResultsProps {
  result: DiagnosticResult;
  branchColor: string;
  businessType: string;
  onRestart: () => void;
}

export function Results({ result, branchColor, businessType, onRestart }: ResultsProps) {
  const downloadPDF = () => {
    window.print();
  };

  return (
    <div id="results-content" style={{
      maxWidth: '100%',
      animation: 'fadeIn 0.4s ease',
      paddingLeft: '24px',
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '48px',
        paddingBottom: '32px',
        borderBottom: `2px solid ${branchColor}`,
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '8px',
          lineHeight: '1.3',
        }}>
          {result.title}
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#999',
          marginTop: '12px',
        }}>
          Диагностика для: <span style={{ color: '#333', fontWeight: '500' }}>{businessType}</span>
        </p>
      </div>

      {/* Diagnosis Card */}
      <div style={{
        padding: '28px',
        backgroundColor: '#FFFFFF',
        border: `1px solid ${branchColor}20`,
        borderRadius: '12px',
        marginBottom: '24px',
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: branchColor,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '12px',
        }}>
          Что происходит
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#333',
          lineHeight: '1.7',
          margin: '0',
        }}>
          {result.diagnosis}
        </p>
      </div>

      {/* Problem Card */}
      <div style={{
        padding: '28px',
        backgroundColor: '#FFFFFF',
        border: `1px solid #E0E0E0`,
        borderRadius: '12px',
        marginBottom: '24px',
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#666',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '12px',
        }}>
          Почему это проблема
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#555',
          lineHeight: '1.7',
          margin: '0',
        }}>
          {result.error}
        </p>
      </div>

      {/* Solution Card */}
      <div style={{
        padding: '28px',
        backgroundColor: '#FFFFFF',
        border: `1px solid #E0E0E0`,
        borderRadius: '12px',
        marginBottom: '24px',
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: branchColor,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '20px',
        }}>
          План действий
        </h3>
        <p style={{
          fontSize: '15px',
          color: '#555',
          marginBottom: '20px',
          fontWeight: '500',
        }}>
          {result.enhancement}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '12px',
        }}>
          {result.actions.map((action, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '16px',
                paddingBottom: '12px',
                borderBottom: idx < result.actions.length - 1 ? '1px solid #F0F0F0' : 'none',
              }}
            >
              <div style={{
                minWidth: '28px',
                width: '28px',
                height: '28px',
                backgroundColor: branchColor,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '13px',
                flexShrink: 0,
                marginTop: '2px',
              }}>
                {idx + 1}
              </div>
              <p style={{
                fontSize: '15px',
                color: '#333',
                lineHeight: '1.6',
                margin: '0',
              }}>
                {action}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Results Card */}
      <div style={{
        padding: '28px',
        backgroundColor: '#FFFFFF',
        border: `1px solid #E0E0E0`,
        borderRadius: '12px',
        marginBottom: '48px',
        background: `linear-gradient(135deg, #FFFFFF 0%, ${branchColor}08 100%)`,
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: branchColor,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '12px',
        }}>
          Ожидаемый результат
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#333',
          lineHeight: '1.7',
          fontWeight: '500',
          margin: '0',
        }}>
          {result.expectedEffect}
        </p>
      </div>

      {/* Recommendation */}
      <div style={{
        padding: '20px',
        backgroundColor: '#F8F9FB',
        border: `1px solid #E8EBF0`,
        borderRadius: '8px',
        marginBottom: '40px',
      }}>
        <p style={{
          fontSize: '13px',
          color: '#666',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontWeight: '600',
          marginBottom: '8px',
          margin: '0 0 8px 0',
        }}>
          💡 Рекомендация
        </p>
        <p style={{
          fontSize: '15px',
          color: '#555',
          lineHeight: '1.6',
          margin: '0',
        }}>
          {result.productRecommendation}
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
      }}>
        <button
          onClick={onRestart}
          style={{
            padding: '16px 24px',
            backgroundColor: branchColor,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '0.9';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '1';
          }}
        >
          ← Вернуться в меню
        </button>
        <button
          onClick={downloadPDF}
          style={{
            padding: '16px 24px',
            backgroundColor: '#FFFFFF',
            color: branchColor,
            border: `2px solid ${branchColor}`,
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.backgroundColor = branchColor;
            el.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.backgroundColor = '#FFFFFF';
            el.style.color = branchColor;
          }}
        >
          📄 Скачать PDF
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media print {
          body {
            background: white !important;
          }

          button {
            display: none !important;
          }

          div[style*="padding-left"] {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
