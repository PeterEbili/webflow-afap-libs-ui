// type btnType = HTMLButtonElement;
// type selectType = HTMLSelectElement;
// type inputType = HTMLInputElement;
// type divType = HTMLDivElement;

// tween interface
interface TweenInterface {
    from: SupportedCSSProperties;
    to: SupportedCSSProperties;
    element: HTMLElement;
    duration: number;
    delay?: number;
    easing: EasingFunction;
    onStart?: () => void;
    onUpdate?: (progress: number) => void;
    onComplete?: () => void;
    reversed?: boolean;
    repeatCount?: number;
    loop?: boolean; // Add loop option
    start: () => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
}

// Types for supported CSS properties and colors
type SupportedCSSProperties = {
    opacity?: number;
    translateX?: string | number; // Allow both string (e.g., '100px') and number (e.g., 100)
    translateY?: string | number; // Allow both string (e.g., '100px') and number (e.g., 100)
    scaleX?: number;
    scaleY?: number;
    rotate?: number;
    perspective?: number;
    backgroundColor?: string;
    color?: string;
    position?: string;
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    inset?: string;
    width?: string | number;
    heigth?: string | number;
    [key: string]: number | string | undefined | boolean; // Support other CSS properties
};

type CSS_PROPERTIES_TYPE =
    | 'opacity'
    | 'translateX'
    | 'translateY'
    | 'scaleX'
    | 'scaleY'
    | 'scale'
    | 'rotate'
    | 'rotateX'
    | 'rotateY'
    | 'rotateZ'
    //'perspective',
    | 'backgroundColor'
    | 'color'
    | 'position'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'inset'
    | 'width'
    | 'height';

interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

// Easing function type
type EasingFunction = (t: number) => number;

// Animation trigger location type
type AnimationTriggerPosition = 'top' | 'middle' | 'bottom' | 'none';
interface ElementPositionCallbacks {
    onTop?: () => void;
    onMiddle?: () => void;
    onBottom?: () => void;
}

// Main `simpleAnimate` function
interface SimpleAnimateOptionType {
    from: SupportedCSSProperties;
    to: SupportedCSSProperties;
    element: HTMLElement;
    trigger?: HTMLElement | string; // Optional trigger element for the animation
    duration: number;
    easing?: EasingFunction | string;
    onComplete?: () => void;
    onStart?: () => void;
    onUpdate?: (progress: number) => void;
    repeatCount?: number; // Number of times to repeat the animation
    reversed?: boolean; // Whether to reverse the animation
    delay?: number;
    loop?: boolean;
    kill?: boolean;
    screenpos?: AnimationTriggerPosition | string; // Location to trigger the animation
}

// Text Animation
type TextAnimationType =
    | 'split'
    | 'scramble'
    | 'counter'
    | 'reveal'
    | 'typing'
    | 'scaling'
    | 'rotatein'
    | 'rotateout'
    | 'scalein'
    | 'scaleout'
    | 'blur'
    | 'shadow'
    | 'worddrop'
    | 'wordfall';

interface TextAnimationOptionType {
    element: HTMLElement;
    type?: TextAnimationType | string;
    duration: number;
    easing?: EasingFunction | string;
    delay?: number;
    stagger?: number;
    scrambleChars?: string;
    startValue?: number; // For counter animation
    endValue?: number; // For counter animation
    onComplete?: () => void;
    animateByWord?: boolean;
    kill?: boolean;
}

// UI Animation
type UIAnimationType =
    | 'fadeIn'
    | 'fadeOut'
    | 'rotate'
    | 'scale'
    | 'flipX'
    | 'flipY'
    | 'scaleIn'
    | 'scaleOut'
    | 'jumpOut'
    | 'jumpIn'
    | 'springUp'
    | 'springDown'
    | 'springLeft'
    | 'springRight'
    | 'spin'
    | 'grow'
    //| 'inset';
    | 'centerToOrigin'
    | 'topLeftConerToOrigin'
    | 'topRightConerToOrigin'
    | 'topConerToOrigin'
    | 'bottomConnerToOrigin'
    | 'bottomLeftConerToOrigin'
    | 'bottomRightConerToOrigin';

interface SpringOptions {
    stiffness: number;
    damping: number;
    mass: number;
    duration?: number; // Optional, can override calculated duration
}

// Scroll Animation
type ScrollAnimationOptions = {
    element: HTMLElement;
    from: SupportedCSSProperties;
    to: SupportedCSSProperties;
    container?: HTMLElement; // Optional container to check the scroll range within
    duration: number;
    easing?: EasingFunction;
    onComplete?: () => void;
    onStart?: () => void;
    onPause?: () => void;
    onResume?: () => void;
    kill?: boolean;
};

// Event Animation
type TypeOfAnimationEvents = 'view' | 'scroll' | 'hover' | 'click';
interface EventAnimationOptionType extends SimpleAnimateOptionType, TextAnimationOptionType, ScrollAnimationOptions {}

type EventAnimationPropType = {
    target: HTMLElement;
    trigger?: HTMLElement | string; // Optional trigger element for the animation
    type: TypeOfAnimationEvents;
    options: EventAnimationOptionType;
    stagger?: number;
    animator: (option, stagger?) => void;
};
type EventAnimationType = {
    target: HTMLElement;
    type: TypeOfAnimationEvents;
    clicked: boolean;
    hovered: boolean;
    isRunning: boolean;
};

// Attributes
interface AttributesType {
    setAnimation: (element: HTMLElement) => void;
}

/**
 * App Extention Animation Property Type
 */
type btnType = HTMLButtonElement;
type selectType = HTMLSelectElement;
type inputType = HTMLInputElement;
type divType = HTMLDivElement;

type AnimationType = 'ui' | 'text' | 'custom' | 'scroll';
type AnimationConfigType = 'simple' | 'short';
type AnimationEventType = 'view' | 'hover' | 'click';

interface CurrentSettingOptionType {
    delay: number;
    duration: number;
    easing: string;
    from?: SupportedCSSProperties;
    to?: SupportedCSSProperties;
    reversed?: boolean;
    loop?: boolean;
    repeatCount?: number;
    [key: string]: string | number | boolean | undefined | SupportedCSSProperties;
}
interface CurrentSettingFace {
    type: AnimationType;
    animType?: string;
    id?: string; // Unique identifier for the animation
    screenpos?: string;
    trigger?: string;
    //config: AnimationConfigType;
    options: CurrentSettingOptionType;
    event: AnimationEventType; // | 'scroll';
    //groupState?: boolean;
    //group?: string;
    repeatState?: boolean;
    selectedProperty: {
        [key: string]: { from: string; to: string };
    };
    currentPropertyList: string[];
    [key: string]:
        | string
        | string[]
        | number
        | boolean
        | undefined
        | AnimationEventType
        | AnimationType
        | { [key: string]: { from: string; to: string } }
        | CurrentSettingOptionType;
}

// Inset
type InsetFuncOption = {
    element: HTMLElement;
    duration: number;
    easing: EasingFunction;
};

// UI Animation Option Type
type SimpleUIOptionType = {
    element: HTMLElement;
    duration: number;
    easing: EasingFunction;
    onComplete?: () => void;
};

type ScalableUIOptionType = {
    element: HTMLElement;
    from?: number;
    to?: number;
    duration: number;
    easing: EasingFunction;
    onComplete?: () => void;
    reversed?: boolean;
    loop?: boolean;
};

type SpringUIOptionType = {
    element: HTMLElement;
    from: SupportedCSSProperties;
    to: SupportedCSSProperties;
    duration: number;
    springOptions?: SpringOptions;
    onComplete?: () => void;
};

interface AppUI {
    current: CurrentSettingFace;
}

interface AfapUIFace {
    fadeIn: (option: SimpleUIOptionType) => void;
    fadeOut: (option: SimpleUIOptionType) => void;
    scale: (option: ScalableUIOptionType) => void;
    rotate: (option: ScalableUIOptionType) => void;
    animate: (option: SimpleAnimateOptionType | SimpleAnimateOptionType[], stagger?: number) => void;
    flipX: (option: SimpleUIOptionType) => void;
    flipY: (option: SimpleUIOptionType) => void;
    scaleIn: (option: ScalableUIOptionType) => void;
    scaleOut: (option: ScalableUIOptionType) => void;
    jumpOut: (option: SimpleUIOptionType) => void;
    jumpIn: (option: SimpleUIOptionType) => void;
    springUp: (option: SpringUIOptionType) => void;
    springDown: (option: SpringUIOptionType) => void;
    springLeft: (option: SpringUIOptionType) => void;
    springRight: (option: SpringUIOptionType) => void;
    spin: (option: SpringUIOptionType) => void;
    grow: (option: SimpleUIOptionType) => void;
    //inset: (option: InsetOption) => void;
    centerToOrigin: (option: InsetFuncOption) => void;
    topLeftConerToOrigin: (option: InsetFuncOption) => void;
    topRightConerToOrigin: (option: InsetFuncOption) => void;
    topConerToOrigin: (option: InsetFuncOption) => void;
    bottomConnerToOrigin: (option: InsetFuncOption) => void;
    bottomLeftConerToOrigin: (option: InsetFuncOption) => void;
    bottomRightConerToOrigin: (option: InsetFuncOption) => void;
    [key: string]: (opt) => void;
}

// Window addons type for Afap Animation
interface Window {
    afap: {
        animate: (opt: SimpleAnimateOptionType) => void;
        textAnimate: (opt: TextAnimationOptionType) => void;
        ui: AfapUIFace;
        scroll: (options: ScrollAnimationOptions) => void;
        event: (options: EventAnimationPropType) => EventAnimationType;
        //attributes: (option: boolean) => AttributesType;
    };
    AfapAttributes;
    webflow: {
        getAllComponents: () => Promise<{ id: string; getName: () => string }[]>;
        getSelectedElement: () => {
            id: { element: string; component: string };
            customAttributes: object;
            removeCustomAttribute: (opt: string) => void;
            setCustomAttribute: (opt: string, value: string) => void;
            before: (item: { id: string; getName: () => string }) => Promise<void>;
            getAllCustomAttributes: () => Promise<Array<{ name: string; value: string }>>;
        };
    };
    STARUSER_LIB_KEY_AFAP: string;
    StarUserAfapist: {
        hasStarAccess: () => Promise<boolean>;
        confirmSuperStarAccess: (key: string) => Promise<boolean>;
        getStarKeyFromDB: () => Promise<string>;
        saveStarKeyToDB: (key: string) => Promise<boolean>;
        decrypt: (data: string) => Promise<string>;
        encrypt: (data: string) => Promise<string>;
        dbGet: (data: string) => Promise<string | undefined>;
        dbSet: (data: string, value) => Promise<void>;
    };
}

/**
 *  Window component for Motionable,
 *  */
/* Motionable Interfaces */
type VectorFace = { x: number; y: number };
type BodyTypeFace = 'rigid' | 'fluid' | 'ghost' | 'soft';
type BodyShapeFace = 'rectangle' | 'circle' | 'polygon';
interface BodyOptions {
    type?: BodyTypeFace;
    draggable?: boolean;
    mass?: number;
    velocity?: VectorFace;
    friction?: number;
    restitution?: number;
    float?: boolean;
    fixed?: boolean;
    shape?: BodyShapeFace; // NEW
    points?: VectorFace[]; // Only for polygon
    radius?: number; // Only for circle
}
interface SceneFace {
    body: BodyFace;
    direction: { x: number; y: number };
    speed: number;
    duration: number;
    elapsed: number;
    onComplete?: () => void;
    update(dt: number): void;
}
interface WorldFace {
    element: HTMLElement;
    gravity: number;
    bodies: BodyFace[];
    timeScale: number;
    zoomLevel: number;
    scenes: SceneFace[];
    addBody(body: BodyFace): void;
    addScene(scene: SceneFace): void;
    loop(): void;
    detectCollisions(): void;
    checkCollision(a: BodyFace, b: BodyFace): boolean;
    resolveCollision(a: BodyFace, b: BodyFace): void;
    zoom(scale: number): void;
}
interface BodyFace {
    element: HTMLElement;
    world?: WorldFace;
    velocity: VectorFace;
    position: VectorFace;
    options: BodyOptions;
    update(dt: number, world: WorldFace): void;
    applyBounds(world: WorldFace): void;
    render(): void;
    scale(zoom: number): void;
    makeDraggable(): void;
    sceneUpdate(): void;
}
interface MotionEngineFace {
    worlds: WorldFace[];
    running: boolean;
    timeScale: number;
    addWorld(world: WorldFace): void;
    removeWorld(world: WorldFace): void;
    start(): void;
    stop(): void;
}
interface SceneEngineFace {
    scenes: SceneFace[];
    running: boolean;
    addScene(scene: SceneFace): void;
    start(): void;
    stop(): void;
}
interface Window {
    Motionable: {
        MotionEngine: {
            new (): MotionEngineFace;
        };
        SceneEngine: {
            new (): SceneEngineFace;
        };
        Scene: {
            new (
                body: BodyFace,
                direction: { x: number; y: number },
                speed: number,
                duration: number,
                onComplete?: () => void
            ): SceneFace;
        };
        World: {
            new (element: HTMLElement, gravity?: number, timeScale?: number): WorldFace;
        };
        Body: {
            new (element: HTMLElement, options: BodyOptions = {}): BodyFace;
        };
    };
}

/**
 * Window component for Preloader,
 *  */
interface PreloaderType {
    start: () => void;
    safeHide: () => void;
    hide: () => void;
}
interface PreloaderOptions {
    container?: divType;
    element?: divType;
    timeout?: number; // Timeout to auto-end preloader
    easing?: EasingFunction; // Custom easing function for smooth animation
    bgcolor?: string; // backgroung color
    color?: string;
}
interface TableSkeletonOptions extends PreloaderOptions {
    xcount?: number; // rowCount
    ycount?: number; // columnCount
    height?: string;
    ygap?: number; // columnGap
    xgap?: number; // rowGap
    radius?: number;
    duration?: number;
}
interface SpinnerTrailOptions extends PreloaderOptions {
    size?: number; // Size of the spinner (diameter in pixels)
    thickness?: number; // Thickness of the spinner and trail
    length?: number; // Length of the fading trail
    duration?: number; // Speed of the rotation (in ms for a full rotation)
    tcolor?: string; // Color of the trail : trailColor
    istrail?: boolean; // enableTrail
}
interface TypingEffectOptions extends PreloaderOptions {
    words?: string[]; // Array of sentences or phrases to type
    duration?: number; // duration of typing (ms per character)
    interval?: number; // Delay after typing completes before clearing
    loop?: boolean; // Whether to loop the typing effect
}
interface WheelFortuneOptions extends PreloaderOptions {
    pcolor?: string; // pointerColor
    count?: number;
    words?: string[];
    speed?: number; // rotations per second
    size?: number; // in pixels
}
interface WordSequenceOptions extends PreloaderOptions {
    words?: string[];
    induration?: number; // fade In duration
    interval?: number;
    outduration?: number; // fade Out duration
    loop?: boolean;
}
interface ZigzagOptions extends PreloaderOptions {
    count?: number;
    length?: number;
    amplitude?: number;
    speed?: number; // cycles per second
}
type ShapePointFace = { x: number; y: number };
interface ShapeTransformOptions extends PreloaderOptions {
    duration?: number;
    length?: number;
    radius?: number;
    width?: string;
    height?: string;
    stroke?: number;
}
interface RocketLaunchOptions extends PreloaderOptions {
    tcolor?: string; // trailColor
    duration?: number;
    speed?: number;
}
interface RippleOptions extends PreloaderOptions {
    size?: number; // Size of the initial ripple (diameter in pixels)
    count?: number; // Number of ripple rings
    duration?: number; // Duration for a full ripple expansion (in ms)
}
type ProgressLineDirectionType = 'horizontal' | 'vertical';
interface ProgressLineOptions extends PreloaderOptions {
    direction?: ProgressLineDirectionType;
    speed?: number;
    duration?: number;
    thick?: string;
}
interface OrbitingOptions extends PreloaderOptions {
    count?: number;
    radius?: number;
    size?: number;
    speed?: number; // rotations per second
}
type MarqueeDirectionType = 'ltr' | 'rtl';
interface MarqueeOptions extends PreloaderOptions {
    text?: string;
    duration?: number;
    speed?: number; // pixels per second
    loop?: boolean; // true = infinite loop
    direction?: MarqueeDirectionType; // scrolling direction
}
interface ProgressOptions extends PreloaderOptions {
    height?: string;
}
type CountPreloaderTypesFace = 'up' | 'down';
interface CountPreloaderOptions extends PreloaderOptions {
    type?: CountPreloaderTypesFace;
}
interface CharacterFlipOptions extends PreloaderOptions {
    size?: number;
    customs?: string[]; // custom characters
    interval?: number; // in ms
}
interface GamePixelatedOptions extends PreloaderOptions {
    duration?: number;
    speed?: number;
    size?: number;
    loadingtext?: boolean; // showLoadingText
}
interface DualRingOptions extends PreloaderOptions {
    size?: number; // Size of the rings (diameter in pixels)
    thickness?: number; // Thickness of each ring
    duration?: number; // duration per rotation (in ms for a full rotation)
}
type DotSpinnerOptionTypes = 'pulse' | 'rotate';
interface DotSpinnerOptions extends PreloaderOptions {
    size?: number; // Size of each dot (diameter in pixels)
    count?: number; // Number of dots in the spinner
    duration?: number; // Duration for a full animation cycle (in ms)
    type?: DotSpinnerOptionTypes; // Type of animation: 'pulse' or 'rotate'
}
interface CircularOptions extends PreloaderOptions {
    radius?: number;
    stroke?: number;
}
interface BarsOptions extends PreloaderOptions {
    count?: number; // Number of bars
    height?: string; // Height of the bars
    width?: string; // Width of each bar
    duration?: number; // Speed of the animation (ms)
}
interface Window {
    Preloadable: {
        TableSkeleton: {
            new (options?: TableSkeletonOptions): PreloaderType;
        };
        SpinnerTrail: {
            new (options?: SpinnerTrailOptions): PreloaderType;
        };
        TypingEffect: {
            new (options?: TypingEffectOptions): PreloaderType;
        };
        WheelFortune: {
            new (options?: WheelFortuneOptions): PreloaderType;
        };
        WordSequence: {
            new (options?: WordSequenceOptions): PreloaderType;
        };
        Zigzag: {
            new (options?: ZigzagOptions): PreloaderType;
        };
        ShapeTransform: {
            new (options?: ShapeTransformOptions): PreloaderType;
        };
        RocketLaunch: {
            new (options?: RocketLaunchOptions): PreloaderType;
        };
        Ripple: {
            new (options?: RippleOptions): PreloaderType;
        };
        ProgressLine: {
            new (options?: ProgressLineOptions): PreloaderType;
        };
        Orbiting: {
            new (options?: OrbitingOptions): PreloaderType;
        };
        Marquee: {
            new (options?: MarqueeOptions): PreloaderType;
        };
        Progress: {
            new (options?: ProgressOptions): PreloaderType;
        };
        Count: {
            new (options?: CountPreloaderOptions): PreloaderType;
        };
        CharacterFlip: {
            new (options?: CharacterFlipOptions): PreloaderType;
        };
        GamePixelated: {
            new (options?: GamePixelatedOptions): PreloaderType;
        };
        DualRing: {
            new (options?: DualRingOptions): PreloaderType;
        };
        DotSpinner: {
            new (options?: DotSpinnerOptions): PreloaderType;
        };
        Circular: {
            new (options?: CircularOptions): PreloaderType;
        };
        Bars: {
            new (options?: BarsOptions): PreloaderType;
        };
    };
}

/**
 * SPA Transition
 */
interface SPATransitionFuncOptionType {
    element: HTMLElement;
    duration?: number;
    easing?: string;
}
type SPATransitionFuncType = (opt: SPATransitionFuncOptionType) => Promise<void>;
interface Window {
    AfapTransition: {
        SPAViewTransition: {
            new (option: { mode: 'swap' | 'replace' }): void;
        };
        Transitions: { [key: string]: SPATransitionFuncType };
    };
}

/**
 * FlipAnimator.ts | Flip Animation
 */
type FlipState = {
    bounds: DOMRect;
    computedTransform: string;
    inlineStyleSnapshot: string | null;
    opacity: string | null;
};

type PerElementOptions = {
    duration?: number;
    delay?: number;
    easing?: string;
    reverse?: boolean;
    loop?: boolean | number; // NEW: per-element looping
};

type MoveOptions = {
    duration?: number; // ms
    easing?: string; // CSS easing string
    absolute?: boolean; // clone animation mode
    opacity?: boolean; // animate opacity
    preservescroll?: boolean; // include scroll in bounds
    onStart?: (els: HTMLElement[]) => void;
    onComplete?: (els: HTMLElement[]) => void;
    debug?: boolean;

    // NEW OPTIONS
    nested?: boolean; // capture children recursively
    stagger?: number; // delay per index
    delay?: number; // global delay
    reverse?: boolean; // reverse animation direction
    loop?: boolean | number; // global looping
};

interface MoveAnimatorType {
    options: Required<MoveOptions>;
    clear: () => void;
    capture: (elements: HTMLElement[] | NodeListOf<HTMLElement>) => void;
    flip: (elements: HTMLElement[] | NodeListOf<HTMLElement>) => Promise<void>;
    isFlipping: () => boolean;
    cancel: () => void;
}
interface Window {
    MoveAnimator: {
        new (options?: MoveOptions): MoveAnimatorType;
    };
}
