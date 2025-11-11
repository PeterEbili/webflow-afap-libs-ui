export const EASE_FUNCTIONS: { [key: string]: string } = {
    // Standard
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',

    // Quadratic / Cubic Basics
    easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',

    // Quart & Quint
    easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
    easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
    easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
    easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',

    // Sine
    easeInSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
    easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
    easeInOutSine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

    // Expo
    easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
    easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
    easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',

    // Circ
    easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
    easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
    easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',

    // Back
    easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

    // Bounce-like
    bounce: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    softBounce: 'cubic-bezier(0.25, 1.5, 0.5, 1)',
    elastic: 'cubic-bezier(0.7, -0.4, 0.6, 1.6)',
    elasticBounce: 'cubic-bezier(0.33, 1.53, 0.69, 0.99)',

    // Snappy
    quickSnap: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    snapEnd: 'cubic-bezier(0.25, 1, 0.5, 1)',
    hardSnap: 'cubic-bezier(0.35, 1.3, 0.6, 1)',
    smoothSnap: 'cubic-bezier(0.2, 0.8, 0.4, 1)',

    // Dramatic Curves
    dramatic: 'cubic-bezier(0.86, 0, 0.07, 1)',
    dramaticIn: 'cubic-bezier(0.75, -0.5, 0.25, 1.5)',
    dramaticOut: 'cubic-bezier(0.8, -0.6, 0.2, 1.6)',

    // Fun / Playful
    wobble: 'cubic-bezier(0.45, 1.4, 0.6, 0.9)',
    swing: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    jump: 'cubic-bezier(0.15, 0.85, 0.3, 1.2)',
    springy: 'cubic-bezier(0.3, 1.5, 0.6, 1)',
    rubberBand: 'cubic-bezier(0.2, 1, 0.3, 1.5)',

    // Smooth Motion
    smoothOut: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
    smoothSharp: 'cubic-bezier(0.0, 0.0, 0.2, 1.0)',
    balanced: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
    symmetric: 'cubic-bezier(0.17, 0.67, 0.83, 0.67)',
};
