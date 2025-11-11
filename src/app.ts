/**
 * Animation app controller UI
 */
// <I WANT TO BE COMPILED>
// Currently outdated. Use the simple-animation/src/index.ts for the updated version
import { UI_ANIMATIONS, TEXT_ANIMATIONS, EASING_FUNCTIONS, CSS_PROPERTIES } from './utils/constants';
import { PatternableWfApp } from './custom-patternable';
import { MotionableWfApp } from './motionable';
import { PreloaderWfApp } from './preloader';
import { TransitionWfApp } from './transition';
import { FlipWfApp } from './flip';
import { SVGWfApp } from './svg';
import { ThreeJsWfApp } from './threejs';
import { SliderApp } from './slider';
import { AppExtras } from './extras';

const webflow = window.webflow || [];

class App {
    private readonly container;
    private readonly durationInput;
    private readonly delayInput: inputType;
    private readonly easeSelect;
    private readonly typeSelect; // ui | text | custom
    private readonly subTypeSelect;
    private readonly subTypeContainer: divType;
    //private readonly configTypeSelect; //simple | complex. simple: translateX="20|0" , opacity="0|1" | short: x:20|0;opc:0|1;
    private readonly eventSelect; // view | hover | click | scroll
    private readonly reverseCheckBox;
    private readonly loopCheckBox;
    private readonly repeatInput;
    private readonly repeatCheckBox;
    //private readonly groupCheckBox;
    //private readonly groupSelect: selectType;
    private readonly screenposSelect: selectType; // top | bottom | left | right | center
    // also take note that target id is known to be render id
    private readonly triggerInput: inputType; // trigger element id
    private readonly triggerApply: btnType | null; // apply trigger element id
    private readonly triggerCreate: btnType | null; // create trigger element id
    private readonly triggerRemove: btnType | null; // remove trigger element id
    // element id
    private readonly idInput: inputType; // id of the element to apply animation
    private readonly idCreate: btnType | null; // create id for the element
    private readonly idApply: btnType | null; // apply id to element
    private readonly idRemove: btnType | null; // remove id to element
    private readonly propertySelect: selectType;
    private readonly propertyWrap;
    private readonly propertyItem;
    private readonly propertyAddBtn: btnType;
    private readonly propContainer: divType;
    private readonly selector;
    private readonly sampleAttr;
    private readonly animAttr;
    private readonly attr;
    private playground: divType;
    private readonly playgroundCheckBox;
    private readonly playgroundSample;
    private readonly resetBtn: btnType;
    private readonly applyBtn: btnType;
    private readonly removeBtn: btnType;
    private readonly eventList;
    private readonly typeList;
    private readonly subTypeList;
    //private readonly groupList;
    private readonly screenposList: string[];
    private readonly propertyList: string[];
    private readonly easeList: string[];
    //private readonly configList: string[];
    public current: CurrentSettingFace;
    private readonly premiumKeyInput: inputType;
    private readonly premiumKeyStatusLabel: divType;
    private readonly moreOptionsWrap: divType;
    constructor() {
        this.sampleAttr = `anim-sample`;
        this.animAttr = `af-anims`;
        this.attr = `anim-app`;
        this.selector = {
            card: `[${this.sampleAttr}="card"]`,
            title: `[${this.sampleAttr}="title"]`,
            desc: `[${this.sampleAttr}="desc"]`,
            box: `[${this.sampleAttr}="box"]`,
            text: `[${this.sampleAttr}="text"]`,
            ui: `[${this.sampleAttr}="ui"]`,
            prop: {
                type: `${this.animAttr}-type`,
                state: `${this.animAttr}-state`,
                time: `${this.animAttr}-time`,
                ease: `${this.animAttr}-ease`,
                loop: `${this.animAttr}-loop`,
                delay: `${this.animAttr}-delay`,
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
            app: {
                premiumKeyInput: `[${this.attr}="premium-key"]`,
                premiumKeyStatus: `[${this.attr}="premium-status"]`,
                premiumKeyPremiumious: `[anim-app-premiumios]`, // attach to all input element you want to the value to have afapkey=key by replacing .js in the value with .js?afapkey=key
                container: `[${this.attr}="container"]`,
                playground: `[${this.attr}="playground"]`,
                playgroundCheck: `[${this.attr}="playground-check"]`,
                removeBtn: `[${this.attr}="remove"]`,
                resetBtn: `[${this.attr}="reset"]`,
                applyBtn: `[${this.attr}="apply"]`,
                //configType: `[${this.attr}="config-type"]`,
                types: `[${this.attr}="types"]`,
                subTypes: `[${this.attr}="sub-types"]`,
                subTypeContainer: `[${this.attr}="sub-types-container"]`,
                duration: `[${this.attr}="duration"]`,
                delay: `[${this.attr}="delay"]`,
                events: `[${this.attr}="events"]`,
                ease: `[${this.attr}="ease"]`,
                reverse: `[${this.attr}="reverse"]`,
                loop: `[${this.attr}="loop"]`,
                repeat: `[${this.attr}="repeat"]`,
                repeatInput: `[${this.attr}="repeat-count"]`,
                //group: `[${this.attr}="group"]`,
                //groupSelect: `[${this.attr}="group-select"]`,
                id: `[${this.attr}="id"]`,
                idCreate: `[${this.attr}="id-create"]`,
                idApply: `[${this.attr}="id-apply"]`,
                idRemove: `[${this.attr}="id-remove"]`,
                screenpos: `[${this.attr}="screenpos"]`,
                trigger: `[${this.attr}="trigger"]`,
                triggerApply: `[${this.attr}="trigger-apply"]`,
                triggerCreate: `[${this.attr}="trigger-create"]`,
                triggerRemove: `[${this.attr}="trigger-remove"]`,
                propSelect: `[${this.attr}="prop-select"]`,
                propItem: `[${this.attr}="prop-item"]`,
                propItemName: `[${this.attr}="prop-item-name"]`,
                propItemFrom: `[${this.attr}="prop-item-from"]`,
                propItemTo: `[${this.attr}="prop-item-to"]`,
                propItemDelete: `[${this.attr}="prop-item-delete"]`,
                propWrap: `[${this.attr}="prop-wrap"]`,
                propContainer: `[${this.attr}="prop-container"]`,
                propAdd: `[${this.attr}="prop-add"]`,
                moreOptionsWrap: `[${this.attr}="more-options-wrap"]`,
            },
        };
        this.current = {
            type: 'custom', // text | ui | custom | scroll
            event: 'view',
            options: {
                delay: 0,
                duration: 2,
                easing: 'linear',
            },
            currentPropertyList: [],
            selectedProperty: {},
        };

        // elements init.
        this.premiumKeyInput = <inputType>document.querySelector(this.selector.app.premiumKeyInput);
        this.premiumKeyStatusLabel = <divType>document.querySelector(this.selector.app.premiumKeyStatus);
        this.container = <divType>document.querySelector(this.selector.app.container);
        //this.configTypeSelect = <selectType>this.container.querySelector(this.selector.app.configType);
        this.typeSelect = <selectType>this.container.querySelector(this.selector.app.types);
        // sub type
        this.subTypeContainer = <divType>this.container.querySelector(this.selector.app.subTypeContainer);
        this.subTypeSelect = <selectType>this.container.querySelector(this.selector.app.subTypes);

        this.eventSelect = <selectType>this.container.querySelector(this.selector.app.events);
        this.durationInput = <inputType>this.container.querySelector(this.selector.app.duration);
        this.delayInput = <inputType>this.container.querySelector(this.selector.app.delay);
        this.easeSelect = <selectType>this.container.querySelector(this.selector.app.ease);
        this.repeatCheckBox = <inputType>this.container.querySelector(this.selector.app.repeat);
        this.reverseCheckBox = <inputType>this.container.querySelector(this.selector.app.reverse);
        this.repeatInput = <inputType>this.container.querySelector(this.selector.app.repeatInput);
        this.loopCheckBox = <inputType>this.container.querySelector(this.selector.app.loop);
        //this.groupSelect = <selectType>this.container.querySelector(this.selector.app.groupSelect);
        //this.groupCheckBox = <inputType>this.container.querySelector(this.selector.app.group);
        this.idInput = <inputType>this.container.querySelector(this.selector.app.id);
        this.idCreate = this.container.querySelector<btnType>(this.selector.app.idCreate);
        this.idApply = this.container.querySelector<btnType>(this.selector.app.idApply);
        this.idRemove = this.container.querySelector<btnType>(this.selector.app.idRemove);
        this.screenposSelect = <selectType>this.container.querySelector(this.selector.app.screenpos);
        this.triggerInput = <inputType>this.container.querySelector(this.selector.app.trigger);
        this.triggerApply = this.container.querySelector<btnType>(this.selector.app.triggerApply);
        this.triggerCreate = this.container.querySelector<btnType>(this.selector.app.triggerCreate);
        this.triggerRemove = this.container.querySelector<btnType>(this.selector.app.triggerRemove);
        // property
        this.propContainer = <divType>this.container.querySelector(this.selector.app.propContainer);
        this.propertyAddBtn = <btnType>this.container.querySelector(this.selector.app.propAdd);
        this.propertySelect = <selectType>this.container.querySelector(this.selector.app.propSelect);
        this.propertyWrap = <divType>this.container.querySelector(this.selector.app.propWrap);
        this.propertyItem = <divType>this.container.querySelector(this.selector.app.propItem);
        this.propertyItem.remove();
        /** visualized area for testing animation */
        this.playground = <divType>this.container.querySelector(this.selector.app.playground);
        this.playgroundCheckBox = <inputType>this.container.querySelector(this.selector.app.playgroundCheck);
        this.playgroundSample = <divType>this.playground.cloneNode(true);
        this.applyBtn = <btnType>this.container.querySelector(this.selector.app.applyBtn);
        this.resetBtn = <btnType>this.container.querySelector(this.selector.app.resetBtn);
        this.removeBtn = <btnType>this.container.querySelector(this.selector.app.removeBtn);
        // more options wrappers
        this.moreOptionsWrap = <divType>this.container.querySelector(this.selector.app.moreOptionsWrap);
        // list
        this.eventList = ['view', 'hover', 'click']; //, 'scroll'];
        this.typeList = ['text', 'ui', 'custom', 'scroll'];
        this.subTypeList = { ui: UI_ANIMATIONS, text: TEXT_ANIMATIONS };
        //this.groupList = <string[]>[];
        this.screenposList = ['none', 'top', 'bottom', 'middle'];
        this.propertyList = CSS_PROPERTIES;
        this.easeList = EASING_FUNCTIONS;
        //this.configList = ['simple', 'short'];

        // playground default setting
        this.playground.hidden = true;
        // load app options
        this.load();
        // reset app options
        this.resetActivity();
        // load premiums
        this.loadPremiums({ reset: false });
        // event listeners
        this.listener();
    }

    private load() {
        // load group
        /* const letters = Array.from('abcdefghijklmnopqrstuvwxyz');
        for (let index = 0; index < letters.length; index++) {
            const letter = letters[index];
            for (let i = 0; i < 10; i++) {
                this.groupList.push(letter + String(i));
            }
        }
        this.loadOnSelectElement(this.groupSelect, this.groupList); */
        // load config
        //this.loadOnSelectElement(this.configTypeSelect, this.configList);
        // load ease
        this.loadOnSelectElement(this.easeSelect, this.easeList);
        // load event
        this.loadOnSelectElement(this.eventSelect, this.eventList);
        // load properties
        this.loadOnSelectElement(this.propertySelect, this.propertyList);
        // load screen position
        this.loadOnSelectElement(this.screenposSelect, this.screenposList);
    }

    private loadOnSelectElement(element: selectType, list: string[]) {
        list.forEach((t, index) => {
            const option = document.createElement('option');
            option.value = t;
            option.text = t;
            if (!index) {
                option.defaultSelected = true;
            }
            // add to type Selection
            element.add(option);
        });
    }

    private listener() {
        this.typeSelect.addEventListener('change', () => {
            const value = this.typeSelect.value as AnimationType;
            if (value === this.current.type) return;
            this.current.type = value;
            // update the sub types
            this.current.animType = '';
            [...this.subTypeSelect.children].forEach((e) => e.remove());
            if (value === 'ui' || value === 'text') {
                this.loadOnSelectElement(this.subTypeSelect, this.subTypeList[value]);
                // show sub animation type selection and container
                this.subTypeContainer.hidden = false;
                this.current.animType = this.subTypeSelect.value;
                //this.hidden(this.groupCheckBox);
                //this.groupCheckBox.hidden = true;
                //this.groupSelect.hidden = true;
                //this.current.groupState = false;
                // show repeat, loop, reverse checkboxes, repeat count input
                this.moreOptionsWrap.hidden = false;
                // hide prop container
                this.propContainer.hidden = true;
            } else {
                // hide sub animation type selection and container
                this.subTypeContainer.hidden = true;
                // show prop container
                this.propContainer.hidden = false;
                if (value === 'scroll') {
                    //this.hidden(this.groupCheckBox);
                    //this.groupCheckBox.hidden = true;
                    //this.groupSelect.hidden = true;
                    //this.current.groupState = false;
                    // hide repeat, loop, reverse checkboxes, repeat count input
                    this.moreOptionsWrap.hidden = true;
                } else {
                    //this.groupCheckBox.hidden = false;
                    // show repeat, loop, reverse checkboxes, repeat count input
                    this.moreOptionsWrap.hidden = false;
                }
            }
            this.change();
        });
        //this.typeSelect.dispatchEvent(new Event('change')); // trigger change event to set initial state
        //this.configTypeSelect.addEventListener('change', () => {
        //    this.current.config = this.configTypeSelect.value as AnimationConfigType;
        //    this.change();
        //});
        this.subTypeSelect.addEventListener('change', () => {
            this.current.animType = this.subTypeSelect.value;
            this.change();
        });
        this.eventSelect.addEventListener('change', () => {
            this.current.event = this.eventSelect.value as AnimationEventType;
            this.change();
        });
        this.screenposSelect?.addEventListener('change', () => {
            // if screen position is none, remove the attribute
            if (this.screenposSelect.value === 'none') {
                delete this.current.screenpos;
            } else {
                this.current.screenpos = this.screenposSelect.value;
            }
            this.change();
        });
        this.triggerInput?.addEventListener('input', () => {
            if (this.triggerInput.value === '') {
                delete this.current.trigger;
            } else {
                this.current.trigger = this.triggerInput.value;
            }
        });
        this.triggerCreate?.addEventListener('click', () => {
            // generate a random id for the trigger
            const id = this.generateItemId();
            this.triggerInput.value = id;
            this.current.trigger = id;
        });
        this.triggerApply?.addEventListener('click', async () => {
            if (!this.current.trigger) return alert('please enter a trigger id or generate one');
            // apply to webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert('Select an element as the trigger element');
            if (!swe?.customAttributes) return alert(`Selected element doesn't allow custom attribute.`);
            const { trigger } = this.current;
            const { prop } = this.selector;
            // trigger
            trigger ? await swe.setCustomAttribute(prop.id, trigger) : null;
        });
        this.triggerRemove?.addEventListener('click', async () => {
            // remove the trigger id from the webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert('Select an element as the trigger element');
            if (!swe?.customAttributes) return alert(`Selected element doesn't allow custom attribute.`);
            const { prop } = this.selector;
            await swe.removeCustomAttribute(prop.id);
        });
        this.idInput?.addEventListener('input', () => {
            if (this.idInput.value === '') delete this.current.id;
            else this.current.id = this.idInput.value;
        });
        this.idCreate?.addEventListener('click', () => {
            // generate a random id for the element
            const id = this.generateItemId();
            this.idInput.value = id;
            this.current.id = id;
        });
        this.idApply?.addEventListener('click', async () => {
            if (!this.current.id) return alert('please enter an id or generate one');
            // apply to webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert('Select an element to apply the id');
            if (!swe?.customAttributes) return alert(`Selected element doesn't allow custom attribute.`);
            const { id } = this.current;
            const { prop } = this.selector;
            // trigger
            id ? await swe.setCustomAttribute(prop.id, id) : null;
        });
        this.idRemove?.addEventListener('click', async () => {
            // remove the trigger id from the webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert('Select an element.');
            if (!swe?.customAttributes) return alert(`Selected element doesn't allow custom attribute.`);
            const { prop } = this.selector;
            await swe.removeCustomAttribute(prop.id);
        });

        this.durationInput.addEventListener('change', () => {
            this.current.options.duration = parseFloat(this.durationInput.value) || 1;
            this.change();
        });
        this.delayInput.addEventListener('change', () => {
            this.current.options.delay = parseFloat(this.delayInput.value) || 0;
            this.change();
        });
        this.easeSelect.addEventListener('change', () => {
            this.current.options.easing = this.easeSelect.value;
            this.change();
        });
        this.repeatCheckBox.addEventListener('change', () => {
            this.repeatInput.hidden = !this.repeatCheckBox.checked;
            this.current.repeatState = this.repeatCheckBox.checked;
            if (!this.repeatCheckBox.checked) delete this.current.options.repeatCount;
            else {
                this.current.options.repeatCount = 1;
                this.repeatInput.value = '1';
            }
            this.change();
        });
        this.reverseCheckBox.addEventListener('change', () => {
            this.current.options.reversed = this.reverseCheckBox.checked;
            this.change();
        });
        this.repeatInput.addEventListener('change', () => {
            if (this.current.repeatState) {
                this.current.options.repeatCount = parseInt(this.repeatInput.value) || 1;
            }
            this.change();
        });
        this.loopCheckBox.addEventListener('change', () => {
            this.current.options.loop = this.loopCheckBox.checked;
            this.change();
        });
        /* this.groupSelect.addEventListener('change', () => {
            this.current.group = this.groupSelect.value;
            this.change();
        });
        this.groupCheckBox.addEventListener('change', () => {
            this.groupSelect.hidden = !this.groupCheckBox.checked;
            this.current.groupState = this.groupCheckBox.checked;
            if (this.groupCheckBox.checked) this.current.group = this.groupSelect.value;
            else this.current.group = '';
            this.change();
        }); */
        // playground
        this.playgroundCheckBox.addEventListener('change', () => {
            this.playground.hidden = !this.playgroundCheckBox.checked;
        });
        // property
        this.propertyAddBtn.addEventListener('click', async () => {
            const propName = this.propertySelect.value;
            //assert property item before adding proceeding
            if (this.current.currentPropertyList.indexOf(propName) >= 0) return;
            // add new animation property to current & selected list
            this.current.currentPropertyList.push(propName);
            this.current.selectedProperty[propName] = { from: '', to: '' };
            // create new property item element
            const item = <divType>this.propertyItem.cloneNode(true);
            this.propertyWrap.append(item);
            // configure property item element
            const itemName = <divType>item.querySelector(this.selector.app.propItemName);
            itemName.textContent = this.propertySelect.value;
            const itemFrom = <inputType>item.querySelector(this.selector.app.propItemFrom);
            const itemTo = <inputType>item.querySelector(this.selector.app.propItemTo);
            const itemDelete = <btnType>item.querySelector(this.selector.app.propItemDelete);
            /**
             * Setup events listeners for animation property elements
             */
            itemFrom.addEventListener('input', () => {
                this.current.selectedProperty[propName].from = itemFrom.value;
                this.change();
            });
            itemTo.addEventListener('input', () => {
                this.current.selectedProperty[propName].to = itemTo.value;
                this.change();
            });
            itemDelete.addEventListener('click', () => {
                if (!confirm(`Do you want to remove the ${propName} prop..?`)) return;
                // delete property item element from dom
                item.remove();
                // remove the particular prop from current list
                this.current.currentPropertyList = this.current.currentPropertyList.filter((it) => {
                    if (it != propName) return it;
                });
                // delete the seleted property
                delete this.current.selectedProperty[propName];
                this.change();
            });
            this.change();
        });
        this.propertySelect.addEventListener('change', () => {
            this.change();
        });

        // action button
        this.applyBtn.addEventListener('click', this.applyActivity);
        this.resetBtn.addEventListener('click', this.resetActivity);
        this.removeBtn.addEventListener('click', () => {
            this.removeOnWebflowElement();
        });

        // premium key input
        this.premiumKeyInput.addEventListener('input', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            const key = (e.target as inputType).value;
            this.handlePremiumUserRequest(key);
        });
    }

    private generateItemId(): string {
        const id = Math.floor((Date.now() - Math.floor(Math.random() * 10000)) / Math.floor(Math.random() * 10000000));
        return `af${id}`.replace(/-/g, '');
    }

    private handlePremiumUserRequest = async (key: string) => {
        if (!key || key.length < 12) {
            this.premiumKeyStatusLabel.textContent = 'Please enter a valid key.';
            window.STARUSER_LIB_KEY_AFAP = '';
            await window.StarUserAfapist.saveStarKeyToDB('');
            // reload app premiums
            await this.loadPremiums({ ignoreInput: true, reset: true });
            return; // skip making request
        }

        this.premiumKeyStatusLabel.textContent = 'Checking key...';

        const status = await window.StarUserAfapist.confirmSuperStarAccess(key);
        if (status) {
            window.STARUSER_LIB_KEY_AFAP = key;
            this.premiumKeyStatusLabel.textContent = 'Key is valid!';
            // Save the key to the database
            await window.StarUserAfapist.saveStarKeyToDB(key);
        } else {
            window.STARUSER_LIB_KEY_AFAP = '';
            await window.StarUserAfapist.saveStarKeyToDB('');
            this.premiumKeyStatusLabel.textContent = 'Invalid key. Please try again.';
        }

        // load app premiums
        this.loadPremiums({ ignoreInput: true, reset: true });
    };

    private loadPremiums = async (
        option: { reset?: boolean; ignoreInput?: boolean } = { reset: true, ignoreInput: false }
    ) => {
        // reset activity
        option.reset ? this.resetActivity() : null;

        // premium family
        const af = 'af';
        const ap = 'app';
        const family = [
            `${af}-pattern-${ap}`,
            `${af}-motion-${ap}`,
            `${af}-preload-${ap}`,
            `${af}-transit-${ap}`,
            `${af}-flip-${ap}`,
            `${af}-svg-${ap}`,
            `${af}-three-${ap}`,
        ];
        // query the key state to know if its valid for premium feature
        const premiumState = await window.StarUserAfapist.hasStarAccess();

        if (premiumState) {
            const key = await window.StarUserAfapist.getStarKeyFromDB();
            window.STARUSER_LIB_KEY_AFAP = key;
            this.premiumKeyStatusLabel.textContent = 'You are a premium user!';
            option.ignoreInput ? null : (this.premiumKeyInput.value = key);
            // also add the key to all premiumious input element value as afapkey=key by replacing .js in the value with .js?afapkey=key
            const premiumious = document.querySelectorAll<inputType>(this.selector.app.premiumKeyPremiumious);
            if (premiumious.length) {
                for (let i = 0; i < premiumious.length; i++) {
                    const e = premiumious[i];
                    const nas = e.value.split('.js?afapkey=');
                    if (nas.length === 2) {
                        const value = nas[0] + '.js' + `"></script>`;
                        e.value = value.replace('.js', `.js?afapkey=${key}`);
                    } else {
                        e.value = nas[0].replace('.js', `.js?afapkey=${key}`);
                    }
                }
            }

            // show the premium family container if key is valid
            family.forEach((f) => {
                const container = document.querySelector<divType>(`[${f}="container"]`);
                if (container) {
                    container.hidden = false;
                    // remove the paragraph element that inform user that the feature is premium
                    const p = document.querySelector(`p[${f}-premium-info="true"]`);
                    if (p) p.remove();
                }
            });
        } else {
            this.premiumKeyStatusLabel.textContent = 'You are a free user!';
            window.STARUSER_LIB_KEY_AFAP = '';
            await window.StarUserAfapist.saveStarKeyToDB('');
            // also remove the key from all premiumious input element value as afapkey=key by replacing .js?afapkey=key with .js
            const premiumious = document.querySelectorAll<inputType>(this.selector.app.premiumKeyPremiumious);
            if (premiumious.length) {
                for (let i = 0; i < premiumious.length; i++) {
                    const e = premiumious[i];
                    const nas = e.value.split('.js?afapkey=');
                    if (nas.length < 2) continue;
                    const value = nas[0] + '.js' + `"></script>`;
                    e.value = value;
                }
            }

            // hide the premium family container if key is not valid
            family.forEach((f) => {
                const container = document.querySelector<divType>(`[${f}="container"]`);
                if (container) {
                    container.hidden = true;
                    // create a paragraph element and append to the container to inform user that the feature is premium
                    if (!document.querySelector(`p[${f}-premium-info="true"]`) && !f.includes('pattern')) {
                        const p = document.createElement('p');
                        p.style.color = 'red';
                        p.textContent = 'This feature is for premium users only. Please enter a valid key to access.';
                        // add an custom attribute to the paragraph to identify it later
                        p.setAttribute(`${f}-premium-info`, 'true');
                        // insert the paragraph above the container itself
                        container.insertAdjacentElement('beforebegin', p);
                    }
                }
            });
        }

        // premium effect on the type of animation selection
        for (let ta = 0; ta < this.typeList.length; ta++) {
            if (premiumState) break;
            const kind = this.typeList[ta];
            if (kind === 'text') continue; // skip
            // query element and get the option element with the value of the kind
            const option = this.typeSelect.querySelector(`option[value="${kind}"]`) as HTMLOptionElement;
            if (option) {
                // disable the option
                option.disabled = true;
            }
        }

        // premium effect on property selection
        for (let pa = 0; pa < this.propertyList.length; pa++) {
            const kind = this.propertyList[pa];
            if (kind === 'opacity') continue; // skip
            // query element and get the option element with the value of the kind
            const option = this.propertySelect.querySelector(`option[value="${kind}"]`) as HTMLOptionElement;
            if (option) option.disabled = !premiumState;
        }

        // also disable add property button
        if (premiumState) {
            this.propertyAddBtn.disabled = false;
        } else {
            this.propertyAddBtn.disabled = true;
        }
    };

    private change = () => {
        const { selectedProperty } = this.current;
        const intKeys = [
            'opacity',
            'translateX',
            'translateY',
            'scaleX',
            'scaleY',
            'scale',
            'rotate',
            'rotateX',
            'rotateY',
            'rotateZ',
            'backgroundColor',
            'color',
            'position',
            'top',
            'bottom',
            'left',
            'right',
            'inset',
            'width',
            'height',
            //'perspective',
        ];
        //console.log('current', this.current);
        //
        const intWithUnit = ['translateX', 'translateY', 'inset', 'top', 'bottom', 'left', 'right', 'width', 'height'];
        // setup current animation option
        const { from, to } = this.current.options;
        if (!from) this.current.options.from = {};
        if (!to) this.current.options.to = {};

        // sort selected properties and set them on current animation options
        for (const key in selectedProperty) {
            if (Object.prototype.hasOwnProperty.call(selectedProperty, key)) {
                const prop = selectedProperty[key];
                const intFact = intKeys.indexOf(key) >= 0;
                if (this.current.options.from) {
                    // from
                    const propFrom = parseFloat(prop.from);
                    if (prop.from) {
                        if (intWithUnit.includes(key)) this.current.options.from[key] = prop.from;
                        else this.current.options.from[key] = intFact ? (propFrom ? propFrom : prop.from) : prop.from;
                    } else delete this.current.options.from[key];
                }
                if (this.current.options.to) {
                    // to
                    const propTo = parseFloat(prop.to);
                    // to
                    if (prop.to) {
                        if (intWithUnit.includes(key)) this.current.options.to[key] = prop.to;
                        else this.current.options.to[key] = intFact ? (propTo ? propTo : prop.to) : prop.to;
                    } else delete this.current.options.to[key];
                }
            }
        }

        // sort option 'from' to match available selected props
        for (const key in from) {
            if (Object.prototype.hasOwnProperty.call(from, key)) {
                if (!Object.prototype.hasOwnProperty.call(selectedProperty, key) && this.current.options.from) {
                    delete this.current.options.from[key];
                }
            }
        }

        // sort option 'to' to match available selected props
        for (const key in to) {
            if (Object.prototype.hasOwnProperty.call(to, key)) {
                if (!Object.prototype.hasOwnProperty.call(selectedProperty, key) && this.current.options.to) {
                    delete this.current.options.to[key];
                }
            }
        }

        // remove from and to if no props.
        if (!Object.keys(selectedProperty).length) {
            delete this.current.options.from;
            delete this.current.options.to;
        }
    };

    private applyActivity = () => {
        // Apply on webflow element;
        this.applyOnWebflowElement();

        // Apply effect on playground if available.
        if (this.playground.hidden) return;
        //
        const newPlayground = <divType>this.playgroundSample.cloneNode(true);
        this.playground.parentElement?.append(newPlayground);
        this.playground.remove();
        this.playground = newPlayground;
        this.change();
        const { type, animType, event, options, repeatState, /* groupState, group, */ screenpos, trigger /*, id */ } =
            this.current;
        const { prop } = this.selector;
        // set type
        this.playground.setAttribute(this.animAttr, type);
        // set sub type
        animType ? this.playground.setAttribute(prop.type, animType) : this.playground.removeAttribute(prop.type);
        // set event
        this.playground.setAttribute(prop.state, event);
        // ease
        this.playground.setAttribute(prop.ease, options.easing);
        // duration
        this.playground.setAttribute(prop.time, options.duration.toString());
        // delay
        this.playground.setAttribute(prop.delay, options.delay.toLocaleString());
        // repeat
        repeatState && options.repeatCount
            ? this.playground.setAttribute(prop.repeatCount, options.repeatCount.toString())
            : this.playground.removeAttribute(prop.repeatCount);
        // loop
        options.loop
            ? this.playground.setAttribute(prop.loop, String(options.loop))
            : this.playground.removeAttribute(prop.loop);
        // reversed
        options.reversed
            ? this.playground.setAttribute(prop.reversed, String(options.reversed))
            : this.playground.removeAttribute(prop.reversed);
        // group
        //groupState && group
        //    ? this.playground.setAttribute(prop.group, group)
        //    : this.playground.removeAttribute(prop.group);
        // screen position
        screenpos
            ? this.playground.setAttribute(prop.screenpos, screenpos)
            : this.playground.removeAttribute(prop.screenpos);
        // trigger
        trigger ? this.playground.setAttribute(prop.trigger, trigger) : this.playground.removeAttribute(prop.trigger);
        // id
        //id ? this.playground.setAttribute(prop.id, id) : this.playground.removeAttribute(prop.id);

        /** configure the from and to */
        for (const key in prop.options) {
            if (Object.prototype.hasOwnProperty.call(prop.options, key)) {
                const keyProp = key as CSS_PROPERTIES_TYPE;
                const attr = prop.options[keyProp];
                let fromValue, toValue;
                if (options.from) fromValue = <string>options.from[keyProp]?.toString();
                if (options.to) toValue = <string>options.to[keyProp]?.toString();
                // from | to
                if (fromValue && toValue) this.playground.setAttribute(attr, `${fromValue}|${toValue}`);
                else if (fromValue) this.playground.setAttribute(attr, `${fromValue}|`);
                else if (toValue) this.playground.setAttribute(attr, `|${toValue}`);
                else this.playground.removeAttribute(attr);
            }
        }

        // render animation on playground
        this.renderAttrAnimation(this.playground);
    };

    private applyOnWebflowElement = async () => {
        // Get Selected Element
        const swe = await webflow.getSelectedElement();
        if (!swe) {
            alert('Select an element');
            return;
        }
        if (!swe?.customAttributes) {
            alert('Selected element does not support custom attribute');
            return;
        }
        this.change();
        const { type, animType, event, options, repeatState /* , groupState, group */, screenpos, trigger /*, id */ } =
            this.current;
        const { prop } = this.selector;
        // set type
        await swe.setCustomAttribute(this.animAttr, type);
        // set sub type
        animType ? await swe.setCustomAttribute(prop.type, animType) : await swe.removeCustomAttribute(prop.type);
        // set event
        await swe.setCustomAttribute(prop.state, event);
        // ease
        await swe.setCustomAttribute(prop.ease, options.easing);
        // duration
        await swe.setCustomAttribute(prop.time, options.duration.toString());
        // delay
        options.delay
            ? await swe.setCustomAttribute(prop.delay, options.delay.toLocaleString())
            : await swe.removeCustomAttribute(prop.delay);
        // repeat
        repeatState && options.repeatCount
            ? await swe.setCustomAttribute(prop.repeatCount, options.repeatCount.toString())
            : await swe.removeCustomAttribute(prop.repeatCount);
        // loop
        options.loop
            ? await swe.setCustomAttribute(prop.loop, String(options.loop))
            : await swe.removeCustomAttribute(prop.loop);
        // reversed
        options.reversed
            ? await swe.setCustomAttribute(prop.reversed, String(options.reversed))
            : await swe.removeCustomAttribute(prop.reversed);
        // screen position
        screenpos
            ? await swe.setCustomAttribute(prop.screenpos, screenpos)
            : await swe.removeCustomAttribute(prop.screenpos);
        // trigger
        trigger ? await swe.setCustomAttribute(prop.trigger, trigger) : await swe.removeCustomAttribute(prop.trigger);
        // id
        //id ? await swe.setCustomAttribute(prop.id, id) : await swe.removeCustomAttribute(prop.id);
        // group
        //groupState && group
        //    ? this.playground.setAttribute(prop.group, group)
        //    : this.playground.removeAttribute(prop.group);

        /** configure the from and to */
        for (const key in prop.options) {
            if (Object.prototype.hasOwnProperty.call(prop.options, key)) {
                const keyProp = key as CSS_PROPERTIES_TYPE;
                const attr = prop.options[keyProp];
                let fromValue, toValue;
                if (options.from) fromValue = <string>options.from[keyProp]?.toString();
                if (options.to) toValue = <string>options.to[keyProp]?.toString();
                // from | to
                if (fromValue && toValue) await swe.setCustomAttribute(attr, `${fromValue}|${toValue}`);
                else if (fromValue) await swe.setCustomAttribute(attr, `${fromValue}|`);
                else if (toValue) await swe.setCustomAttribute(attr, `|${toValue}`);
                else await swe.removeCustomAttribute(attr);
            }
        }
    };

    private removeOnWebflowElement = async () => {
        // Get Selected Element
        const swe = await webflow.getSelectedElement();
        if (!swe) {
            alert('Select an element');
            return;
        }
        if (!swe?.customAttributes) {
            alert('Selected element does not support custom attribute');
            return;
        }
        if (!confirm('You are about remove all afap animation attribute!')) return;
        const { prop } = this.selector;
        // set type
        await swe.removeCustomAttribute(this.animAttr);
        // set sub type
        await swe.removeCustomAttribute(prop.type);
        // set event
        await swe.removeCustomAttribute(prop.state);
        // ease
        await swe.removeCustomAttribute(prop.ease);
        // duration
        await swe.removeCustomAttribute(prop.time);
        // delay
        await swe.removeCustomAttribute(prop.delay);
        // repeat
        await swe.removeCustomAttribute(prop.repeatCount);
        // loop
        await swe.removeCustomAttribute(prop.loop);
        // reversed
        await swe.removeCustomAttribute(prop.reversed);
        // screen position
        await swe.removeCustomAttribute(prop.screenpos);
        // trigger
        await swe.removeCustomAttribute(prop.trigger);
        // id
        await swe.removeCustomAttribute(prop.id);

        /** configure the from and to */
        for (const key in prop.options) {
            if (Object.prototype.hasOwnProperty.call(prop.options, key)) {
                const keyProp = key as CSS_PROPERTIES_TYPE;
                const attr = prop.options[keyProp];
                await swe.removeCustomAttribute(attr);
            }
        }
    };

    private resetActivity = () => {
        // default current option setting
        this.current = {
            type: 'custom',
            event: 'view',
            //config: 'simple',
            options: {
                delay: 0,
                duration: 1,
                easing: 'linear',
            },
            currentPropertyList: [],
            selectedProperty: {},
        };
        // load animation types
        [...this.typeSelect.children].forEach((e) => e.remove());
        this.loadOnSelectElement(this.typeSelect, this.typeList);
        this.current.type = this.typeSelect.value as AnimationType;
        // load animation sub types
        [...this.subTypeSelect.children].forEach((e) => e.remove());
        const selectedType = <string>this.typeSelect.item(this.typeSelect.selectedIndex)?.value;
        if (selectedType === 'ui' || selectedType === 'text') {
            this.loadOnSelectElement(this.subTypeSelect, this.subTypeList[selectedType]);
            this.current.animType = this.subTypeSelect.value;
        }
        // load screen position
        [...this.screenposSelect.children].forEach((e) => e.remove());
        this.loadOnSelectElement(this.screenposSelect, this.screenposList);
        if (this.current.screenpos) delete this.current.screenpos;
        // event
        this.current.event = this.eventSelect.value as AnimationEventType;
        // easing function
        this.current.options.easing = this.easeSelect.value;
        // duration
        this.durationInput.value = this.current.options.duration.toString();
        // delay
        this.delayInput.value = this.current.options.delay.toString();
        // app default setting
        //this.groupCheckBox.hidden = true;
        //this.hidden(this.groupCheckBox);
        //this.groupSelect.hidden = true;

        this.hidden(this.repeatCheckBox, true);
        //this.repeatCheckBox.hidden = false;
        //this.repeatCheckBox.checked = false;
        this.repeatInput.hidden = true;

        this.subTypeSelect.hidden = false;

        this.hidden(this.reverseCheckBox, true);
        //this.reverseCheckBox.hidden = false;
        //this.reverseCheckBox.checked = false;

        this.hidden(this.loopCheckBox, true);
        //this.loopCheckBox.hidden = false;
        //this.loopCheckBox.checked = false;
        // clear all property
        [...this.propertyWrap.querySelectorAll(this.selector.app.propItem)].forEach((e) => e.remove());
        // hide prop container
        this.propContainer.hidden = true;
        //
        this.change();
    };

    private hidden = (element: selectType | inputType, show = false, checked = false) => {
        if (show) element.hidden = !show;
        else element.hidden = !show;

        if (typeof (element as inputType)?.checked === 'boolean') {
            (element as inputType).checked = checked;
            //if ((element as inputType).checked) element.click();
            //else (element as inputType).checked = checked;
        }
    };

    private renderAttrAnimation = (element: HTMLElement = this.playground) => {
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
        const {
            time,
            delay,
            type,
            state,
            ease,
            loop,
            reversed,
            repeatCount,
            /* group, */
            options,
            screenpos,
            trigger,
            //id,
        } = this.selector.prop;

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
        const screenPosValue = element.getAttribute(screenpos);
        const triggerValue = element.getAttribute(trigger);
        //const idValue = element.getAttribute(id);
        //const groupType = element.getAttribute(group);
        const from: { [key: string]: number | string | undefined | boolean } = {};
        const to: { [key: string]: number | string | undefined | boolean } = {};
        const opt: any = { duration: 1000, element: element, from: {}, to: {} };

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
        //idValue ? (opt.id = idValue) : undefined;

        if (mainAnim === 'ui' && animType && window.afap.ui) {
            delete opt.from;
            delete opt.to;
            const animateType = animType as UIAnimationType;
            const animator = window.afap.ui[animateType];
            if ((event as AnimationEventType) === 'view') {
                animator(opt);
            } else {
                window.afap.event({
                    target: element,
                    type: event as AnimationEventType,
                    options: opt as EventAnimationOptionType,
                    animator: animator,
                });
            }
        } else if (mainAnim === 'text') {
            delete opt.from;
            delete opt.to;
            const animator = window.afap.textAnimate;
            if ((event as AnimationEventType) === 'view') {
                animator(opt);
            } else {
                window.afap.event({
                    target: element,
                    type: event as AnimationEventType,
                    options: opt as EventAnimationOptionType,
                    animator: animator,
                });
            }
        } else if (mainAnim === 'custom') {
            const animator = window.afap.animate;
            if ((event as AnimationEventType) === 'view') {
                animator(opt);
            } else {
                window.afap.event({
                    target: element,
                    type: event as AnimationEventType,
                    options: opt as EventAnimationOptionType,
                    animator: animator,
                });
            }
        } else if (mainAnim === 'scroll') {
            const animator = window.afap.scroll;
            animator(opt);
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    new PatternableWfApp(app);
});

document.addEventListener('DOMContentLoaded', () => {
    new MotionableWfApp();
});

document.addEventListener('DOMContentLoaded', () => {
    new PreloaderWfApp();
});

document.addEventListener('DOMContentLoaded', () => {
    new TransitionWfApp();
});

document.addEventListener('DOMContentLoaded', () => {
    new FlipWfApp();
});

document.addEventListener('DOMContentLoaded', () => {
    new SVGWfApp();
});

document.addEventListener('DOMContentLoaded', () => {
    new ThreeJsWfApp();
});

document.addEventListener('DOMContentLoaded', () => {
    new SliderApp();
});

document.addEventListener('DOMContentLoaded', () => {
    new AppExtras();
});
