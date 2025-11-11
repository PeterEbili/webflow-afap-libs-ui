export const webflow = window.webflow || [];

export class AppExtras {
    private readonly attr: string;
    private readonly appAttr: string;
    private readonly selector;
    private readonly container: divType;
    //private readonly properties: {
    //    [key: string]: { value: string; type: 'text' | 'number' | 'select' };
    //};
    private selectedEleProperty: { name: string; value: string }[] = [];
    private selectedElementId: string = '';
    private inputs: { [key: string]: inputType | selectType } = {};
    private readonly compSelect: selectType;
    private readonly compApplyButton;
    private readonly compReloadButton;
    private components: { name: string; id: string }[] = [];
    private readonly detect: inputType;
    private readonly detectIntervalInput: inputType;
    private readonly detectApplyBtn;
    private readonly detectLabel: divType;
    private detectInterval: number | null = null;
    private attributeHeads: {
        [key: string]: {
            wf: string;
            app: string;
            attrType: boolean;
            tab: string;
            mainProp?: string;
            prop: { [key: string]: { type: 'select' | 'text' | 'checkbox' | 'number'; attr?: string } };
        };
    };
    constructor() {
        this.attr = 'af-extra';
        this.appAttr = `${this.attr}-app`;
        this.selector = {
            app: {
                container: `[${this.appAttr}="container"]`,
                components: `[${this.appAttr}="components"]`,
                componentApply: `[${this.appAttr}="component-apply"]`,
                componentReload: `[${this.appAttr}="component-reload"]`,
                detect: `[${this.appAttr}="detect"]`,
                detectApply: `[${this.appAttr}="detect-apply"]`,
                detectInterval: `[${this.appAttr}="detect-interval"]`,
                detectLabel: `[${this.appAttr}="detect-label"]`,
            },
        };

        // elements
        this.container = document.querySelector(this.selector.app.container) as divType;
        this.compSelect = <selectType>this.container.querySelector(this.selector.app.components);
        this.compApplyButton = this.container.querySelector<btnType>(this.selector.app.componentApply);
        this.compReloadButton = this.container.querySelector<btnType>(this.selector.app.componentReload);
        this.detect = <inputType>document.querySelector(this.selector.app.detect);
        this.detectApplyBtn = document.querySelector<btnType>(this.selector.app.detectApply);
        this.detect.checked = true;
        this.detectIntervalInput = <inputType>document.querySelector(this.selector.app.detectInterval);
        this.detectIntervalInput.value = '500';
        this.detectLabel = document.querySelector(this.selector.app.detectLabel)!;
        this.detectLabel.textContent = `Detecting every selected webflow element in ${this.detectIntervalInput.value}ms`;
        // detectable extentions head attributes and props
        this.attributeHeads = {
            anims: {
                wf: 'af-anims',
                app: 'anim-app',
                attrType: false,
                tab: 'tab2',
                mainProp: 'types',
                prop: {
                    type: { type: 'select', attr: 'sub-types' },
                    state: { type: 'select', attr: 'events' },
                    time: { type: 'number', attr: 'duration' },
                    ease: { type: 'select' },
                    loop: { type: 'checkbox' },
                    delay: { type: 'number' },
                    reversed: { type: 'checkbox', attr: 'reverse' },
                    repeatCount: { type: 'number', attr: 'repeat-count' },
                    id: { type: 'text' },
                    screenpos: { type: 'select' },
                    trigger: { type: 'text' },
                },
            },
            move: {
                wf: 'af-move',
                app: 'af-move-app',
                attrType: true,
                tab: 'tab11',
                prop: {
                    type: { type: 'select' },
                    duration: { type: 'number' },
                    easing: { type: 'select' },
                    absolute: { type: 'checkbox' },
                    opacity: { type: 'checkbox' },
                    preservescroll: { type: 'checkbox' },
                    nested: { type: 'checkbox' },
                    stagger: { type: 'number' },
                    delay: { type: 'number' },
                    reverse: { type: 'checkbox' },
                    loop: { type: 'text' },
                    state: { type: 'select' },
                    targets: { type: 'text' },
                    classname: { type: 'text' },
                    viewrange: { type: 'text' },
                    id: { type: 'text' },
                },
            },
            motion: {
                wf: 'af-motion',
                app: 'af-motion-app',
                attrType: false,
                tab: 'tab6',
                prop: {
                    gravity: { type: 'number' },
                    timeScale: { type: 'number', attr: 'time-scale' },
                    type: { type: 'select' },
                    draggable: { type: 'checkbox', attr: `drag` },
                    float: { type: 'checkbox' },
                    fixed: { type: 'checkbox' },
                    mass: { type: 'number' },
                    friction: { type: 'number' },
                    restitution: { type: 'number' },
                    shape: { type: 'select' },
                    velocityX: { type: 'number', attr: `velocity-x` },
                    velocityY: { type: 'number', attr: `velocity-y` },
                    radius: { type: 'number' },
                },
            },
            preload: {
                wf: 'af-preload',
                app: 'af-preload-app',
                attrType: true,
                tab: 'tab8',
                prop: {
                    type: { type: 'select', attr: 'preload-list' },
                    timeout: { type: 'text' },
                    bgcolor: { type: 'text' },
                    color: { type: 'text' },
                    height: { type: 'text' },
                    width: { type: 'text' },
                    speed: { type: 'number' },
                    radius: { type: 'number' },
                    stroke: { type: 'number' },
                    duration: { type: 'number' },
                    size: { type: 'number' },
                    thickness: { type: 'number' },
                    count: { type: 'number' },
                    length: { type: 'number' },
                    amplitude: { type: 'number' },
                    text: { type: 'text' },
                    words: { type: 'text' },
                    thick: { type: 'text' },
                    interval: { type: 'number' },
                    xcount: { type: 'number' },
                    ycount: { type: 'number' },
                    ygap: { type: 'number' },
                    xgap: { type: 'number' },
                    tcolor: { type: 'text' },
                    pcolor: { type: 'text' },
                    induration: { type: 'number' },
                    outduration: { type: 'number' },
                    customs: { type: 'text' },
                    direction: { type: 'select' },
                    loop: { type: 'checkbox' },
                    istrail: { type: 'checkbox' },
                    loadingtext: { type: 'checkbox' },
                },
            },
            slider: {
                wf: 'af-slider',
                app: 'af-slider-app',
                attrType: false,
                tab: 'tab3',
                prop: {
                    delay: { type: 'number' },
                    duration: { type: 'number' },
                    //easing: { type: 'select' },
                    slideinview: { type: 'number' },
                    autoslide: { type: 'checkbox' },
                    loop: { type: 'checkbox' },
                },
            },
            svg: {
                wf: 'af-svg',
                app: 'af-svg-app',
                attrType: true,
                tab: 'tab10',
                prop: {
                    type: { type: 'select', attr: 'list' },
                    speed: { type: 'number' },
                    color: { type: 'text' },
                    intensity: { type: 'number' },
                    strength: { type: 'number' },
                    density: { type: 'number' },
                    opacity: { type: 'number' },
                    count: { type: 'number' },
                    width: { type: 'number' },
                    jitter: { type: 'number' },
                    length: { type: 'number' },
                    fspeed: { type: 'number' },
                    progress: { type: 'number' },
                    min: { type: 'number' },
                    max: { type: 'number' },
                    start: { type: 'number' },
                    amplitude: { type: 'number' },
                    frequency: { type: 'number' },
                    amount: { type: 'number' },
                    fadespeed: { type: 'number' },
                    size: { type: 'number' },
                    x: { type: 'number' },
                    y: { type: 'number' },
                    state: { type: 'select' },
                },
            },
            three: {
                wf: 'af-three',
                app: 'af-three-app',
                attrType: true,
                tab: 'tab9',
                prop: {
                    type: { type: 'select', attr: 'list' },
                    speed: { type: 'number' },
                    depth: { type: 'number' },
                    direction: { type: 'select' },
                    easing: { type: 'select' },
                    interaction: { type: 'select' },
                    shards: { type: 'number' },
                    spread: { type: 'number' },
                    colors: { type: 'text' },
                    amount: { type: 'number' },
                    intensity: { type: 'number' },
                    size: { type: 'number' },
                    rows: { type: 'number' },
                    cols: { type: 'number' },
                    scatter: { type: 'number' },
                    duration: { type: 'number' },
                    strength: { type: 'number' },
                    radius: { type: 'number' },
                    distortion: { type: 'number' },
                    fintensity: { type: 'number' },
                    amplitude: { type: 'number' },
                    frequency: { type: 'number' },
                    color1: { type: 'text' },
                    color2: { type: 'text' },
                    color3: { type: 'text' },
                    range: { type: 'number' },
                    count: { type: 'number' },
                },
            },
            transit: {
                wf: 'af-transit',
                app: 'af-transit-app',
                attrType: false,
                tab: 'tab7',
                prop: {
                    duration: { type: 'number' },
                    easing: { type: 'select' },
                    leave: { type: 'select' },
                    enter: { type: 'select' },
                    leavefunc: { type: 'text' },
                    enterfunc: { type: 'text' },
                },
            },
        };

        // initialize
        this.init();
    }

    private init() {
        // event listeners and extras initialization
        const noElement = 'Select an element';
        this.compApplyButton?.addEventListener('click', async () => {
            // apply to webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert(noElement);

            // Get Component
            const components = await webflow.getAllComponents();
            //const firstComponent = allComponents[0];
            for (const component in components) {
                const { id } = components[component];
                if (id === this.compSelect.value) {
                    // Add Component instance onto a page
                    await swe?.before(components[component]);
                    this.btnTextFlip(this.compApplyButton!, 'Applied!!!');
                    break;
                }
            }
        });

        this.compReloadButton?.addEventListener('click', async () => {
            this.btnTextFlip(this.compReloadButton!, 'Reloading!!!', 2000, 'Reload');
            await this.loadComponent();
            this.btnTextFlip(this.compReloadButton!, 'Reloaded!!!', 2000, 'Reload');
        });

        this.detect?.addEventListener('change', () => {
            //
            if (!this.detect.checked) {
                if (this.detectInterval) {
                    clearInterval(this.detectInterval);
                    this.detectInterval = null;
                }
                this.selectedElementId = '';
                this.selectedEleProperty = [];
            } else {
                this.getCustomAttributes();
            }
        });

        this.detectApplyBtn?.addEventListener('click', () => {
            //
            if (!this.detect.checked) return;
            if (!this.selectedEleProperty.length) return;
            for (const prop of this.selectedEleProperty) {
                const attrHeads = Object.keys(this.attributeHeads);
                for (const mainAttr of attrHeads) {
                    if (!prop.name.includes(mainAttr)) continue;
                    // actual attribute in use.
                    const attribute = this.attributeHeads[mainAttr];
                    const { wf, app } = attribute;

                    // click the actual tab.
                    const tabButton = document.querySelector<btnType>(`[data-tab="${attribute.tab}"]`);
                    if (tabButton) tabButton.click();

                    const name = prop.name.replace(wf + '-', '');
                    const attrField = attribute.prop[name];
                    if (attrField) {
                        const field = <inputType | selectType>(
                            (document.querySelector(`[${app}="${name}"]`) ||
                                document.querySelector(`[${app}="${attrField?.attr}"]`))
                        );
                        if (!field) break;
                        if (attrField.type === 'checkbox')
                            (<inputType>field).checked = prop.value === 'true' ? true : false;
                        else if (attrField.type === 'select') {
                            const sel = <selectType>field;
                            const options = Array.from(<HTMLOptionsCollection>sel.children || []);
                            for (const opt of options) {
                                if (
                                    opt.textContent.toLowerCase() === prop.value.toLowerCase() ||
                                    opt.value.toLowerCase() === prop.value.toLowerCase()
                                ) {
                                    opt.selected = true;
                                    sel.dispatchEvent(new Event('change'));
                                    break;
                                }
                            }
                        } else field.value = prop.value;

                        if (name === 'repeatCount' && mainAttr === 'anims') {
                            const input = <inputType>document.querySelector(`[${app}="repeat"]`);
                            //if (input) input.checked = prop.value === '0' ? false : true;
                            //input?.dispatchEvent(new Event('click'));
                            if (input) {
                                if (input.checked && prop.value === '0') {
                                    input.click();
                                } else if (!input.checked && prop.value !== '0') {
                                    input.click();
                                }
                            }
                            field.value = prop.value;
                        }
                    } else if (prop.name === wf && attribute.attrType) {
                        //
                        const typeField = attribute.prop?.type;
                        if (!typeField) break;
                        const field = <selectType>(
                            (document.querySelector(`[${app}="type"]`) ||
                                document.querySelector(`[${app}="${typeField.attr}"]`))
                        );
                        if (!field) break;
                        const options = Array.from(<HTMLOptionsCollection>field.children || []);
                        for (const opt of options) {
                            if (
                                opt.textContent.toLowerCase() === prop.value.toLowerCase() ||
                                opt.value.toLowerCase() === prop.value.toLowerCase()
                            ) {
                                opt.selected = true;
                                field.dispatchEvent(new Event('change'));
                                break;
                            }
                        }
                    } else if (prop.name === wf && attribute.mainProp) {
                        const field = <selectType>document.querySelector(`[${app}="${attribute.mainProp}"]`);
                        if (!field) break;
                        const options = Array.from(<HTMLOptionsCollection>field.children || []);
                        for (const opt of options) {
                            if (
                                opt.textContent.toLowerCase() === prop.value.toLowerCase() ||
                                opt.value.toLowerCase() === prop.value.toLowerCase()
                            ) {
                                opt.selected = true;
                                field.dispatchEvent(new Event('change'));
                                break;
                            }
                        }
                    }
                    break;
                }
            }
            //
            this.btnTextFlip(this.detectApplyBtn!, 'Applied!!!');
        });

        // load components
        try {
            Object.keys(webflow).length ? this.loadComponent() : undefined;
        } catch (error) {
            console.warn('Webflow not found');
        }

        // start detecting
        if (this.detect.checked && Object.keys(webflow).length) this.getCustomAttributes();
    }

    private getCustomAttributes() {
        this.detectInterval = window.setInterval(async () => {
            // Get Selected Element
            const selectedElement = await webflow.getSelectedElement();
            if (!selectedElement) return;
            if (selectedElement?.customAttributes) {
                // Get All Custom Attributes
                const customAttributes = await selectedElement.getAllCustomAttributes();
                if (customAttributes?.length) {
                    // reset main attribute to the top of the list
                    const attrHeads = Object.keys(this.attributeHeads);
                    for (const mainAttr of attrHeads) {
                        const attribute = this.attributeHeads[mainAttr];
                        for (const attr of customAttributes) {
                            if (attr.name === attribute.wf) {
                                // actual attribute in use.
                                this.detectLabel.textContent = `Detected ${attribute.wf} on selected element`;
                                // remove it from the list and add to the top
                                const index = customAttributes.indexOf(attr);
                                if (index > -1) {
                                    customAttributes.splice(index, 1);
                                    customAttributes.unshift(attr);
                                }
                                break;
                            }
                            if (attr.name.includes(mainAttr)) {
                                this.detectLabel.textContent = `Detected ${attribute.wf} on selected element`;
                            }
                        }
                    }
                    // only update if different element is selected
                    this.selectedEleProperty = customAttributes;
                    this.selectedElementId = selectedElement.id.element;
                } else {
                    this.detectLabel.textContent = `No detectable attributes on selected element.`;
                }
            }
        }, this.detectIntervalInput.valueAsNumber || 500);
    }

    private async loadComponent() {
        // clear previous components
        const options = Array.from(<HTMLOptionsCollection>this.compSelect.children || []);
        for (const opt of options) {
            opt.value ? opt.remove() : null;
        }

        const newComps: { text: string; value: string }[] = [];
        // Get all components
        const components = (await webflow.getAllComponents()) || [];

        for (const component in components) {
            const name = await components[component].getName();
            const { id } = components[component];
            newComps.push({ text: name, value: id });
        }

        this.loadOnSelectElement(this.compSelect, newComps);
    }

    private loadOnSelectElement(element: selectType, list: { text: string; value: string }[]) {
        list.forEach((t, index) => {
            const option = document.createElement('option');
            const { value, text } = t;
            option.value = value;
            option.text = text;
            if (!index) {
                option.defaultSelected = true;
            }
            // add to type Selection
            element.add(option);
        });
    }

    btnTextFlip = (btn: btnType, text: string, duration: number = 2000, oText = '') => {
        if (!btn) return;
        const originalText = btn.textContent;
        btn.textContent = text;
        setTimeout(() => {
            btn.textContent = oText ? oText : originalText;
        }, duration);
    };
}
