import { EASE_FUNCTIONS } from './utils/browser-ease';

export const webflow = window.webflow || [];

export class FlipWfApp {
    private readonly attr: string;
    private readonly appAttr: string;
    private readonly selector;
    private readonly container: divType;
    //private readonly types: selectType;
    // element id
    private readonly idInput: inputType; // id of the element to apply animation
    private readonly idCreate: btnType | null; // create id for the element
    private readonly idApply: btnType | null; // apply id to element
    private readonly idRemove: btnType | null; // remove id to element
    // parameter
    private readonly properties: {
        [key: string]: { value: string; type: 'text' | 'number' | 'checkbox' | 'select' };
    };
    private inputs: { [key: string]: inputType | selectType } = {};
    private readonly propWithSelectOptions: { [key: string]: string[] };
    // action button
    private readonly remove: btnType;
    private readonly apply: btnType;
    private readonly reset: btnType;
    // list
    private readonly easingList: string[];
    private readonly typeList: string[];
    constructor() {
        this.attr = 'af-move';
        this.appAttr = `${this.attr}-app`;
        this.selector = {
            app: {
                container: `[${this.appAttr}="container"]`,
                type: `[${this.appAttr}="type"]`,
                // id element
                id: `[${this.appAttr}="id"]`,
                idCreate: `[${this.appAttr}="id-create"]`,
                idApply: `[${this.appAttr}="id-apply"]`,
                idRemove: `[${this.appAttr}="id-remove"]`,
                // action button
                remove: `[${this.appAttr}="remove"]`,
                apply: `[${this.appAttr}="apply"]`,
                reset: `[${this.appAttr}="reset"]`,
            },
            prop: {
                id: `${this.attr}-id`,
            },
        };

        this.properties = {
            type: { value: '', type: 'select' },
            duration: { value: '600', type: 'number' },
            easing: { value: '', type: 'select' },
            absolute: { value: 'false', type: 'checkbox' },
            opacity: { value: 'false', type: 'checkbox' },
            preservescroll: { value: 'true', type: 'checkbox' },
            nested: { value: 'false', type: 'checkbox' },
            stagger: { value: '0', type: 'number' },
            delay: { value: '0', type: 'number' },
            reverse: { value: 'false', type: 'checkbox' },
            loop: { value: 'false', type: 'text' },
            state: { value: '', type: 'select' },
            targets: { value: '', type: 'text' },
            classname: { value: '', type: 'text' },
            viewrange: { value: '1-100', type: 'text' },
        };

        // elements
        this.container = document.querySelector(this.selector.app.container) as divType;
        //this.types = <selectType>this.container.querySelector(this.selector.app.type);
        // i.d element
        this.idInput = <inputType>this.container.querySelector(this.selector.app.id);
        this.idCreate = this.container.querySelector<btnType>(this.selector.app.idCreate);
        this.idApply = this.container.querySelector<btnType>(this.selector.app.idApply);
        this.idRemove = this.container.querySelector<btnType>(this.selector.app.idRemove);
        // parameters
        // action btn
        this.remove = <btnType>this.container.querySelector(this.selector.app.remove);
        this.apply = <btnType>this.container.querySelector(this.selector.app.apply);
        this.reset = <btnType>this.container.querySelector(this.selector.app.reset);

        // list
        this.easingList = [...Object.keys(EASE_FUNCTIONS)];
        this.typeList = ['shuffle', 'move', 'toggle'];

        this.propWithSelectOptions = {
            type: this.typeList,
            easing: this.easingList,
            state: ['view', 'click', 'hover'],
        };
        // listener
        this.listener();
    }

    private listener() {
        // select elements setup
        //this.loadOnSelectElement(this.easing, this.easingList);
        //this.loadOnSelectElement(this.types, this.typeList);

        // set default value
        //this.duration.value = '600';
        //this.easing.dispatchEvent(new Event('change'));
        //this.types.dispatchEvent(new Event('change'));

        // set up properties.
        const propertyInputs = Object.keys(this.properties);

        // inputs
        for (let index = 0; index < propertyInputs.length; index++) {
            const propName = propertyInputs[index];
            const input = this.properties[propName];
            const element = this.container.querySelector<selectType | inputType>(`[${this.appAttr}="${propName}"]`);
            if (!element) continue;
            input.type !== 'select' && input.type !== 'checkbox' ? (element.value = input.value) : undefined;
            input.type === 'checkbox'
                ? ((<inputType>element).checked = input.value === 'true' ? true : false)
                : undefined;
            this.inputs[propName] = element;
            // initial display of every inputs should be hidden.
            //if (Object.keys(this.defaultProperties).some((v) => v === propName)) continue;
            //if (Object.keys(this.defaultProperties).includes(propName)) continue;
            //const parent = <divType>element.parentElement;
            //parent.hidden = true;
            if (input.type !== 'select') continue;
            const selectEle = <selectType>element;
            // then add options to the element because its a select element
            const typeOptions = this.propWithSelectOptions[propName];
            if (typeOptions) this.loadOnSelectElement(selectEle, typeOptions);
        }

        // button listeners
        const failedCustomAttribute = "Selected element doesn't allow custom attribute.";
        const noElement = 'Select an element';
        this.apply?.addEventListener('click', async () => {
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert(noElement);
            if (!swe?.customAttributes) return alert(failedCustomAttribute);
            // apply
            const inputNames = Object.keys(this.inputs);
            for (let p = 0; p < inputNames.length; p++) {
                const propName = inputNames[p]; // input name
                const element = <inputType>this.inputs[propName];
                const { value } = element;
                //console.log(`${this.attr}-${propName}`, element.value, element);
                if (propName === 'type') {
                    // add flip type
                    await swe.setCustomAttribute(`${this.attr}`, value);
                    continue;
                }
                if (propName === 'easing') {
                    await swe.setCustomAttribute(`${this.attr}-${propName}`, EASE_FUNCTIONS[value]);
                    continue;
                }
                const vlu = this.properties[propName].type === 'checkbox' ? String(element.checked) : value;
                value ? await swe.setCustomAttribute(`${this.attr}-${propName}`, vlu) : undefined;
            }
            // add flip type
            //await swe.setCustomAttribute(`${this.attr}`, 'parent');
            // button text flip
            this.btnTextFlip(this.apply, 'Applied!!!');
        });

        this.remove?.addEventListener('click', async () => {
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert(noElement);
            if (!swe?.customAttributes) return alert(failedCustomAttribute);
            // remove
            const inputNames = Object.keys(this.inputs);
            for (let p = 0; p < inputNames.length; p++) {
                const propName = inputNames[p]; // input name
                //console.log(`${this.attr}-${propName}`, element.value, element);
                swe.removeCustomAttribute(`${this.attr}-${propName}`);
            }
            await swe.removeCustomAttribute(`${this.attr}`);
            await swe.removeCustomAttribute(`${this.attr}-id`);
            // button text flip
            this.btnTextFlip(this.remove, 'Removed!!!');
        });

        this.reset?.addEventListener('click', () => {
            // reset up properties.
            const propertyInputs = Object.keys(this.properties);

            // inputs
            for (let index = 0; index < propertyInputs.length; index++) {
                const propName = propertyInputs[index];
                const input = this.properties[propName];
                const element = this.container.querySelector<selectType | inputType>(`[${this.appAttr}="${propName}"]`);
                if (!element) continue;
                input.type !== 'select' && input.type !== 'checkbox' ? (element.value = input.value) : undefined;
                input.type === 'checkbox'
                    ? ((<inputType>element).checked = input.value === 'true' ? true : false)
                    : undefined;
            }
        });

        this.idCreate?.addEventListener('click', () => {
            // generate a random id for the element
            const id = this.generateItemId();
            this.idInput.value = id;
        });
        this.idApply?.addEventListener('click', async () => {
            if (!this.idInput.value) return alert('please enter a unique id or generate one');
            // apply to webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert(noElement);
            if (!swe?.customAttributes) return alert(failedCustomAttribute);
            const id = this.idInput.value;
            const { prop } = this.selector;
            // trigger
            id ? await swe.setCustomAttribute(prop.id, id) : null;
        });
        this.idRemove?.addEventListener('click', async () => {
            // remove the trigger id from the webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert(noElement);
            if (!swe?.customAttributes) return alert(failedCustomAttribute);
            const { prop } = this.selector;
            await swe.removeCustomAttribute(prop.id);
        });
    }

    private generateItemId(): string {
        const id = Math.floor((Date.now() - Math.floor(Math.random() * 10000)) / Math.floor(Math.random() * 10000000));
        return `af${id}`.replace(/-/g, '');
    }

    btnTextFlip = (btn: btnType, text: string, duration: number = 2000) => {
        const originalText = btn.textContent;
        btn.textContent = text;
        setTimeout(() => {
            btn.textContent = originalText;
        }, duration);
    };

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
}
