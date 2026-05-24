type PagerDotsProps = {
  count: number;
  activeIndex: number;
};

export function PagerDots({ count, activeIndex }: PagerDotsProps) {
  return (
    <div
      className="pager-dots"
      role="tablist"
      aria-label={`Step ${activeIndex + 1} of ${count}`}>
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={`pager-dots__dot${index === activeIndex ? ' pager-dots__dot--active' : ''}`}
          role="tab"
          aria-selected={index === activeIndex}
        />
      ))}
    </div>
  );
}
