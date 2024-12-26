'use client';
import React from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
  useSpring,
} from 'motion/react';
import {
  IconAddressBook,
  IconBrandGithub,
  IconHome,
  IconPhone,
  IconSettings,
  IconUserFilled,
} from '@tabler/icons-react';
import Link from 'next/link';

interface IProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const links: IProps[] = [
  {
    href: '/',
    label: 'About',
    icon: (
      <IconBrandGithub className="h-full w-full text-neutral-700 dark:text-neutral-500" />
    ),
  },
  {
    href: '/',
    label: 'Home',
    icon: (
      <IconHome className="h-full w-full text-neutral-800 dark:text-neutral-500" />
    ),
  },
  {
    href: '/',
    label: 'Contact',
    icon: (
      <IconPhone className="h-full w-full text-neutral-800 dark:text-neutral-500" />
    ),
  },
  {
    href: '/',
    label: 'Admin',
    icon: (
      <IconUserFilled className="h-full w-full text-neutral-800 dark:text-neutral-500" />
    ),
  },
  {
    href: '/',
    label: 'Settings',
    icon: (
      <IconSettings className="h-full w-full text-neutral-800 dark:text-neutral-500" />
    ),
  },
  {
    href: '/',
    label: 'Add',
    icon: (
      <IconAddressBook className="h-full w-full text-neutral-800 dark:text-neutral-500" />
    ),
  },
];

export default function FloatingDock() {
  return (
    <motion.div className="flex items-center justify-center h-screen">
      <FloatingCore />
    </motion.div>
  );
}

function FloatingCore() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-10 inset-x-0 mx-auto px-4 gap-x-4 bg-neutral-100 h-16 w-fit rounded-2xl flex justify-around items-center"
    >
      {links.map((el) => (
        <IconContainer mouseX={mouseX} key={el.label} el={el} />
      ))}
    </div>
  );
}

function IconContainer({
  el,
  mouseX,
}: {
  el: IProps;
  mouseX: MotionValue<number>;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
      width: 0,
    };

    return val - (bounds.x + bounds.width / 2);
  });

  const widthT = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightT = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const iconw = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const iconh = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthT, { stiffness: 120, damping: 12, mass: 0.5 });
  const height = useSpring(heightT, { stiffness: 120, damping: 12, mass: 0.5 });

  const iconWidth = useSpring(iconw, {
    stiffness: 120,
    damping: 12,
    mass: 0.1,
  });

  const iconHeight = useSpring(iconh, {
    stiffness: 120,
    damping: 12,
    mass: 0.1,
  });

  return (
    <Link href={el.href}>
      <motion.div
        style={{ width, height }}
        ref={ref}
        className="flex items-center justify-center bg-neutral-200 rounded-full"
      >
        <motion.div
          style={{
            width: iconWidth,
            height: iconHeight,
          }}
          className="flex items-center justify-center"
        >
          {el.icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
