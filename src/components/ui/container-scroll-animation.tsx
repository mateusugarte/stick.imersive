"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 0.4, 0.7], [15, 0, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7],
    isMobile ? [0.8, 0.95, 0.95] : [0.9, 1, 1]
  );
  const translate = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  return (
    <div
      className="min-h-[50rem] md:min-h-[60rem] flex items-start justify-center relative px-4 md:px-20 py-20 md:py-32"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{ perspective: "1200px" }}
      >
        <Header translate={translate} opacity={opacity} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} opacity={opacity}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, opacity, titleComponent }: any) => {
  return (
    <motion.div
      style={{ translateY: translate, opacity }}
      className="max-w-5xl mx-auto text-center mb-8"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  opacity,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  opacity: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        opacity,
      }}
      className="max-w-3xl mx-auto w-full p-2 md:p-4"
    >
      <div className="w-full rounded-2xl bg-card/80 backdrop-blur border border-border/50 p-4 md:p-6">
        {children}
      </div>
    </motion.div>
  );
};
