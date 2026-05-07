export interface ProgressBarProps {
  current: number;
  total: number;
  branch: 'flow' | 'conversion' | 'retention' | null;
}

const branchColors = {
  flow: '#8B3A42',
  conversion: '#1E3A5F',
  retention: '#2D5A3D',
};

const branchIcons = {
  flow: '🔴',
  conversion: '🔵',
  retention: '🟢',
};

export function ProgressBar({ current, total, branch }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  const color = branch ? branchColors[branch] : '#8B3A42';
  const icon = branch ? branchIcons[branch] : '';

  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '14px', color: '#666' }}>
          {icon} Вопрос {current} из {total}
        </span>
        <span style={{ fontSize: '14px', color: '#666' }}>
          {Math.round(percentage)}%
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#E8E8E8',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
          transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  );
}
