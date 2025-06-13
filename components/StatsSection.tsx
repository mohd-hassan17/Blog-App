import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function StatsSection() {
  const [ref1, inView1] = useInView({ triggerOnce: true });
  const [ref2, inView2] = useInView({ triggerOnce: true });
  const [ref3, inView3] = useInView({ triggerOnce: true });

  return (
    <div className="grid grid-cols-3 gap-4 pt-8 text-white md:max-w-md">
      {/* Published Articles */}
      <div className="space-y-2" ref={ref1}>
        <div className="text-2xl font-bold text-primary">
          {inView1 && <CountUp end={97} duration={2} suffix="+" />}
        </div>
        <div className="text-sm text-gray-400">Published Articles</div>
      </div>

      {/* Expert Writers */}
      <div className="space-y-2" ref={ref2}>
        <div className="text-2xl font-bold text-primary">
          {inView2 && <CountUp end={15} duration={2} suffix="+" />}
        </div>
        <div className="text-sm text-gray-400">Expert Writers</div>
      </div>

      {/* Monthly Readers */}
      <div className="space-y-2" ref={ref3}>
        <div className="text-2xl font-bold text-primary">
          {inView3 && <CountUp end={1000} duration={2.5} suffix="+" separator="," />}
        </div>
        <div className="text-sm text-gray-400">Monthly Readers</div>
      </div>
    </div>
  );
}
