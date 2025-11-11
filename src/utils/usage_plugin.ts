/**
 * Animation usage plugin for site examples.
 */
import Attributes from './attributes';
import { AnimationMemberList } from './usage_extras';

export default class UsagePlugin {
    private readonly attr: string;
    private readonly animAttr: string;
    private readonly animationMembers;
    private readonly textContainer;
    private readonly uiContainer;
    private readonly eventContainer;
    private readonly cardTemplate;
    private readonly selector;
    private readonly attribute;
    constructor() {
        this.attr = `anim-sample`;
        this.animAttr = `af-anims`;
        this.selector = {
            card: `[${this.attr}="card"]`,
            title: `[${this.attr}="title"]`,
            desc: `[${this.attr}="desc"]`,
            box: `[${this.attr}="box"]`,
            text: `[${this.attr}="text"]`,
            ui: `[${this.attr}="ui"]`,
            event: `[${this.attr}="event"]`,
            prop: {
                type: `${this.animAttr}-type`,
                state: `${this.animAttr}-state`,
                time: `${this.animAttr}-time`,
                ease: `${this.animAttr}-ease`,
                animate: {
                    x: `${this.animAttr}-x`,
                    y: `${this.animAttr}-y`,
                    opacity: `${this.animAttr}-opacity`,
                    color: `${this.animAttr}-color`,
                    inset: `${this.animAttr}-inset`,
                    position: `${this.animAttr}-pos`,
                    top: `${this.animAttr}-top`,
                    bottom: `${this.animAttr}-bottom`,
                    left: `${this.animAttr}-left`,
                    right: `${this.animAttr}-right`,
                    bg: `${this.animAttr}-bg`,
                    rotate: `${this.animAttr}-rotate`,
                    scale: `${this.animAttr}-scale`,
                    scaleX: `${this.animAttr}-scaleX`,
                    scaleY: `${this.animAttr}-scaleY`,
                    rotateX: `${this.animAttr}-rotateX`,
                    rotateY: `${this.animAttr}-rotateY`,
                    rotateZ: `${this.animAttr}-rotateZ`,
                },
            },
        };
        // set attribute
        this.attribute = new Attributes(false);

        this.cardTemplate = <HTMLElement>document.querySelector(this.selector.card);
        this.cardTemplate.remove();

        // text container
        this.textContainer = <HTMLElement>document.querySelector(this.selector.text);
        // UI container
        this.uiContainer = <HTMLElement>document.querySelector(this.selector.ui);
        // Event Container
        this.eventContainer = <HTMLElement>document.querySelector(this.selector.event);

        this.animationMembers = AnimationMemberList;
        this.render();
    }

    private render() {
        for (let index = 0; index < this.animationMembers.length; index++) {
            const item = this.animationMembers[index];
            const element = this.cardTemplate.cloneNode(true) as HTMLElement;
            // title
            const title = element.querySelector(this.selector.title) as HTMLElement;
            if (title) title.textContent = item.name + ' | on' + item.state.toUpperCase();

            if (item.type === 'text') {
                this.textContainer.appendChild(element);

                // description
                const description = element.querySelector(this.selector.desc) as HTMLElement;
                if (description && item.description) description.innerHTML = item.description;
                if (!item.animate) {
                    description.setAttribute(this.animAttr, item.type);
                    description.setAttribute(this.selector.prop.type, item.whatType ?? '');
                    if (item.whatType === 'typing') description.setAttribute(this.selector.prop.time, '2');
                }

                const mainBox = element.querySelector(this.selector.box) as HTMLElement;
                mainBox?.remove();

                // set animation call
                this.attribute.setAnimation(description);
            } else if (item.type === 'ui') {
                this.uiContainer.appendChild(element);

                // remove description
                const description = element.querySelector(this.selector.desc) as HTMLElement;
                if (description) description.remove();

                // box settings
                const mainBox = element.querySelector(this.selector.box) as HTMLElement;
                if (item.boxCount) {
                    for (let index = 0; index < item.boxCount; index++) {
                        const box = document.createElement('div');
                        mainBox.appendChild(box);
                        box.classList.add('box');
                        box.textContent = item.name + ' box';
                        // set props
                        box.setAttribute(this.animAttr, item.type);
                        box.setAttribute(this.selector.prop.type, item.whatType ?? '');
                        box.setAttribute(this.selector.prop.time, '2');
                        box.setAttribute(this.selector.prop.state, item.state);
                        // set animation call
                        this.attribute.setAnimation(box);
                    }
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new UsagePlugin();
});

// <I WANT TO BE COMPILED>
