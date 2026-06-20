export default function StrengthMeter({ score }) {
  const segments = [1, 2, 3, 4];

  const getLabel = () => {
    if (score <= 1) return { text: 'Weak', colorClass: 'text-error' };
    if (score === 2) return { text: 'Medium', colorClass: 'text-tertiary' };
    if (score === 3) return { text: 'Strong', colorClass: 'text-secondary' };
    return { text: 'Impenetrable', colorClass: 'text-primary' };
  };

  const getSegmentClass = (index) => {
    if (index > score) return 'bg-white/10';
    if (score <= 1) return 'bg-error';
    if (score === 2) return 'bg-tertiary';
    if (score === 3) return 'bg-secondary';
    return 'bg-primary';
  };

  const labelInfo = getLabel();

  return (
    <div className="flex flex-col gap-xs mt-md">
      <div className="flex justify-between items-center">
        <span className="font-label-md text-label-md text-on-surface-variant">Security Strength</span>
        <span className={`font-label-md text-label-md uppercase font-bold ${labelInfo.colorClass}`}>
          {labelInfo.text}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-sm">
        {segments.map((index) => (
          <div
            key={index}
            className={`strength-segment ${getSegmentClass(index)}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
