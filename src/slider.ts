const webflow = window.webflow || [];

export class SliderApp {
    private readonly container: divType;
    private readonly selector;
    //private readonly resetBtn;
    //private readonly applyBtn;
    //private readonly removeBtn;
    /* Configuration buttons */
    private readonly sliderContainerApplyButton;
    private readonly sliderContainerRemoveButton;
    private readonly slidesWrapperApplyButton;
    private readonly slidesWrapperRemoveButton;
    private readonly nextApplyButton;
    private readonly nextRemoveButton;
    private readonly prevApplyButton;
    private readonly prevRemoveButton;
    private readonly attr: string = 'af-slider';
    private readonly appAttr: string;
    // parameter
    private readonly properties: {
        [key: string]: { value: string; type: 'text' | 'number' | 'checkbox' | 'select' };
    };
    private inputs: { [key: string]: inputType | selectType } = {};
    constructor() {
        this.appAttr = `${this.attr}-app`;

        this.selector = {
            card: `[${this.appAttr}="card"]`,
            app: {
                container: `[${this.appAttr}="container"]`,
                //removeBtn: `[${this.appAttr}="remove"]`,
                //resetBtn: `[${this.appAttr}="reset"]`,
                //applyBtn: `[${this.appAttr}="apply"]`,
            },
            ui: {
                container: `container`,
                slider: `slider`,
                slide: `slide`,
                prevBtn: `prev-btn`,
                nextBtn: `next-btn`,
            },
            sliderContainerApply: `[${this.appAttr}="slider-container-apply"]`,
            sliderContainerRemove: `[${this.appAttr}="slider-container-remove"]`,
            slidesWrapperApply: `[${this.appAttr}="slides-wrapper-button-apply"]`,
            slidesWrapperRemove: `[${this.appAttr}="slides-wrapper-button-remove"]`,
            nextBtnApply: `[${this.appAttr}="slide-next-button-apply"]`,
            nextBtnRemove: `[${this.appAttr}="slide-next-button-remove"]`,
            prevBtnApply: `[${this.appAttr}="slide-prev-button-apply"]`,
            prevBtnRemove: `[${this.appAttr}="slide-prev-button-remove"]`,
        };

        this.inputs = {};

        this.properties = {
            delay: { value: '2000', type: 'number' },
            duration: { value: '600', type: 'number' },
            //easing: { value: '', type: 'select' },
            slideinview: { value: '1', type: 'number' },
            autoslide: { value: 'false', type: 'checkbox' },
            loop: { value: 'true', type: 'checkbox' },
        };

        // elements init.
        this.container = <divType>document.querySelector(this.selector.app.container);

        // Configuration buttons
        this.sliderContainerApplyButton = <btnType>this.container.querySelector(this.selector.sliderContainerApply);
        this.sliderContainerRemoveButton = <btnType>this.container.querySelector(this.selector.sliderContainerRemove);
        this.slidesWrapperApplyButton = <btnType>this.container.querySelector(this.selector.slidesWrapperApply);
        this.slidesWrapperRemoveButton = <btnType>this.container.querySelector(this.selector.slidesWrapperRemove);
        this.nextApplyButton = <btnType>this.container.querySelector(this.selector.nextBtnApply);
        this.nextRemoveButton = <btnType>this.container.querySelector(this.selector.nextBtnRemove);
        this.prevApplyButton = <btnType>this.container.querySelector(this.selector.prevBtnApply);
        this.prevRemoveButton = <btnType>this.container.querySelector(this.selector.prevBtnRemove);

        // slider container
        //this.applyBtn = <btnType>this.container.querySelector(this.selector.app.applyBtn);
        //this.resetBtn = <btnType>this.container.querySelector(this.selector.app.resetBtn);
        //this.removeBtn = <btnType>this.container.querySelector(this.selector.app.removeBtn);
        // listener
        this.listeners();
    }

    private listeners() {
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
        }

        // slider container button event setup
        const failedCustomAttribute = "Selected element doesn't allow custom attribute.";
        const noElement = 'Select an element';
        this.sliderContainerApplyButton?.addEventListener('click', async () => {
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert(noElement);
            if (!swe?.customAttributes) return alert(failedCustomAttribute);
            // apply
            const inputNames = Object.keys(this.inputs);
            for (let p = 0; p < inputNames.length; p++) {
                const propName = inputNames[p]; // input name
                const element = <inputType>this.inputs[propName];
                const { value } = element;
                const vlu = this.properties[propName].type === 'checkbox' ? String(element.checked) : value;
                //console.log(`${this.attr}-${propName}`, vl, element);
                value ? await swe.setCustomAttribute(`${this.attr}-${propName}`, vlu) : undefined;
            }
            // add slider self
            await swe.setCustomAttribute(this.attr, 'container');
            // button text flip
            this.btnTextFlip(this.sliderContainerApplyButton, 'Applied!!!');
        });
        this.sliderContainerRemoveButton?.addEventListener('click', async () => {
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
            // button text flip
            this.btnTextFlip(this.sliderContainerRemoveButton, 'Removed!!!');
        });

        // slider wrapper button event setup
        this.slidesWrapperApplyButton?.addEventListener('click', () =>
            this.setAttribute(this.selector.ui.slider, this.slidesWrapperApplyButton)
        );
        this.slidesWrapperRemoveButton?.addEventListener('click', () =>
            this.removeAttribute(this.slidesWrapperRemoveButton)
        );

        // slider trigger button event setup
        this.nextApplyButton?.addEventListener('click', () =>
            this.setAttribute(this.selector.ui.nextBtn, this.nextApplyButton)
        );
        this.nextRemoveButton?.addEventListener('click', () => this.removeAttribute(this.nextRemoveButton));
        this.prevApplyButton?.addEventListener('click', () =>
            this.setAttribute(this.selector.ui.prevBtn, this.prevRemoveButton)
        );
        this.prevRemoveButton?.addEventListener('click', () => this.removeAttribute(this.prevRemoveButton));
    }

    private async setAttribute(value: string, btn: btnType) {
        // Get Selected Element
        const swe = await webflow?.getSelectedElement();
        if (!swe) {
            alert('Select an element');
            return;
        }
        if (!swe?.customAttributes) {
            alert('Selected element does not support custom attribute');
            return;
        }
        // set type
        await swe.setCustomAttribute(this.attr, value);
        this.btnTextFlip(btn, 'Applied!!!');
    }

    private async removeAttribute(btn: btnType) {
        // Get Selected Element
        const swe = await webflow?.getSelectedElement();
        if (!swe) {
            alert('Select an element');
            return;
        }
        if (!swe?.customAttributes) {
            alert('Selected element does not support custom attribute');
            return;
        }
        if (!confirm('You are about remove the afap slider attribute!')) return;
        // remove
        await swe.removeCustomAttribute(this.attr);
        this.btnTextFlip(btn, 'Removed!!!');
    }

    btnTextFlip = (btn: btnType, text: string, duration: number = 2000) => {
        const originalText = btn.textContent;
        btn.textContent = text;
        setTimeout(() => {
            btn.textContent = originalText;
        }, duration);
    };
}
