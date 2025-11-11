export const webflow = window.webflow || [];

export class PreloaderWfApp {
    private readonly attr: string;
    private readonly appAttr: string;
    private readonly selector;
    private readonly container: divType;
    private readonly properties: {
        [key: string]: { value: string; type: 'text' | 'number' | 'checkbox' | 'select' };
    };
    private readonly defaultProperties: {
        [key: string]: { value: string; type: 'text' | 'number' | 'checkbox' | 'select' };
    };
    private inputs: { [key: string]: inputType | selectType } = {};
    private readonly preloaders: { [key: string]: string[] };
    private readonly propWithTypes: { [key: string]: string[] };
    private readonly propWithDirections: { [key: string]: string[] };
    private readonly usePreloadContainerCheckbox;
    private readonly applyPreloadContainerButton;
    private readonly removePreloadContainerButton;
    private readonly usePreloadElementCheckbox;
    private readonly preloadersSelect;
    private readonly applyPreloadElementButton;
    private readonly removePreloadElementButton;
    constructor() {
        this.attr = 'af-preload';
        this.appAttr = `${this.attr}-app`;
        this.selector = {
            app: {
                container: `[${this.appAttr}="container"]`,
                // preloader
                usePreloadContainer: `[${this.appAttr}="use-preload-container"]`,
                applyPreloadContainer: `[${this.appAttr}="apply-preload-container"]`,
                removePreloadContainer: `[${this.appAttr}="remove-preload-container"]`,
                //element
                usePreloadElement: `[${this.appAttr}="use-preload-element"]`,
                preloadersSelect: `[${this.appAttr}="preload-list"]`,
                applyPreloadElement: `[${this.appAttr}="apply-preload-element"]`,
                removePreloadElement: `[${this.appAttr}="remove-preload-element"]`,
            },
            prop: {
                container: `${this.attr}-preload-container`,
                element: `${this.attr}-preload-element`,
            },
        };

        // elements
        this.container = document.querySelector(this.selector.app.container) as divType;
        this.usePreloadContainerCheckbox = <inputType>document.querySelector(this.selector.app.usePreloadContainer);
        this.applyPreloadContainerButton = <btnType>document.querySelector(this.selector.app.applyPreloadContainer);
        this.removePreloadContainerButton = <btnType>document.querySelector(this.selector.app.removePreloadContainer);
        this.usePreloadElementCheckbox = <inputType>document.querySelector(this.selector.app.usePreloadElement);
        this.preloadersSelect = <selectType>document.querySelector(this.selector.app.preloadersSelect);
        this.applyPreloadElementButton = <btnType>document.querySelector(this.selector.app.applyPreloadElement);
        this.removePreloadElementButton = <btnType>document.querySelector(this.selector.app.removePreloadElement);
        // properties
        this.defaultProperties = {
            timeout: { value: '10000', type: 'text' },
            bgcolor: { value: '#000', type: 'text' },
            color: { value: '#fff', type: 'text' },
        };
        this.properties = {
            timeout: { value: '1000', type: 'text' },
            bgcolor: { value: '#000', type: 'text' },
            color: { value: '#fff', type: 'text' },
            height: { value: '', type: 'text' },
            width: { value: '', type: 'text' },
            speed: { value: '1', type: 'number' },
            radius: { value: '40', type: 'number' },
            stroke: { value: '5', type: 'number' },
            duration: { value: '2000', type: 'number' },
            size: { value: '60', type: 'number' },
            thickness: { value: '8', type: 'number' },
            count: { value: '1', type: 'number' },
            length: { value: '100', type: 'number' },
            amplitude: { value: '20', type: 'number' },
            text: { value: '', type: 'text' },
            words: { value: '', type: 'text' },
            thick: { value: '10px', type: 'text' },
            interval: { value: '1000', type: 'number' },
            xcount: { value: '4', type: 'number' },
            ycount: { value: '4', type: 'number' },
            ygap: { value: '12', type: 'number' },
            xgap: { value: '16', type: 'number' },
            tcolor: { value: '', type: 'text' },
            pcolor: { value: '#fde', type: 'text' },
            induration: { value: '1000', type: 'number' },
            outduration: { value: '1000', type: 'number' },
            customs: { value: '', type: 'text' },
            direction: { value: '', type: 'select' },
            type: { value: '', type: 'select' },
            loop: { value: 'true', type: 'checkbox' },
            istrail: { value: 'false', type: 'checkbox' },
            loadingtext: { value: 'false', type: 'checkbox' },
        };

        // preloaders
        this.preloaders = {
            Bars: ['count', 'height', 'width', 'duration'],
            Circular: ['radius', 'stroke'],
            DotSpinner: ['size', 'count', 'duration', 'type'],
            DualRing: ['size', 'thickness', 'duration'],
            GamePixelated: ['speed', 'size', 'loadingtext', 'duration'],
            CharacterFlip: ['size', 'customs', 'interval'],
            Count: ['type'],
            Progress: ['height'],
            Marquee: ['text', 'duration', 'speed', 'loop', 'direction'],
            Orbiting: ['speed', 'size', 'count', 'radius'],
            ProgressLine: ['duration', 'direction', 'speed', 'thick'],
            Ripple: ['size', 'count', 'duration'],
            RocketLaunch: ['tcolor', 'duration', 'speed'],
            ShapeTransform: ['length', 'duration', 'radius', 'height', 'width', 'stroke'],
            Zigzag: ['count', 'length', 'amplitude', 'speed'],
            WordSequence: ['words', 'induration', 'interval', 'outduration', 'loop'],
            WheelFortune: ['pcolor', 'words', 'size', 'count', 'speed'],
            TypingEffect: ['words', 'duration', 'interval', 'loop'],
            SpinnerTrail: ['duration', 'size', 'thickness', 'length', 'tcolor', 'istrail'],
            TableSkeleton: ['xcount', 'ycount', 'height', 'ygap', 'xgap', 'radius', 'duration'],
        };

        // preloader types | directions
        this.propWithTypes = {
            count: ['up', 'down'],
            dotspinner: ['pulse', 'rotate'],
        };
        this.propWithDirections = {
            marquee: ['ltr', 'rtl'],
            progress_line: ['horizontal', 'vertical'],
        };

        // initialize
        this.init();
    }

    private init() {
        // Use preloader container/element
        this.usePreloadContainerCheckbox.checked = true;
        this.usePreloadElementCheckbox.checked = true;

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
            if (Object.keys(this.defaultProperties).includes(propName)) continue;
            const parent = <divType>element.parentElement;
            parent.hidden = true;
        }

        // preloader list implementation
        this.preloadersSelect?.addEventListener('change', () => {
            const { value } = this.preloadersSelect;
            Object.keys(this.inputs).forEach((input) => {
                const parent = <divType>this.inputs[input].parentElement;
                //if (!Object.keys(this.defaultProperties).some((v) => v === input)) parent.hidden = true;
                if (!Object.keys(this.defaultProperties).includes(input)) parent.hidden = true;
            });
            const preloader = this.preloaders[value];
            for (let p = 0; p < preloader.length; p++) {
                const propName = preloader[p]; // property name
                const element = this.inputs[propName];
                const property = this.properties[propName];
                const parent = <divType>element.parentElement;
                parent.hidden = false;
                // input element
                if (property.type === 'number' || property.type === 'text') element.value = property.value;
                property.type === 'checkbox'
                    ? ((<inputType>element).checked = property.value === 'true' ? true : false)
                    : undefined;
                // select element
                if (property.type !== 'select') continue;
                const selectEle = <selectType>element;
                // if preloader type requires type options,
                // then add options to the element because its a select element
                const typeOptions = this.propWithTypes[value];
                // also if preloader type has direction options, then the its a select element
                const direcOptions = this.propWithDirections[value];
                if (typeOptions) this.loadOnSelectElement(selectEle, typeOptions);
                if (direcOptions) this.loadOnSelectElement(selectEle, direcOptions);
            }
        });
        this.loadOnSelectElement(this.preloadersSelect, Object.keys(this.preloaders));
        this.preloadersSelect.dispatchEvent(new Event('change'));

        // other app element listeners.
        const failedCustomAttribute = "Selected element doesn't allow custom attribute.";
        const noElement = 'Select an element';
        this.applyPreloadContainerButton.addEventListener('click', async () => {
            // apply to webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert(noElement);
            if (!swe?.customAttributes) return alert(failedCustomAttribute);
            // use preloader container
            await swe.setCustomAttribute(`${this.attr}-use-container`, `${this.usePreloadContainerCheckbox.checked}`);
            // button text flip
            this.btnTextFlip(this.applyPreloadContainerButton, 'Applied!!!');
        });
        this.removePreloadContainerButton.addEventListener('click', async () => {
            // apply to webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert(noElement);
            if (!swe?.customAttributes) return alert(failedCustomAttribute);
            // remove
            await swe.removeCustomAttribute(`${this.attr}-use-container`);
            // button text flip
            this.btnTextFlip(this.removePreloadContainerButton, 'Removed!!!');
        });
        this.applyPreloadElementButton.addEventListener('click', async () => {
            // apply to webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert(noElement);
            if (!swe?.customAttributes) return alert(failedCustomAttribute);
            // set property
            const { value } = this.preloadersSelect;
            const preloader = [...this.preloaders[value], ...Object.keys(this.defaultProperties)];
            for (let p = 0; p < preloader.length; p++) {
                const propName = preloader[p]; // property name
                const element = <inputType>this.inputs[propName];
                const iValue = element.value;
                const vlu = this.properties[propName].type === 'checkbox' ? String(element.checked) : iValue;
                //console.log(`${this.attr}-${propName}`, element.value, element);
                iValue ? await swe.setCustomAttribute(`${this.attr}-${propName}`, vlu) : undefined;
            }
            // add preloader type
            await swe.setCustomAttribute(`${this.attr}-use-type`, value);
            // use preloader element
            await swe.setCustomAttribute(`${this.attr}-use-element`, `${this.usePreloadElementCheckbox.checked}`);

            // button text flip
            this.btnTextFlip(this.applyPreloadElementButton, 'Applied!!!');
        });
        this.removePreloadElementButton.addEventListener('click', async () => {
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
            // remove preloader type
            await swe.removeCustomAttribute(`${this.attr}-use-type`);
            // remove use preloader element
            await swe.removeCustomAttribute(`${this.attr}-use-element`);

            // button text flip
            this.btnTextFlip(this.removePreloadElementButton, 'Removed!!!');
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
