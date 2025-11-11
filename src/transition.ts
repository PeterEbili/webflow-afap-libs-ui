export const webflow = window.webflow || [];
import { EASING_FUNCTIONS } from './utils/constants';
 
export class TransitionWfApp {
    private readonly attr: string;
    private readonly appAttr: string;
    private readonly selector;
    private readonly container: divType;
    private readonly duration: inputType;
    private readonly easing: selectType;
    private readonly enter: selectType;
    private readonly leave: selectType;
    private readonly enterfunc: inputType;
    private readonly leavefunc: inputType;
    private readonly remove: btnType;
    private readonly apply: btnType;
    private readonly easingList: string[];
    private readonly enterList: string[];
    private readonly leaveList: string[];
    constructor() {
        this.attr = 'af-transit';
        this.appAttr = `${this.attr}-app`;
        this.selector = {
            app: {
                container: `[${this.appAttr}="container"]`,
                duration: `[${this.appAttr}="duration"]`,
                easing: `[${this.appAttr}="easing"]`,
                enter: `[${this.appAttr}="enter"]`,
                leave: `[${this.appAttr}="leave"]`,
                enterfunc: `[${this.appAttr}="enterfunc"]`,
                leavefunc: `[${this.appAttr}="leavefunc"]`,
                remove: `[${this.appAttr}="remove"]`,
                apply: `[${this.appAttr}="apply"]`,
            },
            prop: {
                duration: `${this.attr}-duration`,
                easing: `${this.attr}-easing`,
                leave: `${this.attr}-leave`,
                enter: `${this.attr}-enter`,
                leavefunc: `${this.attr}-leavefunc`,
                enterfunc: `${this.attr}-enterfunc`,
            },
        };

        // elements
        this.container = document.querySelector(this.selector.app.container) as divType;
        this.duration = <inputType>this.container.querySelector(this.selector.app.duration);
        this.easing = <selectType>this.container.querySelector(this.selector.app.easing);
        this.enter = <selectType>this.container.querySelector(this.selector.app.enter);
        this.leave = <selectType>this.container.querySelector(this.selector.app.leave);
        this.enterfunc = <inputType>this.container.querySelector(this.selector.app.enterfunc);
        this.leavefunc = <inputType>this.container.querySelector(this.selector.app.leavefunc);
        this.remove = <btnType>this.container.querySelector(this.selector.app.remove);
        this.apply = <btnType>this.container.querySelector(this.selector.app.apply);

        // list
        this.easingList = [...EASING_FUNCTIONS];
        const animationList = [
            'fadeIn',
            'fadeOut',
            'scaleIn',
            'scaleOut',
            'scaleXIn',
            'scaleXOut',
            'scaleYIn',
            'scaleYOut',
            'flipXIn',
            'flipXOut',
            'flipYIn',
            'flipYOut',
            'growIn',
            'growOut',
            'slideUpIn',
            'slideUpOut',
            'slideDownIn',
            'slideDownOut',
            'slideLeftIn',
            'slideLeftOut',
            'slideRightIn',
            'slideRightOut',
        ];
        this.leaveList = ['none'];
        this.enterList = ['none'];
        animationList.forEach((v) => {
            if (v.includes('In')) this.enterList.push(v);
            else if (v.includes('Out')) this.leaveList.push(v);
        });

        // listener
        this.listener();
    }

    private listener() {
        // select elements setup
        this.loadOnSelectElement(this.easing, this.easingList);
        this.loadOnSelectElement(this.enter, this.enterList);
        this.loadOnSelectElement(this.leave, this.leaveList);

        // set default value
        this.duration.value = '1000';
        this.easing.dispatchEvent(new Event('change'));
        this.enter.dispatchEvent(new Event('change'));
        this.leave.dispatchEvent(new Event('change'));

        // button listeners
        const failedCustomAttribute = "Selected element doesn't allow custom attribute.";
        const noElement = 'Select an element';
        const { duration, easing, leave, enter, leavefunc, enterfunc } = this.selector.prop;
        this.apply?.addEventListener('click', async () => {
            //console.log(duration, easing, enter, leave);
            //console.log(this.duration.value, this.easing.value, this.enter.value, this.leave.value);
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert(noElement);
            if (!swe?.customAttributes) return alert(failedCustomAttribute);
            // apply
            const enterValue = this.enter.value;
            const leaveValue = this.leave.value;
            const enterFuncValue = this.enterfunc.value;
            const leaveFuncValue = this.leavefunc.value;
            await swe.setCustomAttribute(`${this.attr}`, 'swap');
            await swe.setCustomAttribute(duration, this.duration.value);
            enterValue !== 'none'
                ? await swe.setCustomAttribute(enter, enterValue)
                : await swe.removeCustomAttribute(enter);
            leaveValue !== 'none'
                ? await swe.setCustomAttribute(leave, leaveValue)
                : await swe.removeCustomAttribute(leave);
            await swe.setCustomAttribute(easing, this.easing.value);
            enterFuncValue
                ? await swe.setCustomAttribute(enterfunc, enterFuncValue)
                : await swe.removeCustomAttribute(enterfunc);
            leaveFuncValue
                ? await swe.setCustomAttribute(leavefunc, leaveFuncValue)
                : await swe.removeCustomAttribute(leavefunc);
            // button text flip
            this.btnTextFlip(this.apply, 'Applied!!!');
        });

        this.remove?.addEventListener('click', async () => {
            //console.log(duration, easing, enter, leave);
            //console.log(this.duration.value, this.easing.value, this.enter.value, this.leave.value);
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert(noElement);
            if (!swe?.customAttributes) return alert(failedCustomAttribute);
            // remove
            await swe.removeCustomAttribute(`${this.attr}`);
            await swe.removeCustomAttribute(duration);
            await swe.removeCustomAttribute(enter);
            await swe.removeCustomAttribute(leave);
            await swe.removeCustomAttribute(easing);
            await swe.removeCustomAttribute(enterfunc);
            await swe.removeCustomAttribute(leavefunc);
            // button text flip
            this.btnTextFlip(this.remove, 'Removed!!!');
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
