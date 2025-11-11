import { UI_ANIMATIONS, TEXT_ANIMATIONS } from './constants';
import { AnimsStyleConverter } from '../custom-patternable';

export default class Attributes {
    private attr: string;
    private attrType: string;
    private attrState: string;
    private attrTime: string;
    private attrEase: string;
    public elements: HTMLElement[];
    private uiAnimationList: string[];
    private textAnimationList: string[];
    private selector;
    private readonly animAttr: string;
    private readonly styleAttr: string;
    public styles: HTMLStyleElement[];
    constructor(initate = true) {
        this.attr = 'af-anims'; // ui and text
        this.animAttr = 'af-anims';
        //ui[fadeIn, fadeOut, rotate, scale, flipX, flipY]
        this.uiAnimationList = UI_ANIMATIONS;
        //text[split, scramble, counter, reveal, typing, scaling, rotating]
        this.textAnimationList = TEXT_ANIMATIONS;
        // type, state, duration, easing
        this.attrType = `${this.attr}-type`;
        this.attrState = `${this.attr}-state`; // view, scroll, click, hover
        this.attrTime = `${this.attr}-time`; // 1, 2, 3 ... x 1000
        this.attrEase = `${this.attr}-ease`; // linear, BounceIn, ...
        this.styleAttr = `${this.attr}-style`;
        this.selector = {
            prop: {
                type: `${this.animAttr}-type`,
                state: `${this.animAttr}-state`,
                time: `${this.animAttr}-time`,
                delay: `${this.animAttr}-delay`,
                ease: `${this.animAttr}-ease`,
                loop: `${this.animAttr}-loop`,
                reversed: `${this.animAttr}-reversed`,
                repeatCount: `${this.animAttr}-repeatCount`,
                //group: `${this.animAttr}-group`,
                id: `${this.animAttr}-id`,
                screenpos: `${this.animAttr}-screenpos`,
                trigger: `${this.animAttr}-trigger`,
                options: {
                    translateX: `${this.animAttr}-translateX`,
                    translateY: `${this.animAttr}-translateY`,
                    opacity: `${this.animAttr}-opacity`,
                    color: `${this.animAttr}-color`,
                    inset: `${this.animAttr}-inset`,
                    position: `${this.animAttr}-position`,
                    top: `${this.animAttr}-top`,
                    bottom: `${this.animAttr}-bottom`,
                    left: `${this.animAttr}-left`,
                    right: `${this.animAttr}-right`,
                    backgroundColor: `${this.animAttr}-backgroundColor`,
                    rotate: `${this.animAttr}-rotate`,
                    scale: `${this.animAttr}-scale`,
                    scaleX: `${this.animAttr}-scaleX`,
                    scaleY: `${this.animAttr}-scaleY`,
                    rotateX: `${this.animAttr}-rotateX`,
                    rotateY: `${this.animAttr}-rotateY`,
                    rotateZ: `${this.animAttr}-rotateZ`,
                    width: `${this.animAttr}-width`,
                    height: `${this.animAttr}-height`,
                },
            },
        };

        // style element
        this.styles = [...document.querySelectorAll<HTMLStyleElement>(`[${this.styleAttr}]`)];
        // set animation
        this.elements = [...document.querySelectorAll<HTMLElement>(`[${this.attr}]`)];
        // listener
        this.listener(initate);
    }

    private listener(initiate: boolean = true) {
        if (!initiate) return;
        // direct element attribute animation rendering
        this.elements.forEach((ele) => this.setAnimation(ele));
        // stylesheet rendering
        this.styles.forEach((style) => {
            this.styleSheetRender(style);
        });
        // observer for new element and style sheet
        this.observeElementsAndStyles();
    }

    public styleSheetRender(style: HTMLStyleElement, check = false): void {
        if (check) {
            if (this.styles.includes(style)) return;
        }
        // style sheet workaround
        const animIds: string[] = [];
        let patterns: CurrentSettingFace[] = [];
        // read the anims special stylesheets
        const stylePaths = AnimsStyleConverter.fromFlatFormat(style.innerText);
        stylePaths.forEach((stylePath) => {
            const id = <string>stylePath.id;
            if (animIds.includes(id)) {
                patterns = patterns.filter((condition) => condition.id !== id);
                patterns.push(stylePath);
            } else {
                animIds.push(id);
                patterns.push(stylePath);
            }
        });

        //
        for (let index = 0; index < patterns.length; index++) {
            const pattern = patterns[index];
            const { type, animType, event, options, screenpos, trigger, id } = pattern;
            const mainAnim = type;
            const elements = document.querySelectorAll<HTMLElement>(`[${this.selector.prop.id}="${id}"]`);
            const animator =
                mainAnim === 'ui' && animType
                    ? window.afap.ui[animType]
                    : mainAnim === 'text'
                      ? window.afap.textAnimate
                      : window.afap.animate;

            for (let index = 0; index < elements.length; index++) {
                const element = elements[index];
                // skip element if found in elements with animating attributes
                if (this.elements.includes(element)) continue;
                interface riggedAnimateOptionsType extends SimpleAnimateOptionType {
                    type: string | undefined;
                }
                const animsOption: riggedAnimateOptionsType = {
                    ...options,
                    duration: options.duration * 1000,
                    delay: options.delay * 1000,
                    from: options.from || {},
                    to: options.to || {},
                    element,
                    trigger,
                    screenpos,
                    type: animType,
                };
                //if (mainAnim === 'scroll') window.afap.scroll(<ScrollAnimationOptions>animsOption);
                //else
                window.afap.event({
                    target: element,
                    type: event,
                    options: animsOption,
                    animator: mainAnim === 'scroll' ? window.afap.scroll : animator,
                    trigger: trigger,
                });
            }
        }
    }

    public setAnimation(element: HTMLElement, check = false): void {
        /**
         * Get the amination attribute from the element and trigger the animation
         */
        if (check) {
            if (this.elements.includes(element)) return;
        }
        const intKeys = [
            'opacity',
            //'translateX',
            //'translateY',
            'scaleX',
            'scaleY',
            'scale',
            'rotate',
            'rotateX',
            'rotateY',
            'rotateZ',
            //'perspective',
        ];
        const { time, type, delay, state, ease, loop, reversed, repeatCount, options, id, screenpos, trigger } =
            this.selector.prop;
        const animVarable = element.getAttributeNames();
        const mainAnim = <AnimationType>element.getAttribute(this.animAttr);
        const animType = animVarable.indexOf(type) >= 0 ? <string>element.getAttribute(type) : undefined;
        const duration = parseFloat(<string>element.getAttribute(time)) * 1000 || 1000;
        const delays = parseFloat(<string>element.getAttribute(delay)) * 1000 || 0;
        const event = element.getAttribute(state) || 'view';
        const easing = element.getAttribute(ease) || 'linear';
        const isLoop =
            (animVarable.indexOf(loop) >= 0 ? element.getAttribute(loop) : 'false') === 'true' ? true : false;
        const isReversed =
            (animVarable.indexOf(reversed) >= 0 ? element.getAttribute(reversed) : 'false') === 'true' ? true : false;
        const count = parseFloat(<string>element.getAttribute(repeatCount));
        const screenPosValue = <string>element.getAttribute(screenpos);
        const triggerValue = <string>element.getAttribute(trigger);
        const idValue = <string>element.getAttribute(id);
        //const groupType = element.getAttribute(group);
        const from: { [key: string]: number | string | undefined | boolean } = {};
        const to: { [key: string]: number | string | undefined | boolean } = {};
        const opt: any = {};

        for (const key in options) {
            if (Object.prototype.hasOwnProperty.call(options, key)) {
                const propKey = key as CSS_PROPERTIES_TYPE;
                const propAttr = options[propKey].toLowerCase();
                if (animVarable.indexOf(propAttr) >= 0) {
                    const value = <string>element.getAttribute(propAttr);
                    const [defaultFrom, defaultTo] = value.split('|');
                    if (defaultFrom) {
                        if (intKeys.indexOf(propKey) >= 0) from[key] = parseFloat(defaultFrom);
                        else from[key] = defaultFrom;
                    }
                    if (defaultTo) {
                        if (intKeys.indexOf(propKey) >= 0) to[key] = parseFloat(defaultTo);
                        else to[key] = defaultTo;
                    }
                }
            }
        }

        opt.element = element;
        opt.duration = duration;
        opt.delay = delays;
        opt.easing = easing;
        opt.from = from;
        opt.to = to;
        animType ? (opt.type = animType) : undefined;
        isLoop ? (opt.loop = isLoop) : undefined;
        isReversed ? (opt.reversed = isReversed) : undefined;
        count ? (opt.repeatCount = count) : undefined;
        screenPosValue ? (opt.screenpos = screenPosValue) : undefined;
        triggerValue ? (opt.trigger = triggerValue) : undefined;
        idValue ? (opt.id = idValue) : undefined;

        if (mainAnim === 'ui' && animType && window.afap.ui) {
            delete opt.from;
            delete opt.to;
            const animateType = animType as UIAnimationType;
            const animator = window.afap.ui[animateType];

            window.afap.event({
                target: element,
                type: event as AnimationEventType,
                options: opt as EventAnimationOptionType,
                animator: animator,
                trigger: triggerValue,
            });
        } else if (mainAnim === 'text') {
            delete opt.from;
            delete opt.to;
            const animator = window.afap.textAnimate;
            window.afap.event({
                target: element,
                type: event as AnimationEventType,
                options: opt as EventAnimationOptionType,
                animator: animator,
                trigger: triggerValue,
            });
        } else if (mainAnim === 'custom') {
            const animator = window.afap.animate;
            window.afap.event({
                target: element,
                type: event as AnimationEventType,
                options: opt as EventAnimationOptionType,
                animator: animator,
                trigger: triggerValue,
            });
        } else if (mainAnim === 'scroll') {
            const animator = window.afap.scroll;
            animator(opt);
        }
    }

    private observeElementsAndStyles() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node instanceof HTMLElement && node.hasAttribute(this.attr)) {
                            this.setAnimation(node, true);
                        }
                        if (node instanceof HTMLStyleElement && node.hasAttribute(this.styleAttr)) {
                            this.styleSheetRender(node, true);
                        }
                        // what a situation where by the element or style is inside the children of the node
                        if (node instanceof HTMLElement) {
                            const childElements = node.querySelectorAll<HTMLElement>(`[${this.attr}]`);
                            childElements.forEach((childElement) => {
                                this.setAnimation(childElement, true);
                            });
                            const childStyles = node.querySelectorAll<HTMLStyleElement>(`[${this.styleAttr}]`);
                            childStyles.forEach((childStyle) => {
                                this.styleSheetRender(childStyle, true);
                            });
                        }
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    }
}

export function afapAttribute(option: boolean = true) {
    return new Attributes(option);
}

window.AfapAttributes = Attributes;
// <I WANT TO BE COMPILED>
