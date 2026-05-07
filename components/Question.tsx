import React from 'react';

export interface QuestionProps {
  id: string;
  text: string;
  type: 'select' | 'yesno';
  options?: Array<{ label: string; value: string; nextQuestionId?: string; tag?: string }>;
  onAnswer: (answer: string, nextQuestionId: string) => void;
  branchColor?: string;
}

export function Question({ id, text, type, options, onAnswer, branchColor = '#8B3A42' }: QuestionProps) {
  const [selected, setSelected] = React.useState<string | null>(null);

  if (type === 'yesno') {
    const yesNoOptions = [
      { label: 'Да', value: 'yes' },
      { label: 'Нет', value: 'no' },
    ];
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        if (selected) {
          const nextId = selected === 'yes' ? id + '-yes' : id + '-no';
          onAnswer(selected, nextId);
        }
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '32px', color: '#1a1a1a', lineHeight: '1.4' }}>
          {text}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {yesNoOptions.map((opt) => (
            <label
              key={opt.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                backgroundColor: selected === opt.value ? branchColor : '#F5F5F5',
                border: `2px solid ${selected === opt.value ? branchColor : '#E0E0E0'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (selected !== opt.value) {
                  e.currentTarget.style.backgroundColor = '#EFEFEF';
                  e.currentTarget.style.borderColor = '#CCC';
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== opt.value) {
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                  e.currentTarget.style.borderColor = '#E0E0E0';
                }
              }}
            >
              <input
                type="radio"
                name={id}
                value={opt.value}
                checked={selected === opt.value}
                onChange={(e) => setSelected(e.target.value)}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  accentColor: branchColor,
                }}
              />
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: selected === opt.value ? 'white' : '#1a1a1a',
              }}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          disabled={!selected}
          style={{
            width: '100%',
            padding: '14px 24px',
            backgroundColor: selected ? branchColor : '#CCC',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: selected ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            opacity: selected ? 1 : 0.6,
          }}
          onMouseEnter={(e) => {
            if (selected) {
              (e.currentTarget as HTMLButtonElement).style.opacity = '0.9';
            }
          }}
          onMouseLeave={(e) => {
            if (selected) {
              (e.currentTarget as HTMLButtonElement).style.opacity = '1';
            }
          }}
        >
          Далее →
        </button>
      </form>
    );
  }

  // Select type
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (selected) {
        const opt = options?.find(o => o.value === selected);
        if (opt) {
          const nextId = opt.nextQuestionId || opt.tag || 'result';
          onAnswer(selected, nextId);
        }
      }
    }}>
      <h2 style={{ fontSize: '24px', marginBottom: '32px', color: '#1a1a1a', lineHeight: '1.4' }}>
        {text}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '24px' }}>
        {options?.map((opt) => (
          <label
            key={opt.value}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '16px 20px',
              backgroundColor: selected === opt.value ? branchColor : '#FFFFFF',
              border: `2px solid ${selected === opt.value ? branchColor : '#E0E0E0'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (selected !== opt.value) {
                e.currentTarget.style.backgroundColor = '#F9F9F9';
                e.currentTarget.style.borderColor = '#CCC';
              }
            }}
            onMouseLeave={(e) => {
              if (selected !== opt.value) {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#E0E0E0';
              }
            }}
          >
            <input
              type="radio"
              name={id}
              value={opt.value}
              checked={selected === opt.value}
              onChange={(e) => setSelected(e.target.value)}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                accentColor: branchColor,
                marginTop: '2px',
                flexShrink: 0,
              }}
            />
            <span style={{
              fontSize: '15px',
              color: selected === opt.value ? 'white' : '#1a1a1a',
              fontWeight: selected === opt.value ? '600' : '400',
              lineHeight: '1.4',
            }}>
              {opt.label}
            </span>
          </label>
        ))}
      </div>
      <button
        type="submit"
        disabled={!selected}
        style={{
          width: '100%',
          padding: '14px 24px',
          backgroundColor: selected ? branchColor : '#CCC',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: selected ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s ease',
          opacity: selected ? 1 : 0.6,
        }}
        onMouseEnter={(e) => {
          if (selected) {
            (e.currentTarget as HTMLButtonElement).style.opacity = '0.9';
          }
        }}
        onMouseLeave={(e) => {
          if (selected) {
            (e.currentTarget as HTMLButtonElement).style.opacity = '1';
          }
        }}
      >
        Далее →
      </button>
    </form>
  );
}
