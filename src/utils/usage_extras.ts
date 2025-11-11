interface animateOptionType {
    type?: string;
    from?: SupportedCSSProperties;
    to?: SupportedCSSProperties;
    duration?: number;
    easing?: string;
    delay?: number;
    repeatCount?: number; // Number of times to repeat the animation
    reversed?: boolean; // Whether to reverse the animation
    loop?: boolean;
}
type whatType = Partial<TextAnimationType> | Partial<UIAnimationType>;

interface animateMember {
    name: string;
    description?: string;
    type: 'ui' | 'text' | 'custom';
    whatType?: whatType;
    animate?: animateOptionType | animateOptionType[];
    state: 'view' | 'click' | 'hover' | 'scroll';
    group?: string;
    boxCount?: number;
}
const uiAnimationList: animateMember[] = [
    {
        name: 'Fade In',
        type: 'ui',
        whatType: 'fadeIn',
        state: 'view',
        boxCount: 1,
    },
    {
        name: 'Fade Out',
        type: 'ui',
        whatType: 'fadeOut',
        state: 'view',
        boxCount: 1,
    },
    {
        name: 'Flip X side',
        type: 'ui',
        whatType: 'flipX',
        state: 'view',
        boxCount: 1,
    },
    {
        name: 'Flip Y side',
        type: 'ui',
        whatType: 'flipY',
        state: 'view',
        boxCount: 1,
    },
    {
        name: 'Scale',
        type: 'ui',
        whatType: 'scale',
        state: 'view',
        boxCount: 1,
    },
    {
        name: 'Rotate',
        type: 'ui',
        whatType: 'rotate',
        state: 'click',
        boxCount: 1,
    },
    {
        name: 'ScaleIn',
        type: 'ui',
        whatType: 'scaleIn',
        state: 'view',
        boxCount: 1,
    },
    {
        name: 'ScaleOut',
        type: 'ui',
        whatType: 'scaleOut',
        state: 'view',
        boxCount: 1,
    },
    {
        name: 'Jump Out',
        type: 'ui',
        whatType: 'jumpOut',
        state: 'click',
        boxCount: 1,
    },
    {
        name: 'Jump In',
        type: 'ui',
        whatType: 'jumpIn',
        state: 'click',
        boxCount: 1,
    },
    {
        name: 'Spring Up',
        type: 'ui',
        whatType: 'springUp',
        state: 'click',
        boxCount: 1,
    },
    {
        name: 'Spring Down',
        type: 'ui',
        whatType: 'springDown',
        state: 'click',
        boxCount: 1,
    },
    {
        name: 'Spring Left',
        type: 'ui',
        whatType: 'springLeft',
        state: 'click',
        boxCount: 1,
    },
    {
        name: 'Spring Right',
        type: 'ui',
        whatType: 'springRight',
        state: 'click',
        boxCount: 1,
    },
    {
        name: 'Spin',
        type: 'ui',
        whatType: 'spin',
        state: 'click',
        boxCount: 1,
    },
    {
        name: 'Grow',
        type: 'ui',
        whatType: 'grow',
        state: 'click',
        boxCount: 1,
    },
    {
        name: 'centerToOrigin',
        type: 'ui',
        whatType: 'centerToOrigin',
        state: 'click',
        boxCount: 1,
    },
    /* {
        name: 'topLeftConerToOrigin',
        type: 'ui',
        whatType: 'topLeftConerToOrigin',
        state: 'click',
        boxCount: 1,
    }, */
    {
        name: 'topRightConerToOrigin',
        type: 'ui',
        whatType: 'topRightConerToOrigin',
        state: 'click',
        boxCount: 1,
    },
    {
        name: 'topConerToOrigin',
        type: 'ui',
        whatType: 'topConerToOrigin',
        state: 'click',
        boxCount: 1,
    },
    {
        name: 'bottomConnerToOrigin',
        type: 'ui',
        whatType: 'bottomConnerToOrigin',
        state: 'click',
        boxCount: 1,
    },
    {
        name: 'bottomLeftConerToOrigin',
        type: 'ui',
        whatType: 'bottomLeftConerToOrigin',
        state: 'click',
        boxCount: 1,
    },
    {
        name: 'bottomRightConerToOrigin',
        type: 'ui',
        whatType: 'bottomRightConerToOrigin',
        state: 'click',
        boxCount: 1,
    },
];
const textAnimationList: animateMember[] = [
    {
        name: 'Split Text',
        description: 'This is an example of our split text.',
        type: 'text', // text, custom
        whatType: 'split',
        state: 'view', // click, hover, scroll
    },
    {
        name: 'Reveal Text',
        description: 'This is an example of our reveal text.',
        type: 'text', // text, custom
        whatType: 'reveal',
        state: 'view', // click, hover, scroll
    },
    {
        name: 'WordDrop Text',
        description: 'This is an example of our <i>word drop</i> text.',
        type: 'text',
        whatType: 'worddrop',
        state: 'view',
    },
    {
        name: 'Word Fall Text',
        description: 'This is an example of our <i>wordfall</i> text.',
        type: 'text',
        whatType: 'wordfall',
        state: 'view',
    },
    {
        name: 'Shadow',
        description: 'This is an example of our shadow text.',
        type: 'text',
        whatType: 'shadow',
        state: 'view',
    },
    {
        name: 'Blur Text',
        description: 'This is an example of our blur text.',
        type: 'text',
        whatType: 'blur',
        state: 'view',
    },
    {
        name: 'Counter',
        description: '50000',
        type: 'text',
        whatType: 'counter',
        state: 'view',
    },
    {
        name: 'Rotate In Text',
        description: 'This is an example of our rotate In text.',
        type: 'text',
        whatType: 'rotatein',
        state: 'view',
    },
    {
        name: 'Rotate Out Text',
        description: 'This is an example of our rotate out text.',
        type: 'text',
        whatType: 'rotateout',
        state: 'view',
    },
    {
        name: 'Scaling Text',
        description: 'This is a scaling text.',
        type: 'text',
        whatType: 'scaling',
        state: 'view',
    },
    {
        name: 'Scale IN Text',
        description: 'This is a scale in text.',
        type: 'text',
        whatType: 'scalein',
        state: 'view',
    },
    {
        name: 'Scale Out Text',
        description: 'This is a scale out text.',
        type: 'text',
        whatType: 'scaleout',
        state: 'view',
    },
    {
        name: 'Typing Text',
        description: 'This is an example of our typing text.',
        type: 'text',
        whatType: 'typing',
        state: 'view',
    },
    {
        name: 'Scramble Text',
        description: 'Scramble text example.',
        type: 'text',
        whatType: 'scramble',
        state: 'view',
    },
];

export const AnimationMemberList: animateMember[] = [...uiAnimationList, ...textAnimationList];
