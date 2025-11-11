export const webflow = window.webflow || [];

export class SVGWfApp {
    private readonly attr: string;
    private readonly appAttr: string;
    private readonly selector;
    private readonly container: divType;
    private readonly properties: {
        [key: string]: { value: string; type: 'text' | 'number' | 'select' };
    };
    private readonly defaultProperties: {
        [key: string]: { value: string; type: 'text' | 'number' | 'select' };
    };
    private inputs: { [key: string]: inputType | selectType } = {};
    private readonly propWithTypes: { [key: string]: string[] };
    private readonly animations: { [key: string]: string[] };
    private readonly listSelect;
    private readonly applyButton;
    private readonly removeButton;
    private readonly reset;
    constructor() {
        this.attr = 'af-svg';
        this.appAttr = `${this.attr}-app`;
        this.selector = {
            app: {
                container: `[${this.appAttr}="container"]`,
                list: `[${this.appAttr}="list"]`,
                applyBtn: `[${this.appAttr}="apply"]`,
                removeBtn: `[${this.appAttr}="remove"]`,
                resetBtn: `[${this.appAttr}="reset"]`,
            },
        };

        // elements
        this.container = document.querySelector(this.selector.app.container) as divType;
        this.listSelect = <selectType>document.querySelector(this.selector.app.list);
        this.applyButton = <btnType>document.querySelector(this.selector.app.applyBtn);
        this.removeButton = <btnType>document.querySelector(this.selector.app.removeBtn);
        this.reset = <btnType>document.querySelector(this.selector.app.resetBtn);
        // properties
        this.defaultProperties = {
            state: { value: '', type: 'select' },
        };
        this.properties = {
            speed: { value: '2', type: 'number' },
            color: { value: 'orange', type: 'text' },
            intensity: { value: '1', type: 'number' },
            strength: { value: '1.2', type: 'number' },
            density: { value: '0.35', type: 'number' },
            opacity: { value: '0.5', type: 'number' },
            count: { value: '3', type: 'number' },
            width: { value: '2', type: 'number' },
            jitter: { value: '0.12', type: 'number' },
            length: { value: '0.18', type: 'number' },
            fspeed: { value: '0.12', type: 'number' },
            //mode: { value: 'pingpong', type: 'text' },
            progress: { value: '0.5', type: 'number' },
            min: { value: '1', type: 'number' },
            max: { value: '6', type: 'number' },
            start: { value: '0', type: 'number' },
            amplitude: { value: '10', type: 'number' },
            frequency: { value: '0.02', type: 'number' },
            amount: { value: '15', type: 'number' },
            fadespeed: { value: '5', type: 'number' },
            size: { value: '2', type: 'number' },
            x: { value: '0', type: 'number' },
            y: { value: '1', type: 'number' },
            state: { value: '', type: 'select' },
        };

        // animations
        this.animations = {
            smoke: ['intensity', 'color', 'density', 'speed'],
            shockwave: ['intensity', 'color', 'speed'],
            ripple: ['intensity', 'speed'],
            raindroplets: ['color', 'count', 'x', 'y', 'speed', 'size', 'opacity'],
            pixel: ['start', 'speed', 'min', 'max'],
            pixelglitch: ['start', 'speed', 'min', 'max', 'jitter'],
            oscillate: ['frequency', 'amplitude', 'speed'],
            gooey: ['speed', 'strength', 'intensity'],
            glitch: ['intensity', 'speed'],
            flame: ['speed', 'intensity'],
            electric: ['count', 'color', 'fspeed', 'length', 'width', 'opacity', 'jitter'],
        };

        this.propWithTypes = {
            state: ['view', 'click', 'hover', 'scroll'],
        };

        // initialize
        this.init();
    }

    private init() {
        // set up properties.
        const propertyInputs = Object.keys(this.properties);

        // inputs
        for (let index = 0; index < propertyInputs.length; index++) {
            const propName = propertyInputs[index];
            const input = this.properties[propName];
            const element = this.container.querySelector<selectType | inputType>(`[${this.appAttr}="${propName}"]`);
            if (!element) continue;
            input.type !== 'select' ? (element.value = input.value) : undefined;
            this.inputs[propName] = element;
            // initial display of every inputs should be hidden.
            //if (Object.keys(this.defaultProperties).some((v) => v === propName)) continue;
            if (Object.keys(this.defaultProperties).includes(propName)) {
                if (input.type !== 'select') continue;
                const selectEle = <selectType>element;
                // if preloader type requires type options,
                // then add options to the element because its a select element
                const typeOptions = this.propWithTypes[propName];
                if (typeOptions) this.loadOnSelectElement(selectEle, typeOptions);
                continue;
            }
            const parent = <divType>element.parentElement;
            parent.hidden = true;
        }

        // svg animation list implementation
        this.listSelect?.addEventListener('change', () => {
            const { value } = this.listSelect;
            Object.keys(this.inputs).forEach((input) => {
                const parent = <divType>this.inputs[input].parentElement;
                //if (!Object.keys(this.defaultProperties).some((v) => v === input)) parent.hidden = true;
                if (!Object.keys(this.defaultProperties).includes(input)) parent.hidden = true;
            });
            const svg = this.animations[value];
            for (let p = 0; p < svg.length; p++) {
                const propName = svg[p]; // property name
                const element = this.inputs[propName];
                const property = this.properties[propName];
                const parent = <divType>element.parentElement;
                parent.hidden = false;
                // input element
                if (property.type === 'number' || property.type === 'text') element.value = property.value;
                // select element
                if (property.type !== 'select') continue;
                const selectEle = <selectType>element;
                // if svg type requires type options,
                // then add options to the element because its a select element
                const typeOptions = this.propWithTypes[value];
                // also if svg type has options, then its a select element
                if (typeOptions) this.loadOnSelectElement(selectEle, typeOptions);
            }
        });
        this.loadOnSelectElement(this.listSelect, Object.keys(this.animations));
        this.listSelect.dispatchEvent(new Event('change'));

        // other app element listeners.
        const failedCustomAttribute = "Selected element doesn't allow custom attribute.";
        const noElement = 'Select an element';

        this.applyButton.addEventListener('click', async () => {
            // apply to webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert(noElement);
            if (!swe?.customAttributes) return alert(failedCustomAttribute);
            // set property
            const { value } = this.listSelect;
            const svgList = [...this.animations[value], ...Object.keys(this.defaultProperties)];
            for (let p = 0; p < svgList.length; p++) {
                const propName = svgList[p]; // property name
                const element = this.inputs[propName];
                const iValue = element.value;
                //console.log(`${this.attr}-${propName}`, element.value, element);
                iValue ? await swe.setCustomAttribute(`${this.attr}-${propName}`, iValue) : undefined;
            }
            // add svg animation type
            await swe.setCustomAttribute(`${this.attr}`, value);

            // button text flip
            this.btnTextFlip(this.applyButton, 'Applied!!!');
        });

        this.removeButton.addEventListener('click', async () => {
            // apply to webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert(noElement);
            if (!swe?.customAttributes) return alert(failedCustomAttribute);

            // remove property
            const properties = [...Object.keys(this.properties), ...Object.keys(this.defaultProperties)];
            for (let p = 0; p < properties.length; p++) {
                const propName = properties[p]; // property name
                //console.log(`${this.attr}-${propName}`, element.value, element);
                await swe.removeCustomAttribute(`${this.attr}-${propName}`);
            }
            // remove svg type
            await swe.removeCustomAttribute(`${this.attr}`);
            // button text flip
            this.btnTextFlip(this.removeButton, 'Removed!!!');
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
                input.type !== 'select' ? (element.value = input.value) : undefined;
                // initial display of every inputs should be hidden.
                //if (Object.keys(this.defaultProperties).some((v) => v === propName)) continue;
                if (Object.keys(this.defaultProperties).includes(propName)) {
                    if (input.type !== 'select') continue;
                    const selectEle = <selectType>element;
                    // if preloader type requires type options,
                    // then add options to the element because its a select element
                    const typeOptions = this.propWithTypes[propName];
                    if (typeOptions) this.loadOnSelectElement(selectEle, typeOptions);
                    continue;
                }
                const parent = <divType>element.parentElement;
                parent.hidden = true;
            }

            // dispatch event for select element of list of svg animation
            this.listSelect.value = Object.keys(this.animations)[0] ?? '';
            this.listSelect.dispatchEvent(new Event('change'));
        });
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
