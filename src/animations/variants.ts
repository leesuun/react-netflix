// home
export const rowVariants = {
  hidden: (direction: string) => ({
    x: direction === "right" ? window.innerWidth - 5 : -window.innerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (direction: string) => ({
    x: direction === "left" ? window.innerWidth - 5 : -window.innerWidth + 5,
  }),
};

export const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.3,
    },
  },
};
export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

// detail
